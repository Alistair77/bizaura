import { Plasma } from "@/components/hero/Plasma";
import { HandArrow } from "@/components/ui/HandArrow";
import { Icon } from "@/components/ui/Icon";
import { tornStripMask } from "@/components/ui/TornEdge";
import { BELIEF_STEPS, MISSION, VISION } from "@/content/home";
import styles from "./Belief.module.css";

const STEP_ROTATION = ["-2deg", "1.5deg", "-1deg", "2deg"];

interface StatementProps {
  label: string;
  title: string;
  body: string;
  icon: "target" | "eye";
  accent: "violet" | "pink";
}

function Statement({ label, title, body, icon, accent }: StatementProps) {
  return (
    <article className={styles.statement} data-accent={accent} data-reveal>
      <div className={styles.statementHead}>
        <span className={styles.statementIcon}>
          <Icon name={icon} size={22} />
        </span>
        <h3 className={styles.statementLabel}>{label}</h3>
      </div>
      <p className={styles.statementTitle}>{title}</p>
      <p className={styles.statementBody}>{body}</p>
      <svg className={styles.arc} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
        <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="100" cy="100" r="58" fill="none" stroke="currentColor" strokeWidth="1.5" strokeDasharray="90 300" />
      </svg>
    </article>
  );
}

export function Belief() {
  return (
    <section id="belief" className={styles.section} aria-labelledby="belief-heading">
      <div className="grain" />
      {/* Faint hero-plasma wash — light, never hyper. */}
      <div className={styles.beliefPlasma} aria-hidden="true">
        <Plasma
          speed={0.3}
          direction="pingpong"
          scale={1.5}
          opacity={0.3}
          mouseInteractive={false}
          renderScale={0.35}
          maxDpr={1.2}
          targetFps={24}
          iterations={40}
          lightMode={true}
        />
      </div>
      <div className={`container ${styles.layout}`}>
        <div className={styles.stairArea}>
          <h2 id="belief-heading" className="eyebrow" data-reveal>
            <span className="eyebrow__num">07</span> Our belief <span className="eyebrow__rule" />
          </h2>

          <div className={styles.stairWrap}>
            <ol className={styles.stairs}>
              {BELIEF_STEPS.map((step, i) => {
                const mask = tornStripMask(300 + i * 17);
                return (
                  <li
                    key={step.text}
                    className={styles.step}
                    data-reveal
                    style={
                      {
                        "--i": i,
                        "--rot": STEP_ROTATION[i % STEP_ROTATION.length],
                        "--reveal-delay": `${i * 110}ms`,
                      } as React.CSSProperties
                    }
                  >
                    <span className={styles.tape} aria-hidden="true" />
                    <span className={styles.strip} style={{ "--strip-mask": mask } as React.CSSProperties}>
                      <Icon name={step.icon} size={22} strokeWidth={2.2} />
                      {step.text}
                    </span>
                  </li>
                );
              })}
            </ol>
            <p className={`hand ${styles.note}`} aria-hidden="true">
              A simple idea
              <br />
              that creates
              <br />a bigger tomorrow.
              <HandArrow variant="curlDownLeft" className={styles.noteArrow} />
            </p>
          </div>
        </div>

        <div className={styles.statements}>
          <Statement {...MISSION} icon="target" accent="violet" />
          <Statement {...VISION} icon="eye" accent="pink" />
        </div>
      </div>
    </section>
  );
}
