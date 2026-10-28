import { siteConfig } from "@/data/site-config";

export function SampleContentNote({
  children = "Sample, so you can see the style. The live version replaces this.",
}: {
  children?: React.ReactNode;
}) {
  if (!siteConfig.showSampleNotes) return null;
  return (
    <p className="mt-4 max-w-xl rounded-2xl bg-sage px-3 py-2 text-sm leading-relaxed text-olive">
      {children}
    </p>
  );
}
