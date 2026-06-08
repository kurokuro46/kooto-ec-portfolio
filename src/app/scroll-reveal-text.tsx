"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import styles from "./page.module.css";

type ScrollRevealTextTag = "p" | "h1" | "h2" | "span";

interface ScrollRevealTextProps {
  as?: ScrollRevealTextTag;
  className?: string;
  id?: string;
  text: string;
}

export function ScrollRevealText({
  as = "span",
  className,
  id,
  text,
}: ScrollRevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: "0px 0px -12% 0px",
        threshold: 0.2,
      },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, []);

  const setRef = (element: HTMLElement | null) => {
    ref.current = element;
  };

  const content = Array.from(text).map((character, index) => (
    <span
      className={styles.scrollRevealCharacter}
      style={{ "--reveal-index": index } as CSSProperties}
      aria-hidden="true"
      key={`${character}-${index}`}
    >
      {character === " " ? "\u00a0" : character}
    </span>
  ));

  const revealClassName = `${styles.scrollRevealText} ${
    isVisible ? styles.scrollRevealTextVisible : ""
  } ${className ?? ""}`;

  const props = {
    className: revealClassName,
    id,
    "aria-label": text,
  };

  const renderByTag: Record<ScrollRevealTextTag, ReactNode> = {
    p: (
      <p ref={setRef} {...props}>
        {content}
      </p>
    ),
    h1: (
      <h1 ref={setRef} {...props}>
        {content}
      </h1>
    ),
    h2: (
      <h2 ref={setRef} {...props}>
        {content}
      </h2>
    ),
    span: (
      <span ref={setRef} {...props}>
        {content}
      </span>
    ),
  };

  return renderByTag[as];
}
