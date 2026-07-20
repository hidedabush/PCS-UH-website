import Link from "next/link";
import {
  Github,
  Linkedin,
  Instagram,
  MessagesSquare,
  Mail,
} from "lucide-react";
import {
  navLinks,
  GITHUB_URL,
  DISCORD_URL,
  LINKEDIN_URL,
  INSTAGRAM_URL,
  CONTACT_EMAIL,
} from "@/data/nav";

const socials = [
  { label: "GitHub", href: GITHUB_URL, icon: Github },
  { label: "Discord", href: DISCORD_URL, icon: MessagesSquare },
  { label: "LinkedIn", href: LINKEDIN_URL, icon: Linkedin },
  { label: "Instagram", href: INSTAGRAM_URL, icon: Instagram },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-ink" aria-label="Footer">
      <div className="mx-auto grid max-w-site gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.5fr,1fr,1fr] lg:px-10">
        <div>
          <p className="text-lg font-semibold tracking-tight text-white">
            UH PCS
          </p>
          <p className="mt-1 text-xs text-textMuted">
            University of Houston Parallel Computing Society
          </p>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-textMuted">
            A student organization teaching the compute stack behind modern
            AI, graphics, and scientific computing.
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="mt-5 inline-flex items-center gap-2 text-sm text-textMuted transition-colors hover:text-white"
          >
            <Mail className="h-3.5 w-3.5" aria-hidden />
            {CONTACT_EMAIL}
          </a>
        </div>

        <nav aria-label="Footer">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-textFaint">
            Navigate
          </p>
          <ul className="grid grid-cols-2 gap-x-4 gap-y-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-textMuted transition-colors hover:text-white"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.1em] text-textFaint">
            Follow
          </p>
          <ul className="space-y-2.5">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 text-sm text-textMuted transition-colors hover:text-white"
                >
                  <social.icon className="h-3.5 w-3.5" aria-hidden />
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="mx-auto flex max-w-site flex-wrap items-center justify-between gap-3 px-4 py-5 sm:px-6 lg:px-10">
          <p className="text-xs text-textFaint">
            © {new Date().getFullYear()} UH Parallel Computing Society ·{" "}
            <span className="text-uhred">University of Houston</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
