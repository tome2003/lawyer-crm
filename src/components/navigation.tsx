"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Scale, X } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const marketplaceActive =
    pathname === "/" ||
    pathname.startsWith("/lawyers") ||
    pathname.startsWith("/find-your-expert");
  const loginActive = pathname === "/login";

  return (
    <nav className="border-ink/8 bg-paper-bright/85 fixed top-0 z-50 w-full border-b backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-[4.25rem] items-center justify-between">
          <Link
            href="/"
            className="group flex cursor-pointer items-center"
            onClick={() => setOpen(false)}
          >
            <div className="from-navy-deep ring-brass/25 flex h-9 w-9 items-center justify-center rounded-sm bg-gradient-to-br to-navy shadow-sm ring-1 transition-transform group-hover:scale-[1.02]">
              <Scale className="text-paper-bright h-4 w-4" strokeWidth={1.75} />
            </div>
            <span className="font-serif text-ink ml-3 text-xl font-semibold tracking-tight">
              Lex
            </span>
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/find-your-expert"
              className={`text-sm font-medium tracking-wide transition-colors ${
                marketplaceActive
                  ? "text-ink"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Find your expert
            </Link>
            <div className="bg-ink/10 h-4 w-px" />
            <Link
              href="/login"
              className={`text-sm font-medium tracking-wide transition-colors ${
                loginActive ? "text-ink" : "text-ink-muted hover:text-ink"
              }`}
            >
              Log in
            </Link>
            <Link
              href="/join"
              className="bg-ink text-paper-bright rounded-full px-5 py-2.5 text-sm font-semibold tracking-wide shadow-[0_1px_2px_rgba(21,25,34,0.14)] transition-all hover:scale-[1.02] hover:shadow-[0_0_26px_rgba(59,130,246,0.2),0_0_50px_rgba(139,115,85,0.07)]"
            >
              Join as a lawyer
            </Link>
          </div>

          <button
            type="button"
            className="text-ink flex items-center justify-center rounded-md p-2 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="border-ink/8 flex flex-col gap-3 border-t py-4 md:hidden">
            <Link
              href="/find-your-expert"
              className="text-ink text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Find your expert
            </Link>
            <Link
              href="/login"
              className="text-ink-muted text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/join"
              className="bg-ink text-paper-bright rounded-full py-3 text-center text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              Join as a lawyer
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
