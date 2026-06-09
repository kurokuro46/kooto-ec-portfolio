"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useCart, type CartItem } from "@/app/cart-provider";
import styles from "./checkout.module.css";

type CheckoutMethod = "standard" | "amazon";
type PaymentMethod = "card" | "paypay";

function getCartItemImage(item: CartItem) {
  if (item.image) return item.image;
  const slug = item.productSlug.replaceAll("-", "_");
  return `/images/products/${slug}_${item.color.toLowerCase()}.jpg`;
}

export function Checkout() {
  const { items, itemCount, removeItem } = useCart();
  const [checkoutMethod, setCheckoutMethod] =
    useState<CheckoutMethod>("standard");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("card");
  const [removingItemIndex, setRemovingItemIndex] = useState<number | null>(
    null,
  );
  const removingItem =
    removingItemIndex === null ? null : items[removingItemIndex];

  const confirmRemove = () => {
    if (removingItemIndex === null) return;
    removeItem(removingItemIndex);
    setRemovingItemIndex(null);
  };

  return (
    <div className={styles.checkoutShell}>
      <div className={styles.checkoutContent}>
        <p className={styles.eyebrow}>CHECKOUT</p>
        <h1>購入手続き</h1>

        <fieldset className={styles.methodCards}>
          <legend>購入方法を選択</legend>
          <label className={checkoutMethod === "standard" ? styles.active : ""}>
            <input
              type="radio"
              name="checkout-method"
              checked={checkoutMethod === "standard"}
              onChange={() => setCheckoutMethod("standard")}
            />
            <strong>通常のお支払い</strong>
            <span>支払い方法とお届け先を入力します</span>
          </label>
          <label className={checkoutMethod === "amazon" ? styles.active : ""}>
            <input
              type="radio"
              name="checkout-method"
              checked={checkoutMethod === "amazon"}
              onChange={() => setCheckoutMethod("amazon")}
            />
            <strong>amazon pay</strong>
            <span>Amazonアカウントの支払い情報と住所を利用します</span>
          </label>
        </fieldset>

        {checkoutMethod === "standard" ? (
          <>
            <section className={styles.formSection}>
              <h2>お支払い方法</h2>
              <div className={styles.paymentOptions}>
                <label className={paymentMethod === "card" ? styles.active : ""}>
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "card"}
                    onChange={() => setPaymentMethod("card")}
                  />
                  クレジットカード
                </label>
                <label
                  className={paymentMethod === "paypay" ? styles.active : ""}
                >
                  <input
                    type="radio"
                    name="payment"
                    checked={paymentMethod === "paypay"}
                    onChange={() => setPaymentMethod("paypay")}
                  />
                  PayPay
                </label>
              </div>
              {paymentMethod === "card" ? (
                <div className={styles.formGrid}>
                  <label className={styles.fullWidth}>
                    カード番号
                    <input inputMode="numeric" placeholder="0000 0000 0000 0000" />
                  </label>
                  <label>
                    有効期限
                    <input placeholder="MM / YY" />
                  </label>
                  <label>
                    セキュリティコード
                    <input inputMode="numeric" placeholder="CVC" />
                  </label>
                </div>
              ) : (
                <p className={styles.helpText}>
                  注文確定後、PayPayの支払い画面へ移動します。
                </p>
              )}
            </section>

            <section className={styles.formSection}>
              <h2>お届け先</h2>
              <div className={styles.formGrid}>
                <label>
                  姓
                  <input autoComplete="family-name" />
                </label>
                <label>
                  名
                  <input autoComplete="given-name" />
                </label>
                <label className={styles.fullWidth}>
                  郵便番号
                  <input autoComplete="postal-code" placeholder="000-0000" />
                </label>
                <label className={styles.fullWidth}>
                  都道府県・市区町村
                  <input autoComplete="address-level1" />
                </label>
                <label className={styles.fullWidth}>
                  番地・建物名
                  <input autoComplete="street-address" />
                </label>
              </div>
            </section>
          </>
        ) : (
          <section className={styles.amazonPanel}>
            <strong>amazon pay</strong>
            <p>Amazonアカウントにログインして、支払い情報とお届け先を選択します。</p>
            <button type="button">Amazonアカウントで続ける</button>
          </section>
        )}
      </div>

      <aside className={styles.orderSummary}>
        <h2>ご注文内容</h2>
        {items.length > 0 ? (
          <ul>
            {items.map((item, index) => (
              <li key={`${item.productSlug}-${item.color}-${item.size}-${index}`}>
                <div className={styles.summaryItem}>
                  <div className={styles.summaryItemImage}>
                    <Image
                      src={getCartItemImage(item)}
                      alt={`${item.productName} ${item.color}`}
                      fill
                      sizes="56px"
                    />
                  </div>
                  <div className={styles.summaryItemDetails}>
                    <strong>{item.productName}</strong>
                    <span>
                      {item.color} / {item.size}
                    </span>
                    <span>{item.quantity}点</span>
                  </div>
                </div>
                <button
                  className={styles.removeButton}
                  type="button"
                  onClick={() => setRemovingItemIndex(index)}
                  aria-label={`${item.productName}を削除`}
                >
                  削除
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className={styles.emptyCart}>カートに商品はありません。</p>
        )}
        <div className={styles.summaryTotal}>
          <span>商品数</span>
          <strong>{itemCount}点</strong>
        </div>
        <button className={styles.orderButton} type="button" disabled={!itemCount}>
          注文を確定する
        </button>
        <Link className={styles.continueLink} href="/#shop">
          買い物を続ける
        </Link>
      </aside>

      {removingItem ? (
        <div
          className={styles.modalBackdrop}
          onClick={() => setRemovingItemIndex(null)}
        >
          <section
            className={styles.removeModal}
            role="dialog"
            aria-modal="true"
            aria-labelledby="remove-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <div className={styles.removeModalImage}>
              <Image
                src={getCartItemImage(removingItem)}
                alt={`${removingItem.productName} ${removingItem.color}`}
                fill
                sizes="180px"
              />
            </div>
            <div className={styles.removeModalContent}>
              <p className={styles.modalEyebrow}>REMOVE ITEM</p>
              <h2 id="remove-modal-title">削除しますか？</h2>
              <p>
                {removingItem.productName} / {removingItem.color} /{" "}
                {removingItem.size}
              </p>
              <div className={styles.removeModalActions}>
                <button type="button" onClick={confirmRemove}>
                  削除する
                </button>
                <button
                  className={styles.cancelButton}
                  type="button"
                  onClick={() => setRemovingItemIndex(null)}
                >
                  キャンセル
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}
