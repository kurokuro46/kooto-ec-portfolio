"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/domain/product/product";
import styles from "./page.module.css";

type ProductCategory = Product["category"];

interface ProductSectionProps {
  products: Product[];
}

const tabs: { label: string; value: ProductCategory }[] = [
  { label: "ベーシック", value: "basic" },
  { label: "夏用", value: "summer" },
  { label: "冬用", value: "winter" },
];

export function ProductSection({ products }: ProductSectionProps) {
  const [activeCategory, setActiveCategory] =
    useState<ProductCategory>("basic");

  const filteredProducts = useMemo(
    () => products.filter((product) => product.category === activeCategory),
    [activeCategory, products],
  );

  return (
    <>
      <div className={styles.tabs} aria-label="Product categories">
        {tabs.map((tab) => (
          <button
            className={tab.value === activeCategory ? styles.activeTab : ""}
            type="button"
            key={tab.value}
            onClick={() => setActiveCategory(tab.value)}
            aria-pressed={tab.value === activeCategory}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className={styles.productGrid}>
        {filteredProducts.map((product) => {
          const firstColor = product.colors[0];

          return (
            <Link
              className={styles.productCard}
              href={`/products/${product.slug}`}
              key={product.name}
              prefetch={false}
            >
              <div className={styles.productImageWrap}>
                <Image
                  className={styles.productImage}
                  src={firstColor.image}
                  alt={`${product.name} ${firstColor.name}`}
                  fill
                  sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                />
                <span className={styles.quickShop}>詳細を見る</span>
              </div>
              <div
                className={styles.colorVariation}
                aria-label={`${product.name} color variations`}
              >
                {product.colors.map((color, index) => (
                  <span
                    className={`${styles.colorOption} ${
                      index === 0 ? styles.activeColorOption : ""
                    }`}
                    key={color.name}
                    title={color.name}
                  >
                    <span
                      className={styles.colorSwatch}
                      style={{ backgroundColor: color.value }}
                      aria-hidden="true"
                    />
                    <span className={styles.visuallyHidden}>
                      {color.name}
                      {index === 0 ? " shown" : ""}
                    </span>
                  </span>
                ))}
              </div>
              <h3>{product.name}</h3>
              <p>{product.price}</p>
            </Link>
          );
        })}
      </div>
    </>
  );
}
