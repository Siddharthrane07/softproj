import axios from "axios";
import { createContext, useEffect, useState,useContext } from "react";

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
      withCredentials: true, // ✅ Important
    });
    setCurrentUser(res.data); // only user info, no token now
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
};



  useEffect(() => {
    // Set axios default header when user changes
    const token = localStorage.getItem("accessToken");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, login }}>
      {children}
    </AuthContext.Provider>
  );
};
