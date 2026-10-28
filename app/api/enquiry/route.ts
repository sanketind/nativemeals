import { NextResponse } from "next/server";
import { enquiryEstimate, enquiryMailtoHref, enquiryWhatsappHref } from "@/lib/contact";
import {
  normalizePhone,
  parseEnquiryBody,
  validateEnquiry,
} from "@/lib/validation";
import { getPlan } from "@/data/plans";

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
    const response = await fetch(webhook, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
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
