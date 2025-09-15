import styles from "./PageNav.module.css";
import Logo from "./Logo";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

function PageNav() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <nav className={styles.pageNav}>
      <div className={styles.logo}>
        <Logo />
      </div>
      {currentUser ? (
        <div className={styles.profilePanel}>
          <img
            src={currentUser.avatar}
            alt="Profile"
            className={styles.profileImg}
          />
          <span className={styles.profileName}>{currentUser.name}</span>
          <button className={styles.logoffBtn} onClick={handleClick}>
            Log off
          </button>
        </div>
      ) : (
        <ul className={styles.links}>
          <li>
            <NavLink to="/pricing" className={styles.link}>
              Pricing
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={styles.link}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" className={styles.loginBtn}>
              Login
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
}

export default PageNav;
