import React from "react";
import { motion } from "framer-motion";

export default function History() {
  return (
    <motion.div className="page-grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <section className="card">
        <h3>Your past analyses</h3>
        <p className="muted">Saved reports will appear here once you connect the backend.</p>
      </section>
    </motion.div>
  );
}
