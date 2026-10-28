"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { siteConfig } from "@/data/site-config";
import { ButtonLink } from "@/components/ui/Button";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const trigger = buttonRef.current;
    const panel = panelRef.current;
    const items = () =>
      panel
        ? [...panel.querySelectorAll<HTMLElement>("a, button")].filter(
            (item) => !item.hasAttribute("disabled"),
          )
        : [];

    items()[0]?.focus();

    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;
      const focusable = items();
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      (trigger ?? previouslyFocused)?.focus();
    };
  }, [open]);

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        className="inline-flex size-11 items-center justify-center rounded-full text-olive md:hidden"
        aria-expanded={open}
        aria-controls="mobile-navigation"
        onClick={() => setOpen(true)}
      >
        <Menu aria-hidden="true" className="size-5" />
        <span className="sr-only">Open menu</span>
      </button>
      {open ? (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-charcoal/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div
            ref={panelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="absolute inset-y-0 right-0 flex w-[min(100%,20rem)] flex-col bg-cream px-6 py-6 shadow-2xl"
          >
            <div className="flex items-center justify-between">
              <p id={titleId} className="font-mono text-xs uppercase tracking-[0.16em] text-olive">
                Menu
              </p>
              <button
                type="button"
                className="inline-flex size-11 items-center justify-center rounded-full text-olive"
                onClick={() => setOpen(false)}
              >
                <X aria-hidden="true" className="size-5" />
                <span className="sr-only">Close menu</span>
              </button>
            </div>
            <nav className="mt-8 flex flex-col gap-1" aria-label="Mobile">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="rounded-2xl px-3 py-3 text-base text-charcoal hover:bg-sage"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Link
                href="/contact"
                className="rounded-2xl px-3 py-3 text-base text-charcoal hover:bg-sage"
                onClick={() => setOpen(false)}
              >
                Contact
              </Link>
            </nav>
            <ButtonLink href="/meal-plans" className="mt-6">
              Explore Plans
            </ButtonLink>
          </div>
        </div>
      ) : null}
    </>
  );
}
