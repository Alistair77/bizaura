"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { CONTACT } from "@/content/home";
import styles from "./Closing.module.css";

/** Email copy button: copies the address, confirms, then settles back. */
export function EmailCopy() {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = CONTACT.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setCopied(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <button
      type="button"
      className={`${styles.email} ${styles.emailBtn}`}
      onClick={copy}
      aria-live="polite"
      aria-label={copied ? "Email copied to clipboard" : `Copy email address ${CONTACT.email}`}
    >
      <Icon name="mail" size={18} />
      {copied ? "Copied to clipboard" : CONTACT.email}
      <Icon name={copied ? "check" : "copy"} size={16} strokeWidth={2.2} />
    </button>
  );
}
