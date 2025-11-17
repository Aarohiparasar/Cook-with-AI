import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // recipeData stays same
  const [recipeData, setRecipeData] = useState(() => {
    const saved = localStorage.getItem("recipeData");
    return saved ? JSON.parse(saved) : null;
  });

  // save recipeData in localStorage
  useEffect(() => {
    if (recipeData) {
      localStorage.setItem("recipeData", JSON.stringify(recipeData));
    }
  }, [recipeData]);

  // 🔥 Fetch user from cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/auth/me`, {
          withCredentials: true, // send cookie
        });

        setUser(res.data.user || res.data);
      } catch (err) {
        console.log("Error fetching user:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
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
