import style from "./Footer.module.css";

function Footer() {
  return (
    <footer className={style.footer}>
      <p className={StyleSheet.copyright}>
        &copy; Copyright {new Date().getFullYear()} by RefAero Inc.
      </p>
    </footer>
  );
}

export default Footer;
