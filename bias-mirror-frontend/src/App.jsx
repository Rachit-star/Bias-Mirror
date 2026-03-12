import React from "react";
import AppHeader from "./components/AppHeader";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="app-root">
      <AppHeader />
      <main className="main-content">
        <Home />
      </main>
      <footer className="footer">
        Built by Rachit &middot; <a href="/">Bias Mirror</a>
      </footer>
    </div>
  );
}


