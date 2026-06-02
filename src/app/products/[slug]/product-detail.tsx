"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import type { Product } from "@/domain/product/product";
import styles from "./product-detail.module.css";

interface ProductDetailProps {
  product: Product;
}

interface CartItem {
  productSlug: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  price: string;
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColorName, setSelectedColorName] = useState(
    product.colors[0]?.name ?? "",
  );
  const [selectedSizeLabel, setSelectedSizeLabel] = useState(
    product.sizes[0]?.label ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [addedMessage, setAddedMessage] = useState("");

  const selectedColor = useMemo(
    () =>
      product.colors.find((color) => color.name === selectedColorName) ??
      product.colors[0],
    [product.colors, selectedColorName],
  );

  const selectedSize = useMemo(
    () =>
      product.sizes.find((size) => size.label === selectedSizeLabel) ??
      product.sizes[0],
    [product.sizes, selectedSizeLabel],
  );

  const addToCart = () => {
    const sizeText = `${selectedSize.label} (${selectedSize.range})`;
    const item: CartItem = {
      productSlug: product.slug,
      productName: product.name,
      color: selectedColor.name,
      size: sizeText,
      quantity,
      price: product.price,
    };

    const existing = window.localStorage.getItem("kooto-cart");
    const cartItems: CartItem[] = existing ? JSON.parse(existing) : [];
    window.localStorage.setItem(
      "kooto-cart",
      JSON.stringify([...cartItems, item]),
    );
    setAddedMessage(
      `${product.name} / ${selectedColor.name} / ${sizeText} をカートに追加しました。`,
    );
  };

  return (
    <div className={styles.productShell}>
      <section className={styles.gallery} aria-label={`${product.name} photos`}>
        <div className={styles.mainImageWrap}>
          <Image
            className={styles.productImage}
            src={selectedColor.image}
            alt={`${product.name} ${selectedColor.name}`}
            fill
            sizes="(max-width: 860px) 100vw, 56vw"
            priority
          />
        </div>

        <div className={styles.thumbnails} aria-label="Color preview">
          {product.colors.map((color) => (
            <button
              className={`${styles.thumbnailButton} ${
                color.name === selectedColor.name ? styles.thumbnailActive : ""
              }`}
              type="button"
              key={color.name}
              onClick={() => setSelectedColorName(color.name)}
              aria-label={`${color.name}の写真を表示`}
            >
              <Image
                className={styles.thumbnailImage}
                src={color.image}
                alt=""
                fill
                sizes="88px"
              />
            </button>
          ))}
        </div>
      </section>

      <section className={styles.purchasePanel} aria-labelledby="product-title">
        <p className={styles.eyebrow}>KOOTO SOCKS</p>
        <h1 id="product-title">{product.name}</h1>
        <p className={styles.price}>{product.price}</p>
        <p className={styles.description}>{product.description}</p>

        <div className={styles.optionGroup}>
          <div className={styles.optionHeader}>
            <h2>カラー</h2>
            <span>{selectedColor.name}</span>
          </div>
          <div className={styles.swatches}>
            {product.colors.map((color) => (
              <button
                className={`${styles.swatchButton} ${
                  color.name === selectedColor.name ? styles.optionActive : ""
                }`}
                type="button"
                key={color.name}
                onClick={() => setSelectedColorName(color.name)}
                aria-label={`${color.name}を選択`}
              >
                <span
                  className={styles.swatch}
                  style={{ backgroundColor: color.value }}
                  aria-hidden="true"
                />
              </button>
            ))}
          </div>
        </div>

        <fieldset className={styles.optionGroup}>
          <legend>サイズ</legend>
          <div className={styles.sizeOptions}>
            {product.sizes.map((size) => (
              <label
                className={`${styles.sizeOption} ${
                  size.label === selectedSize.label ? styles.sizeOptionActive : ""
                }`}
                key={size.label}
              >
                <input
                  type="radio"
                  name="size"
                  value={size.label}
                  checked={size.label === selectedSize.label}
                  onChange={() => setSelectedSizeLabel(size.label)}
                />
                <span className={styles.sizeLabel}>{size.label}</span>
                <span className={styles.sizeRange}>{size.range}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className={styles.quantityRow}>
          <label htmlFor="quantity">数量</label>
          <div className={styles.quantityStepper}>
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              aria-label="数量を減らす"
            >
              -
            </button>
            <input
              id="quantity"
              type="number"
              min="1"
              max="20"
              value={quantity}
              onChange={(event) =>
                setQuantity(Math.max(1, Number(event.target.value) || 1))
              }
            />
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.min(20, value + 1))}
              aria-label="数量を増やす"
            >
              +
            </button>
          </div>
        </div>

        <button className={styles.addButton} type="button" onClick={addToCart}>
          カートに追加する
        </button>

        {addedMessage ? (
          <p className={styles.addedMessage} role="status">
            {addedMessage}
          </p>
        ) : null}
      </section>
    </div>
  );
}
