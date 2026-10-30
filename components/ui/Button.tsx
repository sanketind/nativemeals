import Link from "next/link";
import { cn } from "@/lib/cn";
import { button } from "@/components/ui/styles";

type Variant = keyof typeof button.variants;
type Size = keyof typeof button.sizes;

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
  const classes = cn(button.base, button.sizes[size], button.variants[variant], className);
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
      className={cn(button.base, button.sizes[size], button.variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  );
}
