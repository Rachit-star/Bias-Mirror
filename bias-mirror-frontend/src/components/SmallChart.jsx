import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function SmallChart({ value = 0.2, label = "gender" }) {
  const pct = Math.round((value || 0) * 100);
  return (
    <div className="small-chart">
      <div style={{ width: 46, height: 46 }}>
       <CircularProgressbar
  value={pct}
  text={`${pct}%`}
  styles={buildStyles({
    pathColor: "var(--bias-ring)",
    trailColor: "var(--bias-ring-bg)",
    textColor: "var(--bias-text)",
    textSize: "30px",
  })}
/>

      </div>
      <div className="small-chart-label">{label}</div>
    </div>
  );
}
