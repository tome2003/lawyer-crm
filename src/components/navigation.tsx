"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Sparkles, X } from "lucide-react";

export function Navigation() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const marketplaceActive = pathname === "/" || pathname.startsWith("/lawyers");
  const loginActive = pathname === "/login";

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-white/70 backdrop-blur-2xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link
            href="/"
            className="group flex cursor-pointer items-center"
            onClick={() => setOpen(false)}
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black transition-transform group-hover:scale-105">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="ml-3 font-sans text-xl font-semibold tracking-tight text-black">
              Lex
            </span>
          </Link>

          <div className="hidden items-center space-x-8 md:flex">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors ${
                marketplaceActive ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              Find your expert
            </Link>
            <div className="h-4 w-px bg-gray-200" />
            <Link
              href="/login"
              className={`text-sm font-medium transition-colors ${
                loginActive ? "text-black" : "text-gray-500 hover:text-black"
              }`}
            >
              Log in
            </Link>
            <Link
              href="/join"
              className="rounded-full bg-black px-5 py-2 text-sm font-medium text-white shadow-md transition-transform hover:scale-105"
            >
              Join as a Lawyer
            </Link>
          </div>

          <button
            type="button"
            className="flex items-center justify-center rounded-lg p-2 text-black md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {open && (
          <div className="flex flex-col gap-3 border-t border-black/5 py-4 md:hidden">
            <Link
              href="/"
              className="text-sm font-medium text-black"
              onClick={() => setOpen(false)}
            >
              Find your expert
            </Link>
            <Link
              href="/login"
              className="text-sm font-medium text-gray-600"
              onClick={() => setOpen(false)}
            >
              Log in
            </Link>
            <Link
              href="/join"
              className="rounded-full bg-black py-3 text-center text-sm font-medium text-white"
              onClick={() => setOpen(false)}
            >
              Join as a Lawyer
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
