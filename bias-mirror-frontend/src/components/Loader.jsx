import React from "react";

const MESSAGES = [
  "Reading between the lines\u2026",
  "Checking for blind spots\u2026",
  "Looking at this from every angle\u2026",
];

export default function Loader() {
  const msg = MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
  return (
    <div className="loader-container">
      <div className="spinner"></div>
      <div className="loader-text">{msg}</div>
    </div>
  );
}
