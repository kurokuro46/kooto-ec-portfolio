import Image from "next/image";
import styles from "./page.module.css";
import { MockProductRepository } from "@/infrastructure/product/mock-repository";
import { Header } from "./header";
import { HeroSlideshow } from "./hero-slideshow";
import { ProductSection } from "./product-section";
import { ScrollRevealText } from "./scroll-reveal-text";
import { StoryParallaxImage } from "./story-parallax-image";

export default async function Home() {
  // モックリポジトリから商品データを取得
  const productRepository = new MockProductRepository();
  const products = await productRepository.findAll();

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <HeroSlideshow />

        <section className={styles.storySection} id="story">
          <div className={styles.storyGrid}>
            <div className={styles.storyCopy}>
              <ScrollRevealText
                as="p"
                className={styles.eyebrow}
                text="OUR POLICY"
              />
              <ScrollRevealText as="h2" text="ふっくら柔らかな厚み" />
              <ScrollRevealText
                as="p"
                className={styles.lead}
                text="KOOTOは、奈良の静かな工房で、手作業で丁寧に仕立てています。効率を追い求めず、あえて「ゆっくり」編み上げることで、糸の間に空気が含まれ、弾力と柔らかさが生まれます。"
              />
              <ScrollRevealText
                as="p"
                text="足を通した瞬間に感じる、包み込まれるような心地よさ。それは、素材本来の良さを最大限に引き出した証です。"
              />
            </div>
            <StoryParallaxImage />
          </div>
        </section>

        <section className={styles.productsSection} id="shop">
          <div className={styles.sectionHeader}>
            <div>
              <ScrollRevealText
                as="p"
                className={styles.eyebrow}
                text="PRODUCTS"
              />
              <ScrollRevealText as="h2" text="商品" />
            </div>
          </div>

          <ProductSection products={products} />
        </section>

        <section
          className={styles.conceptSection}
          id="concept"
          aria-labelledby="concept-title"
        >
          <ScrollRevealText
            as="h2"
            id="concept-title"
            text="あなたを包む、心地よさ"
          />
          <div className={styles.conceptImageWrap}>
            <Image
              className={styles.conceptImage}
              src="/images/features/concept.jpg"
              alt=""
              fill
              sizes="100vw"
            />
          </div>
        </section>
      </main>

      <footer className={styles.footer} id="about">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <p>
              奈良から届ける、
              <br />
              ふっくらとした厚み。
            </p>
            <div className={styles.socialLinks} aria-label="Social links"></div>
          </div>

          <div className={styles.footerColumn}>
            <h2>Contact</h2>
            <p>
              奈良県奈良市
              <br />
              KOOTO Studio
            </p>
            <a className={styles.emailLink} href="mailto:info@kooto.jp">
              info@kooto.jp
            </a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2026 KOOTO Nara. </p>
          <p>2026 R.K. portfolio.</p>
        </div>
      </footer>
    </div>
  );
}
