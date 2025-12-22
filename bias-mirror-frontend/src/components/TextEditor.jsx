import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAnalyze } from "../hooks/useAnalyze";
import Loader from "./Loader";
import BiasReport from "./BiasReport";

export default function TextEditor() {
  const [text, setText] = useState("");
  const { analyze, loading, result, error } = useAnalyze();

  const submit = async () => {
    if (!text.trim()) return;// prevent analyzing empty text
    await analyze(text);
  };

  return (
    <div>
      <textarea
        className="editor"
        placeholder="Paste text here — short posts, paragraphs, emails, or articles..."
        value={text}
        rows={4}
        onChange={(e) => {
          setText(e.target.value);

          //  AUTO-GROW to prevent the scrollbar inside textarea
          e.target.style.height = "auto";
          e.target.style.height = `${e.target.scrollHeight}px`;
        }}
      />

    

      <div className="editor-actions">
        <button
          className="btn ghost"
          onClick={() => {
            setText("");
          }}
        >
          Clear
        </button>

        <motion.button
          className="btn primary"
          onClick={submit}
          whileTap={{ scale: 0.98 }}
        >
          Analyze
        </motion.button>
      </div>

        
      <div style={{ marginTop: 18 }}>
        {loading && <Loader />}
        {error && <div className="error">{error}</div>}
        {result && <BiasReport data={result} />}
      </div>
    </div>
  );
}
