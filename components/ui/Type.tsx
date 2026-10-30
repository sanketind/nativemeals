import { cn } from "@/lib/cn";
import { priceMark, type as typeStyles } from "@/components/ui/styles";

const ink = {
  leaf: "text-terracotta-ink",
  sunflower: "text-terracotta",
  olive: "text-olive",
  muted: "text-muted",
  inverse: "text-cream/70",
} as const;

export function Eyebrow({
  as: Tag = "p",
  id,
  tone = "leaf",
  compact = false,
  className,
  children,
}: {
  as?: "p" | "legend" | "span";
  id?: string;
  tone?: keyof typeof ink;
  compact?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      id={id}
      className={cn(compact ? typeStyles.eyebrowCompact : typeStyles.eyebrow, ink[tone], className)}
    >
      {children}
    </Tag>
  );
}

const headingSize = {
  display: typeStyles.display,
  closing: typeStyles.closing,
  title: typeStyles.title,
  stat: typeStyles.stat,
  card: typeStyles.card,
} as const;

export function Heading({
  as: Tag = "h2",
  size = "title",
  tone = "default",
  className,
  children,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  size?: keyof typeof headingSize;
  tone?: "default" | "inverse";
  className?: string;
  children: React.ReactNode;
}) {
  const cream = tone === "inverse" || size === "closing";
  return (
    <Tag className={cn(headingSize[size], cream ? "text-cream" : "text-olive", className)}>
      {children}
    </Tag>
  );
}

const textSize = {
  lede: typeStyles.lede,
  lead: typeStyles.lead,
  body: typeStyles.body,
} as const;

export function Text({
  as: Tag = "p",
  size = "lead",
  tone = "default",
  className,
  children,
}: {
  as?: "p" | "div" | "li" | "span";
  size?: keyof typeof textSize;
  tone?: "default" | "inverse";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag
      className={cn(
        textSize[size],
        tone === "inverse" ? "text-cream/80" : "text-muted",
        className,
      )}
    >
      {children}
    </Tag>
  );
}

const captionInk = {
  muted: "text-muted",
  olive: "text-olive",
  inverse: "text-cream/70",
} as const;

export function Caption({
  as: Tag = "span",
  tone = "muted",
  className,
  children,
}: {
  as?: "span" | "p" | "dt";
  tone?: keyof typeof captionInk;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <Tag className={cn(typeStyles.caption, "uppercase", captionInk[tone], className)}>
      {children}
    </Tag>
  );
}

export function Price({
  size = "md",
  tone = "olive",
  className,
  children,
}: {
  size?: "md" | "lg";
  tone?: "olive" | "cream";
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        size === "lg" ? typeStyles.priceLg : typeStyles.price,
        tone === "cream" ? "text-cream" : "text-olive",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function PriceMark({ children }: { children: React.ReactNode }) {
  return <span className={priceMark}>{children}</span>;
}

export function StepIndex({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <p className={cn(typeStyles.step, "text-terracotta-ink", className)}>{children}</p>;
}
