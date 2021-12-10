// https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas

import { createContext, useContext, useState, useEffect } from "react";
import { CanvasContext } from "./Canvas";
import anime from "animejs";

export const ControlsContext = createContext({});

export function Controls({ transforms = a, ...props }) {
  const [state, setState] = useState({});

  // console.log(state)
  return <ControlsContext.Provider value={state} {...props} />;
}
