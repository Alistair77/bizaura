"use client";

import { Icon } from "@/components/ui/Icon";
import { pointerTilt } from "@/components/ui/pointerTilt";
import { HERO_INSIGHTS } from "@/content/home";
import styles from "./Hero.module.css";

const tilt = pointerTilt(4);

const TAPE_COLOR: Record<string, string> = {
  violet: "#e35ac0",
  pink: "#ec3b87",
  blue: "#5c8eea",
};

export function HeroInsightStack() {
  return (
    <nav aria-label="What Bizora unlocks" className={styles.insightWrap}>
      <ul className={styles.insights} {...tilt}>
        {HERO_INSIGHTS.map((item, i) => (
          <li key={item.title} className={styles.insightItem} style={{ "--i": i } as React.CSSProperties}>
            <a className={styles.strip} data-accent={item.accent} href={item.target}>
              <span
                className={styles.tape}
                aria-hidden="true"
                style={{ background: TAPE_COLOR[item.accent] ?? "#e35ac0" }}
              />
              <span className={styles.stripIcon}>
                <Icon name={item.icon} size={30} strokeWidth={2} />
              </span>
              <span className={styles.stripText}>
                <span className={styles.stripTitle}>{item.title}</span>
                <span className={styles.stripLine}>{item.line}</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
