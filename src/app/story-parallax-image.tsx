"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import styles from "./page.module.css";

export function StoryParallaxImage() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;

    if (!wrap) {
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frameId = 0;

    const updateOffset = () => {
      frameId = 0;

      if (reducedMotion.matches) {
        wrap.style.setProperty("--story-parallax-y", "0px");
        return;
      }

      const rect = wrap.getBoundingClientRect();
      const viewportCenter = window.innerHeight / 2;
      const elementCenter = rect.top + rect.height / 2;
      const offset = (viewportCenter - elementCenter) * 0.12;

      wrap.style.setProperty("--story-parallax-y", `${offset.toFixed(2)}px`);
    };

    const requestUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(updateOffset);
      }
    };

    updateOffset();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    reducedMotion.addEventListener("change", requestUpdate);

    return () => {
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }

      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      reducedMotion.removeEventListener("change", requestUpdate);
    };
  }, []);

  return (
    <div className={styles.storyImageWrap} ref={wrapRef}>
      <Image
        className={styles.storyImage}
        src="/images/features/story_素材1.jpg"
        alt="柔らかな編み地の質感"
        fill
        sizes="(max-width: 768px) 100vw, 48vw"
      />
    </div>
  );
}
