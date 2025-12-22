import React from "react";
import { NavLink } from "react-router-dom"; //diferent from Link, NavLink helps to identify active link and the isActive prop
import { motion } from "framer-motion";

const links = [
  { to: "/", label: "Home" },
  { to: "/analyze", label: "Analyze" },
  { to: "/history", label: "History" }
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <motion.div
        className="sidebar-inner"
        initial={{ x: -24, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.45 }}
      >
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={({ isActive }) =>
              `side-link ${isActive ? "active" : ""}`
            }
          >
            {l.label}
          </NavLink>
        ))}
        
      </motion.div>
    </aside>
  );
}
