import React from "react";
import { motion } from "framer-motion";

export default function HighlightedText({ text = "", highlights = [] }) {
  if (!text) return <div className="muted">No text to display</div>;

  const sorted = [...highlights].sort((a, b) => a.start - b.start);
  const parts = [];//to hold plain and highlighted parts
  let cursor = 0; //where we are in the text

  sorted.forEach((h) => {
    const start = Math.max(0, h.start);
    const end = Math.min(text.length, h.end);
    if (start > cursor) {
      parts.push({ type: "plain", text: text.slice(cursor, start) });
    }
    parts.push({ type: "highlight", text: text.slice(start, end), meta: h });
    cursor = end;
  });

  if (cursor < text.length) parts.push({ type: "plain", text: text.slice(cursor) });

  return (
    <div className="highlighted-text">
      {parts.map((p, i) =>
        p.type === "plain" ? (
          <span key={i}>{p.text}</span>
        ) : (
          <motion.span
            key={i}
            className={`hl ${p.meta.label || "unknown"}`}
            title={p.meta.reason || p.meta.label}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 18 }}
          >
            {p.text}
            <span className="hl-badge">{p.meta.label}</span>
          </motion.span>
        )
      )}
    </div>
  );
}

//this code is failing slightly as it highlights the whole text as one highlight
//instead of splitting into multiple highlights
