import { useState } from "react";
import { analyzeText, rewriteText } from "../services/api";

export function useAnalyze() {
  const [loading, setLoading]         = useState(false);
  const [result, setResult]           = useState(null);
  const [error, setError]             = useState(null);
  const [rewrites, setRewrites]       = useState({});
  const [rewriting, setRewriting]     = useState({});

  async function analyze(text) {
    setLoading(true);
    setError(null);
    setResult(null);
    setRewrites({});
    try {
      const res = await analyzeText(text);
      setResult(res.data);
    } catch {
      setError("Failed to analyze — is the backend running?");
    } finally {
      setLoading(false);
    }
  }

  async function rewrite(text, label, index) {
    setRewriting((prev) => ({ ...prev, [index]: true }));
    try {
      const res = await rewriteText(text, label);
      setRewrites((prev) => ({ ...prev, [index]: res.data.rewritten }));
    } catch {
      setRewrites((prev) => ({ ...prev, [index]: "Rewrite unavailable right now." }));
    } finally {
      setRewriting((prev) => ({ ...prev, [index]: false }));
    }
  }

  return { analyze, loading, result, error, rewrite, rewrites, rewriting };
}