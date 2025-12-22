import React from "react";
import { motion } from "framer-motion";
import TextEditor from "../components/TextEditor";

export default function Analyze() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="page-grid">
      <section className="card wide">
        <h2>Analyze Text</h2>
        <TextEditor />
      </section>
    </motion.div>
  );
}
