import { cn } from "@/lib/cn";
import { choiceClass, controlClass, fieldError, fieldHint, fieldLabel } from "@/components/ui/styles";

export function Field({
  id,
  label,
  required,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className={fieldLabel}>
        {label}
        {required ? <span className="text-error"> *</span> : null}
      </label>
      {hint ? <p className={fieldHint}>{hint}</p> : null}
      {children}
      {error ? (
        <p id={`${id}-error`} className={fieldError}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function TextInput({
  invalid = false,
  className,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean }) {
  return (
    <input
      className={cn(controlClass(invalid), className)}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
}

export function Choice({
  selected,
  shape = "pill",
  className,
  type = "button",
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  selected: boolean;
  shape?: "pill" | "tile" | "card";
}) {
  return (
    <button type={type} className={cn(choiceClass(selected, shape), className)} {...props} />
  );
}
