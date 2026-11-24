import { cn } from "@/lib/cn";
import { Eyebrow, Heading, Text } from "@/components/ui/Type";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
  tone = "default",
  as = "h2",
  action,
}: {
  eyebrow?: string;
  title: string;
  children?: React.ReactNode;
  align?: "left" | "center";
  tone?: "default" | "inverse";
  as?: "h1" | "h2";
  action?: React.ReactNode;
}) {
  const inverse = tone === "inverse";

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? <Eyebrow tone={inverse ? "accent" : "ink"}>{eyebrow}</Eyebrow> : null}
      <Heading as={as} size="title" tone={tone} className={eyebrow ? "mt-3" : undefined}>
        {title}
      </Heading>
      {children ? (
        <Text size="lede" tone={inverse ? "inverse" : "default"} className="mt-4">
          {children}
        </Text>
      ) : null}
      {action ? <div className="mt-5">{action}</div> : null}
    </div>
  );
}
