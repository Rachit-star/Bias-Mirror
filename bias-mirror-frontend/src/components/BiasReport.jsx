import React from "react";
import HighlightedText from "./HighlightedText";

const LABEL_COLORS = {
  gender:    "c2",
  racial:    "c0",
  political: "c4",
  toxic:     "c5",
  neutral:   "c1",
};

function ScoreBar({ label, value }) {
  const pct = Math.round((value || 0) * 100);
  const colorClass = LABEL_COLORS[label] || "c3";
  return (
    <div className="score-row">
      <span className="score-row-label">{label}</span>
      <div className="score-bar-track">
        <div className={`score-bar-fill ${colorClass}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="score-row-pct">{pct}%</span>
    </div>
  );
}

function RewriteBlock({ highlight, index, rewrites, rewriting, onRewrite }) {
  const rewritten = rewrites[index];
  const isLoading = rewriting[index];

  return (
    <div className="rewrite-block">
      <div className="rewrite-original">
        <span className={`hl-badge-inline ${highlight.label}`}>{highlight.label}</span>
        <span>{highlight.text || "—"}</span>
      </div>

      {rewritten ? (
        <div className="rewrite-result">
          <span className="rewrite-label">Rewritten</span>
          <p>{rewritten}</p>
        </div>
      ) : (
        <button
          className="btn btn-ghost btn-sm"
          onClick={() => onRewrite(highlight.text, highlight.label, index)}
          disabled={isLoading}
        >
          {isLoading ? (
            <><span className="spinner" style={{ width: 12, height: 12, borderWidth: 2 }} />Rewriting…</>
          ) : (
            <>✦ Rewrite neutrally</>
          )}
        </button>
      )}
    </div>
  );
}

export default function BiasReport({ data, rewrites = {}, rewriting = {}, onRewrite }) {
  const { scores = {}, highlights = [], suggestions = [], original_text = "" } = data;

  // Attach original text to each highlight for rewrite
  const highlightsWithText = highlights.map((h) => ({
    ...h,
    text: original_text.slice(h.start, h.end),
  }));

  const biasHighlights = highlightsWithText.filter((h) => h.label !== "neutral");

  const totalBias = Math.round(
    Object.entries(scores)
      .filter(([k]) => k !== "neutral")
      .reduce((s, [, v]) => s + v, 0) /
    Math.max(Object.keys(scores).filter((k) => k !== "neutral").length, 1) * 100
  );

  return (
    <div className="report">
      <div className="report-header">
        <div className="report-title">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
          Analysis Results
        </div>
        <div className="report-overall">
          Bias score <strong>{totalBias}%</strong>
        </div>
      </div>

      {/* Scores */}
      <div className="scores-section">
        {Object.entries(scores).map(([label, value]) => (
          <ScoreBar key={label} label={label} value={value} />
        ))}
      </div>

      {/* Highlighted text */}
      <div className="highlights-section">
        <div className="section-heading">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/></svg>
          Highlighted Bias
        </div>
        {highlights.length > 0 ? (
          <HighlightedText text={original_text} highlights={highlights} />
        ) : (
          <div className="empty-state">No biased phrases detected.</div>
        )}
      </div>

      {/* Rewrite section */}
      {biasHighlights.length > 0 && (
        <div className="highlights-section">
          <div className="section-heading">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>
            Rewrite Suggestions
          </div>
          <div className="rewrite-list">
            {biasHighlights.map((h, i) => (
              <RewriteBlock
                key={i}
                index={i}
                highlight={h}
                rewrites={rewrites}
                rewriting={rewriting}
                onRewrite={onRewrite}
              />
            ))}
          </div>
        </div>
      )}

      {/* Suggestions */}
      <div className="suggestions-section">
        <div className="section-heading">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7h6c2-1.5 4-4 4-7a7 7 0 0 0-7-7Z"/><path d="M9 21h6"/><path d="M10 17h4"/></svg>
          Suggestions
        </div>
        {suggestions.length > 0 ? (
          <ul className="suggestions-list">
            {suggestions.map((s, i) => (
              <li key={i} className="suggestion-item">
                <svg className="suggestion-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a7 7 0 0 0-7 7c0 3 2 5.5 4 7h6c2-1.5 4-4 4-7a7 7 0 0 0-7-7Z"/><path d="M9 21h6"/><path d="M10 17h4"/></svg>
                {s}
              </li>
            ))}
          </ul>
        ) : (
          <div className="empty-state">No suggestions — your text looks good!</div>
        )}
      </div>
    </div>
  );
}