import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-olive text-white hover:bg-olive-deep",
  secondary:
    "border border-charcoal/15 bg-white text-olive hover:border-olive/40",
  inverse: "bg-cream text-olive hover:bg-white",
  ghost: "text-olive hover:bg-sage",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold tracking-tight transition-colors disabled:cursor-not-allowed disabled:opacity-60";

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function ButtonLink({
  href,
  variant = "primary",
  className,
  children,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
}) {
  const classes = cn(base, variants[variant], className);
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      {...(isExternal(href)
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
    >
      {children}
    </a>
  );
}

export function Button({
  variant = "primary",
  className,
  type = "button",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type={type}
      className={cn(base, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
