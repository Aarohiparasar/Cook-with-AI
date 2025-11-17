import React from "react";
import "./recipeDetails.css";
import { useAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";


const RecipeDetails = () => {
    const { recipeData } = useAuth();
        const navigate = useNavigate();

    console.log(recipeData)
    if (!recipeData || !recipeData?.recipes) {
        return <h2>No recipes found!</h2>;
    }

    return (
        <div className="recipe-list-container">
            <button
                className="back-btn"
                onClick={() => navigate("/generateRecipe")}
            >
                ⬅ Back to Ingredients
            </button>
            <h1 className="page-title">🍽️ Generated Recipes</h1>

            {recipeData.recipes.map((recipe, index) => (
                <div key={index} className="recipe-card">

                    <h2 className="recipe-title">{recipe.title}</h2>

                    <div className="recipe-meta">
                        <p><strong>Type:</strong> {recipe.type}</p>
                        <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
                    </div>

                    <h3>🧂 Ingredients</h3>
                    <ul className="ingredient-list">
                        {recipe.ingredients.map((ing, i) => (
                            <li key={i}>{ing}</li>  
                        ))}
                    </ul>

                    <h3>👨‍🍳 Instructions</h3>
                    <ol className="instruction-list">
                        {recipe.instructions.map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                    </ol>

                    <h3>📊 Nutrition Facts</h3>
                    <div className="nutrition-box">
                        <p><strong>Calories:</strong> {recipe.nutrition?.calories}</p>
                        <p><strong>Protein:</strong> {recipe.nutrition?.protein}</p>
                        <p><strong>Carbs:</strong> {recipe.nutrition?.carbs}</p>
                        <p><strong>Fat:</strong> {recipe.nutrition?.fat}</p>
                    </div>

                </div>
            ))}
        </div>
    );
};

export default RecipeDetails;
