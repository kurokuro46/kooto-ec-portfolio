import { notFound } from "next/navigation";
import { Header } from "@/app/header";
import { MockProductRepository } from "@/infrastructure/product/mock-repository";
import { ProductDetail } from "./product-detail";
import styles from "./product-detail.module.css";

export async function generateStaticParams() {
  const productRepository = new MockProductRepository();
  const products = await productRepository.findAll();

  return products.map((product) => ({
    slug: product.slug,
  }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const productRepository = new MockProductRepository();
  const products = await productRepository.findAll();
  const product = products.find((item) => item.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Header alwaysVisible />
      <main className={styles.main}>
        <ProductDetail product={product} />
      </main>
    </div>
  );
}
