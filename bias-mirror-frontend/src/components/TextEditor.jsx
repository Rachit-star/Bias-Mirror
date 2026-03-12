import React, { useState } from "react";
import { useAnalyze } from "../hooks/useAnalyze";
import Loader from "./Loader";
import BiasReport from "./BiasReport";

export default function TextEditor() {
  const [text, setText] = useState("");
  const { analyze, loading, result, error, rewrite, rewrites, rewriting } = useAnalyze();

  return (
    <div>
      <div className="editor-wrapper">
        <label className="editor-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 1 1 3 3L7 19l-4 1 1-4Z"/></svg>
          Your text
        </label>
        <textarea
          className="editor"
          placeholder="Paste something here — an article, email, tweet, essay…"
          value={text}
          rows={10}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="editor-footer">
          <span className="char-count">{text.length} characters</span>
          <div className="editor-actions">
            <button className="btn btn-ghost" onClick={() => setText("")} disabled={!text.length}>
              Clear
            </button>
            <button className="btn btn-primary" onClick={() => analyze(text)} disabled={loading || !text.trim()}>
              {loading ? (
                <><span className="spinner" style={{ width: 16, height: 16, borderWidth: 2 }} />Analyzing…</>
              ) : (
                <><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>Analyze</>
              )}
            </button>
          </div>
        </div>
      </div>

      {loading && <Loader />}

      {error && (
        <div className="error-box">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {error}
        </div>
      )}

      {result && (
        <BiasReport
          data={result}
          rewrites={rewrites}
          rewriting={rewriting}
          onRewrite={rewrite}
        />
      )}
    </div>
  );
}