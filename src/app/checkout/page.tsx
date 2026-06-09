import { Header } from "@/app/header";
import { Checkout } from "./checkout";
import styles from "./checkout.module.css";

export default function CheckoutPage() {
  return (
    <div className={styles.page}>
      <Header alwaysVisible />
      <main className={styles.main}>
        <Checkout />
      </main>
    </div>
  );
}
