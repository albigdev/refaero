import style from "./SideBar.module.css";
import Footer from "./Footer";
import AppNav from "./AppNav";
import { Outlet } from "react-router-dom";

function SideBar() {
  return (
    <main className={style.sidebar}>
      <AppNav />

      <Outlet />

      <Footer />
    </main>
  );
}

export default SideBar;
