import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { SiGooglescholar, SiOrcid } from "react-icons/si";
import { sameAs } from "@/resources";
import styles from "./SocialLinks.module.scss";

const ICONS = {
  github: FaGithub,
  linkedin: FaLinkedin,
  scholar: SiGooglescholar,
  orcid: SiOrcid,
} as const;

// Compact icon row for hero banners (research + dev) — a single purple
// pulse spins around whichever one is hovered/focused.
export function SocialLinks({ className }: { className?: string }) {
  const links = [
    { key: "github" as const, name: "GitHub", href: sameAs.github },
    { key: "linkedin" as const, name: "LinkedIn", href: sameAs.linkedin },
    { key: "scholar" as const, name: "Google Scholar", href: sameAs.scholar },
    { key: "orcid" as const, name: "ORCID", href: sameAs.orcid },
  ].filter((l) => l.href);

  return (
    <div className={`${styles.row} ${className || ""}`}>
      {links.map((link) => {
        const Icon = ICONS[link.key];
        return (
          <a
            key={link.key}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.name}
            title={link.name}
            className={styles.ring}
          >
            <span className={styles.icon}>
              <Icon size={16} />
            </span>
          </a>
        );
      })}
    </div>
  );
}
