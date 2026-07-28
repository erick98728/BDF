"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { cx } from "./utils";

type TextRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  mode?: "word" | "character";
  delay?: number;
  stagger?: number;
};

export function TextReveal({ text, as: Component = "span", className, mode = "word", delay = 0, stagger = 0.035 }: TextRevealProps) {
  const reduceMotion = useReducedMotion();
  const segments = mode === "word" ? text.split(/(\s+)/) : Array.from(text);

  if (reduceMotion) {
    return <Component className={className}>{text}</Component>;
  }

  return (
    <Component className={cx("inline-block", className)} aria-label={text}>
      {segments.map((segment, index) => {
        const isWhitespace = /^\s+$/.test(segment);
        const key = `${segment}-${index}`;
        const content: ReactNode = isWhitespace ? segment : <span aria-hidden="true">{segment}</span>;

        if (isWhitespace) return <span key={key}>{segment}</span>;

        return (
          <motion.span
            key={key}
            className="inline-block"
            initial={{ opacity: 0, y: "0.65em" }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1], delay: delay + index * stagger }}
          >
            {content}
          </motion.span>
        );
      })}
    </Component>
  );
}
