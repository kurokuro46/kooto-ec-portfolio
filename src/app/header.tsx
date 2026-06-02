"use client";

import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface HeaderProps {
  alwaysVisible?: boolean;
}

export function Header({ alwaysVisible = false }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (alwaysVisible) {
      return;
    }

    const updateVisibility = () => {
      setIsVisible(window.scrollY > 8);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateVisibility);
    };
  }, [alwaysVisible]);

  return (
    <header
      className={`${styles.header} ${
        alwaysVisible || isVisible ? styles.headerVisible : ""
      }`}
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
