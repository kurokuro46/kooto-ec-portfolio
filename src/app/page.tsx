import Image from "next/image";
import styles from "./page.module.css";

const products = [
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

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.nav} aria-label="Main navigation">
          <div className={styles.navLinks}>
            <a className={styles.activeLink} href="#shop">
              Shop
            </a>
            <a href="#story">Story</a>
            <a href="#about">About</a>
          </div>
          <a className={styles.brandMark} href="#" aria-label="KOTOO home">
            K
          </a>
          <a className={styles.cartButton} href="#cart" aria-label="Cart">
            <span aria-hidden="true" />
          </a>
        </nav>
      </header>

      <main className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <Image
            className={styles.heroImage}
            src="/images/hero/hero_1.jpg"
            alt="木のテーブルに置かれた厚手の靴下"
            fill
            priority
            sizes="100vw"
          />
          <div className={styles.heroScrim} />
          <div className={styles.heroCopy}>
            <p>SOCKS IN NARA</p>
            <h1 id="hero-title">KOTOO</h1>
          </div>
        </section>

        <section className={styles.storySection} id="story">
          <div className={styles.storyGrid}>
            <div className={styles.storyCopy}>
              <p className={styles.eyebrow}>OUR PHILOSOPHY</p>
              <h2>ふっくら柔らかな厚み</h2>
              <p className={styles.lead}>
                MAWAL（マワル）は、奈良の静かな工房で、古い編み機を使い一足ずつ丁寧に仕立てています。効率を追い求めず、あえて「ゆっくり」編み上げることで、糸の間に空気がたっぷりと含まれ、驚くほどの弾力と柔らかさが生まれます。
              </p>
              <p>
                足を通した瞬間に感じる、包み込まれるような心地よさ。それは、素材本来の良さを最大限に引き出した、手仕事に近い温もりの証です。
              </p>
              <a className={styles.textButton} href="#about">
                LEARN OUR STORY
                <span aria-hidden="true">→</span>
              </a>
            </div>
            <div className={styles.storyImageWrap}>
              <Image
                className={styles.storyImage}
                src="/images/features/story_素材.jpg"
                alt="柔らかな編み地の質感"
                fill
                sizes="(max-width: 768px) 100vw, 48vw"
              />
            </div>
          </div>
        </section>

        <section className={styles.productsSection} id="shop">
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>SEASONAL SELECTION</p>
              <h2>Featured Products</h2>
            </div>
            <a className={styles.viewAll} href="#products">
              VIEW ALL PRODUCTS
            </a>
          </div>

          <div className={styles.tabs} aria-label="Product categories">
            <button className={styles.activeTab}>ベーシック</button>
            <button>夏用</button>
            <button>冬用</button>
          </div>

          <div className={styles.productGrid}>
            {products.map((product) => (
              <article className={styles.productCard} key={product.name}>
                <div className={styles.productImageWrap}>
                  <Image
                    className={styles.productImage}
                    src={product.image}
                    alt={product.name}
                    fill
                    sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 33vw"
                  />
                  <span className={styles.productTag}>{product.tag}</span>
                  <a className={styles.quickShop} href="#cart">
                    QUICK SHOP
                  </a>
                </div>
                <h3>{product.name}</h3>
                <p>{product.price}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.newsletter} aria-labelledby="newsletter-title">
          <p className={styles.eyebrow}>JOIN OUR COMMUNITY</p>
          <h2 id="newsletter-title">日々の暮らしに、一匙の温もりを。</h2>
          <p>新作の情報や、奈良の工房での製作の様子を定期的にお届けします。</p>
          <form className={styles.form}>
            <label className={styles.visuallyHidden} htmlFor="email">
              メールアドレス
            </label>
            <input id="email" type="email" placeholder="メールアドレス" />
            <button type="submit">登録</button>
          </form>
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
              MAWAL Studio
            </p>
            <a className={styles.emailLink} href="mailto:info@mawal.jp">
              info@mawal.jp
            </a>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <p>© 2024 MAWAL Nara. Crafted for Comfort.</p>
          <div>
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
