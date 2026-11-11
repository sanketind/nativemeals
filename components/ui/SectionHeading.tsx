import { cn } from "@/lib/cn";
import { Eyebrow, Heading, Text } from "@/components/ui/Type";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  tone = "default",
  as = "h2",
  split = false,
  action,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  as?: "h1" | "h2";
  /** Puts the sentence and the action beside the title from `md`, instead of under it. */
  split?: boolean;
  action?: React.ReactNode;
}) {
  const inverse = tone === "inverse";
  const titleBlock = (
    <>
      {eyebrow ? <Eyebrow tone={inverse ? "sunflower" : "olive"}>{eyebrow}</Eyebrow> : null}
      <Heading as={as} size="title" tone={tone} className={eyebrow ? "mt-3" : undefined}>
        {title}
      </Heading>
    </>
  );

  if (split) {
    return (
      <div className="grid gap-5 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-end md:gap-12">
        <div>{titleBlock}</div>
        {children || action ? (
          <div className="md:max-w-sm md:justify-self-end md:pb-2">
            {children ? (
              <Text size="lede" tone={inverse ? "inverse" : "default"}>
                {children}
              </Text>
            ) : null}
            {action ? <div className={children ? "mt-5" : undefined}>{action}</div> : null}
          </div>
        ) : null}
      </div>
    );
  }

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {titleBlock}
      {children ? (
        <Text tone={inverse ? "inverse" : "default"} className="mt-4">
          {children}
        </Text>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
