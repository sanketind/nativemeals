import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";

function secretsMatch(provided: string, expected: string) {
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

export async function GET(request: Request) {
  const expected = process.env.REVALIDATE_SECRET?.trim();
  const provided = new URL(request.url).searchParams.get("secret") ?? "";

  if (!expected) {
    return new Response("The publish link is not configured yet.", {
      status: 503,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  if (!secretsMatch(provided, expected)) {
    return new Response("That publish link is not valid.", {
      status: 401,
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  revalidateTag("weekly-menu", { expire: 0 });
  revalidatePath("/");

  return new Response(
    "Menu refresh requested. The next visit to the site will load the latest sheet.",
    { headers: { "content-type": "text/plain; charset=utf-8" } },
  );
}
