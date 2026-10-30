import { siteConfig } from "@/data/site-config";
import { Note } from "@/components/ui/Note";

export function SampleContentNote({
  children = "Sample, so you can see the style. The live version replaces this.",
}: {
  children?: React.ReactNode;
}) {
  if (!siteConfig.showSampleNotes) return null;
  return (
    <Note className="mt-4 max-w-xl px-3 py-2">{children}</Note>
  );
}
