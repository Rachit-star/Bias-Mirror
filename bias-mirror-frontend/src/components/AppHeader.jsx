import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

export default function AppHeader() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  // Apply theme to document root by reading the value of theme state variable.
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);
 
  //function to toggle between light and dark mode
  const toggle = () => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  };

  return (
    <header className="app-header">
      <div className="header-left">
        <motion.img
          src={logo}
          alt="Bias Mirror"
          className="logo"
          initial={{ rotate: -20, opacity: 0 }}
          animate={{ rotate: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
        <motion.h1
          className="brand"
          initial={{ y: -8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.12 }}
        >
          Bias Mirror
        </motion.h1>
      </div>

      <div className="header-right">
        <button className="header-cta" onClick={() => window.location.href = "/analyze"}>
          Try It
        </button>

        {/* Toggle button for light and dark mode(tho i prefer dark mode) */}
        <button className="theme-toggle" onClick={toggle}>
          {theme === "light" ? "🌙" : "☀️"}
        </button>
      </div>
    </header>
  );
}
