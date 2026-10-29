import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "inverse" | "ghost";

const variants: Record<Variant, string> = {
  primary: "bg-olive text-white hover:bg-olive-deep",
  secondary:
    "border border-olive/55 bg-white text-olive hover:bg-sage",
  inverse: "bg-cream text-olive hover:bg-white",
  ghost: "text-olive hover:bg-sage",
};

type Size = "md" | "sm";

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-base",
  sm: "px-4 py-2 text-sm",
};

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-normal transition-colors disabled:cursor-not-allowed disabled:opacity-60";

function isExternal(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  onClick,
  children,
}: {
  href: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  const classes = cn(base, sizes[size], variants[variant], className);
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={classes} onClick={onClick}>
        {children}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={classes}
      onClick={onClick}
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
  size = "md",
  className,
  type = "button",
  children,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
}) {
  return (
    <button
      type={type}
      className={cn(base, sizes[size], variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
