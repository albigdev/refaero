import PageNav from "../components/PageNav";
import styles from "./Login.module.css";
import { useAuth } from "../hooks/useAuth";
import Spinner from "../components/Spinner";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const { isLoading, login, currentUser } = useAuth();
  const [email, setEmail] = useState("janedoe@example.com");
  const [password, setPassword] = useState("password123");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    login(email, password);
  }

  useEffect(
    function () {
      if (currentUser) {
        navigate("/app/jobs", { replace: true });
      }
    },
    [currentUser]
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <main className={styles.loginPage}>
      <PageNav />

      <section className={styles.loginSection}>
        <div className={styles.formWrapper}>
          <h1>Login</h1>
          <form className={styles.loginForm} onSubmit={handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              autoComplete="username"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              autoComplete="current-password"
            />

            <button type="submit" className={styles.loginBtn}>
              Sign in
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}

export default Login;
