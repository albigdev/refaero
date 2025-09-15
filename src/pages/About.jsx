import PageNav from "../components/PageNav";
import styles from "./About.module.css";

function About() {
  return (
    <main className={styles.aboutPage}>
      <PageNav />

      <section className={styles.aboutSection}>
        <div className={styles.imageWrapper}>
          <img
            src="./about.avif"
            alt="About RefAero"
            className={styles.aboutImg}
          />
        </div>
        <div className={styles.textWrapper}>
          <h1>About Refaero</h1>
          <h2>Fresh Air, New Heights. Take the next step to your future.</h2>
          <p>
            Refaero is a modern job referral platform designed to connect
            opportunities with talent in a smarter way. Companies and
            individuals can publish referral-based job openings on an
            interactive map, making it easier for job seekers to discover and
            apply for roles that match their skills and interests. By
            visualizing opportunities geographically, Refaero brings clarity,
            transparency, and accessibility to the referral process — empowering
            professionals to leverage trusted connections while helping
            organizations find the right candidates faster.
          </p>
        </div>
      </section>
    </main>
  );
}

export default About;
