import type { JsonLdNode } from "@/lib/structured-data";

export function JsonLd({ data }: { data: JsonLdNode | Array<JsonLdNode | null> }) {
  const nodes = (Array.isArray(data) ? data : [data]).filter((node): node is JsonLdNode => node !== null);
  if (nodes.length === 0) return null;

  const payload =
    nodes.length === 1
      ? nodes[0]
      : {
          "@context": "https://schema.org",
          "@graph": nodes.map((node) => {
            const rest = { ...node };
            delete rest["@context"];
            return rest;
          }),
        };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
