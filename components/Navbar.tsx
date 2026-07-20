"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Cpu, Github, Menu, X } from "lucide-react";
import { navLinks, GITHUB_URL } from "@/data/nav";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b border-line transition-colors duration-300",
          scrolled ? "bg-ink/95" : "bg-ink/70"
        )}
      >
        <nav
          className="mx-auto flex h-16 max-w-site items-center justify-between px-4 sm:px-6 lg:px-10"
          aria-label="Primary"
        >
          <Link href="/" className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center border border-line bg-panel text-accent">
              <Cpu className="h-4 w-4" aria-hidden />
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              UH PCS
            </span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const isActive =
                link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "relative px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-white" : "text-textMuted hover:text-white"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-x-3 -bottom-[1px] h-px bg-accent"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2.5">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UH PCS on GitHub"
              className="hidden h-9 w-9 items-center justify-center border border-line text-textMuted transition-colors hover:border-textFaint hover:text-white sm:flex"
            >
              <Github className="h-4 w-4" aria-hidden />
            </a>
            <Link
              href="/membership"
              className="hidden bg-accent px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-accentHover sm:block"
            >
              Become a Member
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="flex h-9 w-9 items-center justify-center border border-line text-white lg:hidden"
              aria-label="Open navigation menu"
              aria-expanded={open}
            >
              <Menu className="h-4 w-4" aria-hidden />
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-ink lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            <div className="flex h-16 items-center justify-between border-b border-line px-4 sm:px-6">
              <span className="text-sm font-medium text-white">Menu</span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-9 w-9 items-center justify-center border border-line text-white"
                aria-label="Close navigation menu"
              >
                <X className="h-4 w-4" aria-hidden />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto px-4 py-6 sm:px-6" aria-label="Mobile">
              <ul className="space-y-1">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 + i * 0.04 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block border border-transparent px-4 py-4 font-display text-2xl font-semibold tracking-tight text-white transition-colors hover:border-line hover:bg-panel"
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="border-t border-line px-6 py-5">
              <Link
                href="/membership"
                onClick={() => setOpen(false)}
                className="block bg-accent px-4 py-3 text-center text-sm font-medium text-black"
              >
                Become a Member
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
