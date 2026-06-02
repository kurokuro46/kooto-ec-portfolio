import { Product } from "@/domain/product/product";
import { ProductRepository } from "@/domain/product/repository";

// 元のpage.tsxにあったデータをここに移行
const mockProducts: Product[] = [
  {
    name: "Wool Heavy Rib - Ecru",
    price: "¥3,520 (税込)",
    tag: "WOOL MIX",
    image: "/images/products/wool-heavy-rib-ecru.png",
  },
  {
    name: "Cotton Cloud - Charcoal",
    price: "¥2,860 (税込)",
    tag: "COTTON MIX",
    image: "/images/products/cotton-cloud-charcoal.png",
  },
  {
    name: "Silk Blend Pile - Mocha",
    price: "¥4,400 (税込)",
    tag: "PREMIUM LINE",
    image: "/images/products/silk-blend-pile-mocha.png",
  },
];

export class MockProductRepository implements ProductRepository {
  async findAll(): Promise<Product[]> {
    // 実際のDB接続の代わりに、少しだけ遅延（擬似ネットワーク通信）を入れて返すとよりリアルになります
    return mockProducts;
  }
}
