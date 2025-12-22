import React from "react";
import { motion } from "framer-motion";
import UploadCard from "../components/UploadCard";
import TextEditor from "../components/TextEditor";

export default function Home() {
  return (
    <div className="page-grid">
      {/* MAIN ANALYZE CARD */}
      <motion.section
        className="card"
        initial={{ scale: 0.98, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        <h2>Quick Analyze</h2>
        <p className="muted">
          Paste text or upload a file to detect bias in language
        </p>
        <TextEditor />
      </motion.section>

      {/* UPLOAD CARD */}
      <motion.section
        className="card"
        initial={{ x: 40, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h3>Upload sample</h3>
        <UploadCard />
      </motion.section>
    </div>
  );
}
