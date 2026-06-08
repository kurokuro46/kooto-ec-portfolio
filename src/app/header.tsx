"use client";

import Link from "next/link";
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
        <Link className={styles.siteBrand} href="/">
          <span className={styles.siteBrandName}>KOOTO</span>
          <span> | Socks in Nara</span>
        </Link>
        <a className={styles.cartButton} href="#cart" aria-label="Cart">
          <span aria-hidden="true" />
        </a>
      </nav>
    </header>
  );
}
