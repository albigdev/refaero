import styles from "./AppPage.module.css";
import PageNav from "../components/PageNav";
import SideBar from "../components/SideBar";
import Map from "../components/Map";

function AppPage() {
  return (
    <main className={styles.appPage}>
      <PageNav />
      <section className={styles.appContent}>
        <SideBar />
        <Map />
      </section>
    </main>
  );
}

export default AppPage;
