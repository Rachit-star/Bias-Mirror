import React from "react";
import HighlightedText from "./HighlightedText.jsx";
import HeatmapChart from "./HeatmapChart.jsx";
import SmallChart from "./SmallChart.jsx";
import { motion } from "framer-motion";
//received data as JSON from backend with text and highlights from POST/api/analyze

export default function BiasReport({ data }) {
  const { scores = {}, highlights = [], suggestions = [], original_text = "" } = data || {}; //destructure data object to get scores, highlights, suggestions and original_text

  return (
    <motion.div className="report" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="report-header">
        <div>
          <h4>Bias Snapshot</h4>
          <p className="muted">Score indicates intensity (0: low → 1: high)</p>
        </div>
        <div className="report-scores">
          {Object.keys(scores).length ? (
            Object.keys(scores).map((k) => (  //map through scores object to create SmallChart for each score
              <div key={k} className="score-pill">
                <SmallChart value={scores[k]} label={k} />
              </div>
            ))
          ) : (
            <div className="muted">No scores</div>
          )}
        </div>
      </div>

      <div className="report-body">
        <section className="report-left">
          <h5>Highlights</h5>
          <HighlightedText text={original_text} highlights={highlights} />
          <h5 style={{ marginTop: 14 }}>Suggestions</h5>
          <ul className="suggestions">
            {suggestions.length ? suggestions.map((s, i) => <li key={i}>{s}</li>) : <li className="muted">No suggestions</li>}
          </ul>
        </section>

        <section className="report-right">
          <h5>Bias Heatmap</h5>
          <HeatmapChart highlights={highlights} text={original_text} />
        </section>
      </div>
    </motion.div>
  );
}