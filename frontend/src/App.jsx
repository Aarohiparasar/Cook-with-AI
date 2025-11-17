import React, { useEffect, useState, useRef } from "react"
import "./App.css"
import { BrowserRouter as Router, Routes, Route, Link, NavLink } from "react-router-dom";
import { Suspense } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAuth } from "./context/AuthContext.jsx";


const SignUp = React.lazy(() => import('./signup/signup'))
const Login = React.lazy(() => import('./Login/login'))
const Home = React.lazy(() => import('./Home/home'))
const GenerateRecipe = React.lazy(() => import('./components/generateRecipe'))
const Layout = React.lazy(() => import('./Home/Layout'))
const RecipeDetails = React.lazy(() => import('./components/RecipeDetails'))


const App = () => {
  return (
    <div className="counter">
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<Login />} />
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/generateRecipe" element={<GenerateRecipe />} />
              <Route path="/recipeDetails" element={<RecipeDetails  />} />
            </Route>
          </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App