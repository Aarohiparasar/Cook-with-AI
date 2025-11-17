import React, { createContext, useEffect, useState, useContext } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [recipeData, setRecipeData] = useState(() => {
    const saved = localStorage.getItem("recipeData");
    return saved ? JSON.parse(saved) : null;
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (recipeData) {
      localStorage.setItem("recipeData", JSON.stringify(recipeData));
    }
  }, [recipeData]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        if (!token) {
          setLoading(false);
          return;
        }

        const res = await axios.get(`${API_URL}/auth/me`, {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });

        setUser(res.data.user || res.data);

      } catch (err) {
        console.error("Error fetching user:", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

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
