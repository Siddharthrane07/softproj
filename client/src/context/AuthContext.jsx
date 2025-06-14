import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const user = localStorage.getItem("user");
      return user ? JSON.parse(user) : null;
    } catch (error) {
      console.error("Failed to parse user from localStorage:  ", error);
      return null;
    }
  });

  const login = async (userData) => {
    try {
      const res = await axios.post("http://localhost:8800/api/auth/login", userData, {
        withCredentials: true,
      });
      setCurrentUser(res.data);
    } catch (error) {
      console.error("Login failed:", error);
      throw error; // still throw if you want to catch it in the component
    }
  };


  useEffect(() => {
    try {
      localStorage.setItem("user", JSON.stringify(currentUser));
    } catch (error) {
      console.error("Failed to save user to localStorage:", error);
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
