"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { useCart } from "@/app/cart-provider";
import type { Product } from "@/domain/product/product";
import styles from "./product-detail.module.css";

export function ProductDetail({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selectedColorName, setSelectedColorName] = useState(
    product.colors[0]?.name ?? "",
  );
  const [selectedSizeLabel, setSelectedSizeLabel] = useState(
    product.sizes[0]?.label ?? "",
  );
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [isAddedModalOpen, setIsAddedModalOpen] = useState(false);

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

  const addToCart = async () => {
    setIsAdding(true);
    await new Promise((resolve) => window.setTimeout(resolve, 850));
    addItem({
      productSlug: product.slug,
      productName: product.name,
      color: selectedColor.name,
      size: `${selectedSize.label} (${selectedSize.range})`,
      quantity,
      price: product.price,
      image: selectedColor.image,
    });
    setIsAdding(false);
    setIsAddedModalOpen(true);
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
        <div className={styles.thumbnails} aria-label="カラープレビュー">
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

        <button
          className={styles.addButton}
          type="button"
          onClick={addToCart}
          disabled={isAdding}
        >
          カートに追加する
        </button>
      </section>

      {isAdding ? (
        <div className={styles.loadingOverlay} role="status" aria-live="polite">
          <span className={styles.loadingSpinner} aria-hidden="true" />
          <p>カートに追加しています</p>
        </div>
      ) : null}

      {isAddedModalOpen ? (
        <div className={styles.modalBackdrop}>
          <section
            className={styles.addedModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="added-modal-title"
          >
            <span className={styles.successMark} aria-hidden="true">
              ✓
            </span>
            <p className={styles.modalEyebrow}>ADDED TO CART</p>
            <h2 id="added-modal-title">カートに追加しました</h2>
            <p>
              {product.name} / {selectedColor.name} / {selectedSize.label} /{" "}
              {quantity}点
            </p>
            <div className={styles.modalActions}>
              <button type="button" onClick={() => router.push("/checkout")}>
                購入に進む
              </button>
              <button
                className={styles.secondaryAction}
                type="button"
                onClick={() => router.push("/#shop")}
              >
                買い物を続ける
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
