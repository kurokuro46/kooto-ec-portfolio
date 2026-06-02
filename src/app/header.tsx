"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

export function Header() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > 8);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, []);

  return (
    <header
      className={`${styles.header} ${isVisible ? styles.headerVisible : ""}`}
    >
      <nav className={styles.nav} aria-label="Main navigation">
        <div className={styles.navLinks}>
          <a className={styles.activeLink} href="#shop">
            Shop
          </a>
          <a href="#story">Story</a>
          <a href="#about">About</a>
        </div>
        <a className={styles.brandMark} href="#" aria-label="KOOTO home">
          K
        </a>
        <a className={styles.cartButton} href="#cart" aria-label="Cart">
          <span aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
