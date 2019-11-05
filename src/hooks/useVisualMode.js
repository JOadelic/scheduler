import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(mode, replace = false) {
    setMode(mode);
    if (replace) {
      let historyCopy = [...history];
      historyCopy.splice(-1,1, mode);
      setHistory(historyCopy)
    };
  }

  // function back() {
  //   if (history.length > 1) {
  //     // setHistory(hist => hist.slice(1));
  //     // setHistory(([_, ...hist]) => hist);
  //     let historyCopy = [...history];
  //     historyCopy.pop();
  //     let something = historyCopy.slice(-1)[0]
  //     setMode(something)
  //   }
  // }

  function back() {
    if (history.length > 1) {
      history.pop();
      setMode(history[history.length - 1]);
    } else {
      setMode(history[0]);
    }
  }


  return { mode, transition, back }
}