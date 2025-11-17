import React from "react";
import { motion } from "framer-motion";
import { ChefHat, Sparkles } from "lucide-react";
import "./heroSection.css";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate=useNavigate()

const handleClick=()=>{
navigate('/generateRecipe')
}

  return (
    <section className="hero">
      <motion.div
        className="hero-content"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <ChefHat size={60} className="hero-icon" />
        <h1>Welcome to <span>CookAI</span> 🍳</h1>
        <p>
          Got random ingredients? Enter them below and let AI cook up ideas for
          you!  
          <Sparkles size={20} className="sparkle-icon" />
        </p>
        <button className="hero-btn" onClick={handleClick}>Get Started</button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
