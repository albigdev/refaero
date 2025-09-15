import styles from "./HomePage.module.css";
import PageNav from "../components/PageNav";
import { NavLink } from "react-router-dom";

function HomePage() {
  return (
    <main className={styles.homepage}>
      <PageNav />
      <section>
        <h1>Refaero – Your personal job referral tracker</h1>
        <h2>
          Fresh Air for Your Career – powered by referrals, driven by people.
        </h2>
        <NavLink to="app" className={styles.ctaBtn}>
          Get Started
        </NavLink>
      </section>
    </main>
  );
}

export default HomePage;
