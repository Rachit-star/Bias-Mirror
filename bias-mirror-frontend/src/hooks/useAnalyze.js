import { useState } from "react";
import api from "../services/api";
import { toast } from "react-toastify";

export function useAnalyze() {
  const [loading, setLoading] = useState(false); //used for showing loading state
  const [result, setResult] = useState(null); //stores the analysis result
  const [error, setError] = useState(null);//stores any error that occurs during analysis

    //function to analyze the given text called by TextEditor component
  async function analyze(text) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      // API call to backend analyze endpoint
      const res = await api.post("/analyze", { text });
      setResult(res.data);
    } catch (e) { //error handling
      console.error(e);
      setError("Failed to analyze — backend may not be running.");
      toast.error("Analyze failed. Check console.");
    } finally { //this is to ensure loading is set to false after the API call is complete and guarentees UI recovery
      setLoading(false);
    }
  }

  return { analyze, loading, result, error };
}
