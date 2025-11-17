import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // Load token only once from localStorage
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  // Load recipeData from localStorage once
  const [recipeData, setRecipeData] = useState(() => {
    const saved = localStorage.getItem("recipeData");
    return saved ? JSON.parse(saved) : null;
  });

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔥 Save recipeData whenever it changes
  useEffect(() => {
    if (recipeData) {
      localStorage.setItem("recipeData", JSON.stringify(recipeData));
    }
  }, [recipeData]);

  // 🔥 Fetch user **ONLY** when token exists AND user is not already loaded
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    if (user) {
      setLoading(false); // avoid duplicate calls
      return;
    }

    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUser(res.data.user || res.data);
      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
        localStorage.removeItem("token");
        setToken(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token, user]);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        setToken,
        loading,
        recipeData,
        setRecipeData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
