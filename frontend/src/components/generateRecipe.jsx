import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./generateRecipe.css";
import { useAuth } from "../context/AuthContext.jsx";

const API_URL = import.meta.env.VITE_API_URL;

const GenerateRecipe = () => {
  const navigate = useNavigate();
  const { setRecipeData } = useAuth();

  const [input, setInput] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(false); 

  const handleAddIngredient = () => {
    if (input.trim() === "") return;
    setIngredients([...ingredients, input.trim()]);
    setInput("");
  };

  const handleRemove = (index) => {
    const updated = ingredients.filter((_, i) => i !== index);
    setIngredients(updated);
  };

  const handleGenerate = async () => {
    const finalIngredients =
      ingredients.length > 0
        ? ingredients
        : input.split(",").map((ing) => ing.trim()).filter(Boolean);

    if (finalIngredients.length === 0) {
      alert("Please enter ingredients!");
      return;
    }

    try {
      setLoading(true); 

      const res = await axios.post(
        `${API_URL}/recipes/generate`,
        { ingredients: finalIngredients },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setRecipeData(res.data);
        navigate("/recipeDetails");
      } else {
        alert("Failed to generate recipe");
      }

    } catch (err) {
      console.error("Error generating recipe:", err.response?.data || err.message);
      alert("Failed to generate recipe");

    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="home-container">
      <h1 className="title">🍳 CookAI Recipe Generator</h1>
      <p className="subtitle">
        Enter your ingredients and let AI suggest delicious recipes!
      </p>

      <div className="card">
        <label className="label">Enter ingredients (comma-separated)</label>

        <input
          type="text"
          placeholder="e.g. eggs, tomato, onion"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="input-box"
          disabled={loading}
        />

        <button className="add-btn" onClick={handleAddIngredient} disabled={loading}>
          + Add Ingredient
        </button>

        {ingredients.length > 0 && (
          <div className="tags-container">
            {ingredients.map((ing, i) => (
              <div key={i} className="tag">
                <span>{ing}</span>
                <button className="remove-btn" onClick={() => handleRemove(i)} disabled={loading}>
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}

        <button className="generate-btn" onClick={handleGenerate} disabled={loading}>
          {loading ? (
            <span className="loader"></span>
          ) : (
            "Generate Recipe 🍽️"
          )}
        </button>
      </div>
    </div>
  );
};

export default GenerateRecipe;
