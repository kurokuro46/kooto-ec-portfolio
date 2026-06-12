"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export interface CartItem {
  productSlug: string;
  productName: string;
  color: string;
  size: string;
  quantity: number;
  price: string;
  image?: string;
}

interface CartContextValue {
  items: CartItem[];
  itemCount: number;
  addItem: (item: CartItem) => void;
  removeItem: (index: number) => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const cartStorageKey = "kooto-cart";
const maxCartItems = 50;
const maxTextLength = 200;

function isSafeCartItem(value: unknown): value is CartItem {
  if (!value || typeof value !== "object") return false;

  const item = value as Record<string, unknown>;
  const textFields = [
    item.productSlug,
    item.productName,
    item.color,
    item.size,
    item.price,
  ];

  return (
    textFields.every(
      (field) =>
        typeof field === "string" &&
        field.length > 0 &&
        field.length <= maxTextLength,
    ) &&
    Number.isInteger(item.quantity) &&
    Number(item.quantity) >= 1 &&
    Number(item.quantity) <= 20 &&
    (item.image === undefined ||
      (typeof item.image === "string" &&
        item.image.startsWith("/images/products/") &&
        item.image.length <= maxTextLength))
  );
}

function parseStoredCart(value: string | null): CartItem[] {
  if (!value) return [];

  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed)) return [];

  return parsed.slice(0, maxCartItems).filter(isSafeCartItem);
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const restoreCart = window.setTimeout(() => {
      try {
        const storedItems = window.localStorage.getItem(cartStorageKey);
        setItems(parseStoredCart(storedItems));
      } catch {
        setItems([]);
      }
    }, 0);

    return () => window.clearTimeout(restoreCart);
  }, []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      itemCount: items.reduce((total, item) => total + item.quantity, 0),
      addItem: (item) => {
        setItems((currentItems) => {
          const nextItems = [...currentItems, item];
          window.localStorage.setItem(cartStorageKey, JSON.stringify(nextItems));
          return nextItems;
        });
      },
      removeItem: (index) => {
        setItems((currentItems) => {
          const nextItems = currentItems.filter(
            (_, itemIndex) => itemIndex !== index,
          );
          window.localStorage.setItem(cartStorageKey, JSON.stringify(nextItems));
          return nextItems;
        });
      },
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within CartProvider");
  return context;
}
