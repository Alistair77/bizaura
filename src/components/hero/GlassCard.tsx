import { Icon, type IconName } from "@/components/ui/Icon";
import styles from "./Hero.module.css";

interface GlassCardProps {
  icon: IconName;
  gradientFrom: string;
  gradientTo: string;
  iconShadow: string;
  title: string;
  lines: [string, string];
  href: string;
  label: string;
  className?: string;
}

/**
 * Floating card in the plasma field. The whole card is one link.
 * Outer element places + tilts it, inner element floats; hover lifts and straightens it.
 */
export function GlassCard({
  icon,
  gradientFrom,
  gradientTo,
  iconShadow,
  title,
  lines,
  href,
  label,
  className,
}: GlassCardProps) {
  return (
    <a href={href} className={`${styles.cardPos} ${className ?? ""}`} aria-label={label}>
      <span className={styles.cardFloat}>
        <span className={styles.card}>
          <span
            className={styles.cardIcon}
            style={{
              background: `linear-gradient(135deg, ${gradientFrom}, ${gradientTo})`,
              boxShadow: `0 8px 20px ${iconShadow}`,
            }}
            aria-hidden="true"
          >
            <Icon name={icon} size={30} strokeWidth={1.8} />
          </span>
          <span className={styles.cardText}>
            <span className={styles.cardTitle}>{title}</span>
            <span className={styles.cardDesc}>
              {lines[0]}
              <br />
              {lines[1]}
            </span>
          </span>
          <span className={styles.cardArrow} aria-hidden="true">
            <Icon name="arrow" size={18} strokeWidth={2} />
          </span>
        </span>
      </span>
    </a>
  );
}
