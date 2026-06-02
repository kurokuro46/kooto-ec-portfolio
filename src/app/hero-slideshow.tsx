"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

const heroImages = [
  {
    src: "/images/hero/hero_1.jpg",
    alt: "KOOTOの靴下",
  },
  {
    src: "/images/hero/hero_2.jpg",
    alt: "夏場でも快適なKOOTOの靴下",
  },
  {
    src: "/images/hero/hero_3.jpg",
    alt: "カラフルなKOOTOの靴下",
  },
  {
    src: "/images/hero/hero_4.png",
    alt: "洗濯後のKOOTOの靴下",
  },
];

// 1枚の画像を表示しておく時間です。数値を大きくすると次の画像へ切り替わるまでが長くなります。
const slideDuration = 6800;

export function HeroSlideshow() {
  const [slideState, setSlideState] = useState({
    activeIndex: 0,
    previousIndex: null as number | null,
  });

  useEffect(() => {
    const timerId = window.setInterval(() => {
      setSlideState(({ activeIndex }) => ({
        activeIndex: (activeIndex + 1) % heroImages.length,
        previousIndex: activeIndex,
      }));
    }, slideDuration);

    return () => {
      window.clearInterval(timerId);
    };
  }, []);

  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={styles.heroSlides} aria-hidden="true">
        {heroImages.map((image, index) => (
          <div
            className={`${styles.heroSlide} ${
              index === slideState.activeIndex ? styles.heroSlideActive : ""
            } ${
              index === slideState.previousIndex ? styles.heroSlidePrevious : ""
            } ${
              index === slideState.activeIndex ||
              index === slideState.previousIndex
                ? styles.heroSlideZoom
                : ""
            }`}
            key={image.src}
          >
            <Image
              className={styles.heroImage}
              src={image.src}
              alt={image.alt}
              fill
              priority={index === 0}
              sizes="100vw"
            />
          </div>
        ))}
      </div>
      <div className={styles.heroScrim} />
      <div className={styles.heroCopy}>
        <p>SOCKS IN NARA</p>
        <h1 id="hero-title">KOOTO</h1>
      </div>
    </section>
  );
}
