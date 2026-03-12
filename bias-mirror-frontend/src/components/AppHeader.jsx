import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function AppHeader() {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem("theme") || "dark"
  );

  useEffect(() => {
    document.documentElement.className = theme === "light" ? "light" : "";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  return (
    <header className="header">
      <a href="/" className="header-brand">
        <img src={logo} alt="Bias Mirror" className="header-logo" />
        <span>Bias Mirror</span>
      </a>
      <div className="header-actions">
        <button className="theme-toggle" onClick={toggle} title="Toggle theme">
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
      </div>
    </header>
  );
}
