"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useCart } from "./cart-provider";
import styles from "./page.module.css";

interface HeaderProps {
  alwaysVisible?: boolean;
}

export function Header({ alwaysVisible = false }: HeaderProps) {
  const [isVisible, setIsVisible] = useState(false);
  const { itemCount } = useCart();

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
        <Link className={styles.cartButton} href="/checkout" aria-label="カート">
          {itemCount > 0 ? (
            <span className={styles.cartBadge} aria-label={`${itemCount}点`}>
              {itemCount > 9 ? "9+" : itemCount}
            </span>
          ) : null}
          <span className={styles.cartIcon} aria-hidden="true" />
        </Link>
      </nav>
    </header>
  );
}
