import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setMode(mode);
    if (!replace) {
      setHistory(prev => [mode, ...prev])
    };
  }

  function back() {
    if (history.length > 1) {
      // setHistory(hist => hist.slice(1));
      setHistory(([_, ...hist]) => hist);
      setMode(history[0])
    }
  }

  return { mode, transition, back }
}