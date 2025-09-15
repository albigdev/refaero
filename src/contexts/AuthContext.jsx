import { useEffect } from "react";
import { createContext, useReducer } from "react";

const BASE_URL = "https://refaero-backend.onrender.com";

const initialState = {
  users: null,
  isLoading: false,
  error: null,
  currentUser: null,
};

const AuthContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "auth/loading":
      return { ...state, isLoading: true };
    case "auth/loaded":
      return { ...state, isLoading: false, users: action.payload };
    case "auth/error":
      return { ...state, isLoading: false, error: action.payload };
    case "auth/login":
      return { ...state, isLoading: false, currentUser: action.payload };
    case "auth/logout":
      return { ...state, currentUser: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

function AuthProvider({ children }) {
  const [{ users, isLoading, error, currentUser }, dispatch] = useReducer(
    reducer,
    {
      ...initialState,
      currentUser: JSON.parse(localStorage.getItem("currentUser")),
    }
  );

  useEffect(function () {
    async function fetchUsers() {
      dispatch({ type: "auth/loading" });
      try {
        const res = await fetch(`${BASE_URL}/users`);
        const data = await res.json();
        dispatch({ type: "auth/loaded", payload: data });
      } catch (err) {
        dispatch({ type: "auth/error", payload: err.message });
      }
    }
    fetchUsers();
  }, []);

  useEffect(
    function () {
      if (currentUser) {
        const { password: _, ...userWithoutPassword } = currentUser;
        localStorage.setItem(
          "currentUser",
          JSON.stringify(userWithoutPassword)
        );
      } else {
        localStorage.removeItem("currentUser");
      }
    },
    [currentUser]
  );

  function login(email, password) {
    const user = users.find(
      (user) => user.email === email && user.password === password
    );
    if (user) {
      dispatch({ type: "auth/login", payload: user });
    } else {
      dispatch({ type: "auth/error", payload: "Invalid email or password" });
    }
  }

  function logout() {
    dispatch({ type: "auth/login", payload: null });
  }

  return (
    <AuthContext.Provider
      value={{ users, isLoading, error, login, logout, currentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
