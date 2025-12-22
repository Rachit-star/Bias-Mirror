import React from "react";
import { motion } from "framer-motion";

export default function Loader() {
  return (
    <div className="loader">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }} className="dot" />
      <div className="loader-text">Analyzing...</div>
    </div>
  );
}
