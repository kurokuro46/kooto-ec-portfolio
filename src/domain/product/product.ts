export interface ProductColor {
  name: string;
  value: string;
  image: string;
}

export interface ProductSize {
  label: string;
  range: string;
}

export interface Product {
  name: string;
  slug: string;
  category: "basic" | "summer" | "winter";
  price: string;
  description: string;
  sizes: ProductSize[];
  colors: ProductColor[];
}
