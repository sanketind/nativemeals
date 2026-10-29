import { NextResponse } from "next/server";
import { enquiryEstimate, enquiryMailtoHref, enquiryWhatsappHref } from "@/lib/contact";
import {
  normalizePhone,
  parseEnquiryBody,
  validateEnquiry,
} from "@/lib/validation";
import { getPlan } from "@/data/plans";

/**
 * Google Apps Script runs doPost, then answers with a 302. That next address
 * only accepts GET and returns the JSON result. Posting to it again is rejected.
 */
async function postWebhook(webhook: string, payload: unknown) {
  const body = JSON.stringify(payload);
  const headers = { "content-type": "application/json" };
  let response = await fetch(webhook, {
    method: "POST",
    headers,
    body,
    redirect: "manual",
    signal: AbortSignal.timeout(20000),
  });

  if (response.status >= 300 && response.status < 400) {
    const location = response.headers.get("location");
    if (!location) {
      throw new Error(`Webhook redirected without a location (${response.status}).`);
    }
    const nextUrl = new URL(location, webhook);
    const keepPost = response.status === 307 || response.status === 308;
    response = await fetch(nextUrl, {
      method: keepPost ? "POST" : "GET",
      headers: keepPost ? headers : undefined,
      body: keepPost ? body : undefined,
      signal: AbortSignal.timeout(20000),
    });
  }

  if (!response.ok) {
    throw new Error(`Webhook responded ${response.status}`);
  }
  return response.text();
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "invalid" },
      { status: 400 },
    );
  }

  const input = parseEnquiryBody(body);
  if (!input) {
    return NextResponse.json(
      { ok: false, error: "invalid" },
      { status: 400 },
    );
  }

  if (input.company) {
    return NextResponse.json({ ok: true });
  }

  const fields = validateEnquiry(input);
  if (Object.keys(fields).length > 0) {
    return NextResponse.json(
      { ok: false, error: "invalid", fields },
      { status: 400 },
    );
  }

  const phone = normalizePhone(input.phone);
  const estimate = enquiryEstimate(input);
  const payload = {
    source: "nativemeals-website",
    receivedAt: new Date().toISOString(),
    type: input.type,
    name: input.name,
    phone,
    plan: estimate?.plan ?? (input.plan ? (getPlan(input.plan)?.name ?? input.plan) : ""),
    diet: input.diet,
    locality: input.locality,
    handover: input.handover,
    address: input.address,
    homeAddress: input.handover === "both" ? input.homeAddress : "",
    startDate: input.startDate,
    message: input.message,
    estimate,
  };

  const whatsappUrl = enquiryWhatsappHref({ ...input, phone: phone ?? input.phone });
  const emailUrl = enquiryMailtoHref({ ...input, phone: phone ?? input.phone });
  const webhook = process.env.ENQUIRY_WEBHOOK_URL?.trim();

  if (!webhook) {
    if (whatsappUrl) {
      return NextResponse.json({
        ok: false,
        fallback: "whatsapp",
        reason: "unconfigured",
        whatsappUrl,
        emailUrl,
      });
    }
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 503 });
  }

  try {
    const text = await postWebhook(webhook, payload);
    if (text.includes('"ok":false') || text.trimStart().startsWith("<")) {
      throw new Error("Webhook did not save the enquiry.");
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Enquiry webhook failed.", error);
    if (whatsappUrl) {
      return NextResponse.json(
        {
          ok: false,
          fallback: "whatsapp",
          reason: "failed",
          whatsappUrl,
          emailUrl,
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: false, error: "unavailable" }, { status: 502 });
  }
}
