import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Analyze from "./pages/Analyze";
import History from "./pages/History";
import AppHeader from "./components/AppHeader";
import Sidebar from "./components/Sidebar";

import Footer from "./components/Footer";
export default function App() {
  return (
    <div className="app-root">
      <AppHeader />
      <div className="app-body">
        <Sidebar />
        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/analyze" element={<Analyze />} />
            <Route path="/history" element={<History />} />
          </Routes>
        </main>
      </div>
      <Footer />

    </div>
  );
}


