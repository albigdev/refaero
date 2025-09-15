import PageNav from "../components/PageNav";
import styles from "./Pricing.module.css";

function Pricing() {
  return (
    <main className={styles.pricingPage}>
      <PageNav />

      <section>
        <h1>Pricing</h1>
        <h2>Choose a plan to get the most out of your experiences!</h2>
        <div className={styles.pricingPanels}>
          <div className={styles.panel}>
            <h3>Free</h3>
            <p>
              Basic features, you can see all job postings, without limit. You
              can create 1 job.
            </p>
            <div className={styles.price}>
              $0<span>/month</span>
            </div>
            <button className={styles.ctaBtn}>Try for free</button>
          </div>
          <div className={`${styles.panel} ${styles.supporter}`}>
            <h3>Premium</h3>
            <p>All features, no limits!</p>
            <div className={styles.price}>
              $3<span>/month</span>
            </div>
            <button className={styles.ctaBtn}>Subscribe</button>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Pricing;
