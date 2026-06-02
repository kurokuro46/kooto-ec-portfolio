import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";
import { MockProductRepository } from "@/infrastructure/product/mock-repository";
import { Header } from "./header";
import { HeroSlideshow } from "./hero-slideshow";
import { StoryParallaxImage } from "./story-parallax-image";

const footerColumns = [
  {
    title: "Collections",
    links: ["New Arrivals", "Wool Series", "Cotton Series", "Gift Sets"],
  },
  {
    title: "Information",
    links: ["Materiality", "Stockists", "Shipping", "Returns"],
  },
];

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
              <p className={styles.eyebrow}>OUR PHILOSOPHY</p>
              <h2>ふっくら柔らかな厚み</h2>
              <p className={styles.lead}>
                KOOTO（コト）は、奈良の静かな工房で、手作業で丁寧に仕立てています。効率を追い求めず、あえて「ゆっくり」編み上げることで、糸の間に空気が含まれ、弾力と柔らかさが生まれます。
              </p>
              <p>
                足を通した瞬間に感じる、包み込まれるような心地よさ。それは、素材本来の良さを最大限に引き出した証です。
              </p>
              <a className={styles.textButton} href="#about">
                LEARN OUR STORY
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <StoryParallaxImage />
          </div>
        </section>

        <section className={styles.productsSection} id="shop">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>PRODUCTS</p>
              <h2>商品</h2>
            </div>
          </div>

          <div className={styles.tabs} aria-label="Product categories">
            <button className={styles.activeTab}>ベーシック</button>
            <button>夏用</button>
            <button>冬用</button>
          </div>

          <div className={styles.productGrid}>
            {products.map((product) => {
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
                    <span className={styles.quickShop}>VIEW DETAILS</span>
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
        </section>

        <section
          className={styles.newsletter}
          aria-labelledby="newsletter-title"
        >
          <h2 id="newsletter-title">あなたを包む、心地よさ</h2>
        </section>
      </main>

      <footer className={styles.footer} id="about">
        <div className={styles.footerGrid}>
          <div className={styles.footerBrand}>
            <div className={styles.footerLogo}>K</div>
            <p>
              奈良から届ける、
              <br />
              ふっくらとした時間。
            </p>
            <div className={styles.socialLinks} aria-label="Social links">
              <a href="#instagram" aria-label="Instagram">
                ◎
              </a>
              <a href="#mail" aria-label="Email">
                ✉
              </a>
            </div>
          </div>

          {footerColumns.map((column) => (
            <div className={styles.footerColumn} key={column.title}>
              <h2>{column.title}</h2>
              {column.links.map((link) => (
                <a href="#" key={link}>
                  {link}
                </a>
              ))}
            </div>
          ))}

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
          <p>© 2026 KOOTO Nara. Crafted for Comfort.</p>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
