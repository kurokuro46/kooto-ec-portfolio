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

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const restoreCart = window.setTimeout(() => {
      try {
        const storedItems = window.localStorage.getItem(cartStorageKey);
        setItems(storedItems ? JSON.parse(storedItems) : []);
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
