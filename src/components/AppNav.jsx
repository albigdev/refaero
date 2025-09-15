import styles from "./AppNav.module.css";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useJobs } from "../hooks/useJobs";
import { useState } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function AppNav() {
  const [query, setQuery] = useState("");
  const { filtered, resetFilter, resetSearch, searchForJob } = useJobs();
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  function handleClick() {
    setQuery("");
    resetFilter();
    navigate("/app/jobs");
  }

  useEffect(
    function () {
      if (query.length > 0) searchForJob(query);
      if (query.length === 0) resetSearch();
    },
    [query]
  );

  return (
    <nav className={styles.appNav}>
      <div className={styles.navLinks}>
        <NavLink to="jobs" className={styles.navBtn}>
          Jobs
        </NavLink>
        <NavLink to="companies" className={styles.navBtn}>
          Companies
        </NavLink>
      </div>
      {!["/app/companies", "/app/form"].includes(location.pathname) && (
        <div className={styles.actions}>
          {filtered &&
            (id ? (
              ""
            ) : (
              <button onClick={handleClick} className={styles.resetBtn}>
                Reset
              </button>
            ))}
          {id ? (
            ""
          ) : (
            <input
              type="text"
              className={styles.searchField}
              value={query}
              placeholder="Search for a job"
              onChange={(e) => setQuery(e.target.value)}
            />
          )}
        </div>
      )}
    </nav>
  );
}

export default AppNav;
