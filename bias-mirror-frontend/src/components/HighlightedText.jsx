import React from "react";

export default function HighlightedText({ text = "", highlights = [] }) {
  if (!text) return <div className="empty-state">No text to display.</div>;

  const sorted = [...highlights].sort((a, b) => a.start - b.start);
  const parts = [];
  let cursor = 0;

  sorted.forEach((h) => {
    const start = Math.max(0, h.start);
    const end = Math.min(text.length, h.end);
    if (start > cursor) {
      parts.push({ type: "plain", text: text.slice(cursor, start) });
    }
    if (start < end) {
      parts.push({ type: "highlight", text: text.slice(start, end), meta: h });
    }
    cursor = Math.max(cursor, end);
  });

  if (cursor < text.length) {
    parts.push({ type: "plain", text: text.slice(cursor) });
  }

  return (
    <div className="highlighted-text">
      {parts.map((p, i) =>
        p.type === "plain" ? (
          <span key={i}>{p.text}</span>
        ) : (
          <span
            key={i}
            className={`hl ${(p.meta.label || "unknown").toLowerCase()}`}
            title={p.meta.reason || p.meta.label}
          >
            {p.text}
            <span className="hl-badge">{p.meta.label}</span>
          </span>
        )
      )}
    </div>
  );
}
