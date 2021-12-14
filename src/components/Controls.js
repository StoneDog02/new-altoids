// https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas

import { createContext, useContext, useState, useEffect } from "react";
import { CanvasContext } from "./Canvas";

export const ControlsContext = createContext({});

export function Controls({ controls, ...props }) {
  // onMouseMove={draw2}
  const { ctx, canvasNode } = useContext(CanvasContext);
  const [mouseDegrees, setMouseDegrees] = useState(0);

  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  function draw2(evt) {
    const pos = getMousePos(canvasNode, evt);
    let mouseDegrees = 0;
    // Quad 1
    if (pos.x > 250 && pos.y <= 250) {
      mouseDegrees = (Math.atan((pos.x - 250) / (250 - pos.y)) * 180) / Math.PI;
    }
    // Quad 2
    if (pos.x > 250 && pos.y > 250) {
      mouseDegrees =
        90 + (Math.atan((pos.y - 250) / (pos.x - 250)) * 180) / Math.PI;
    }
    // Quad 3
    if (pos.x <= 250 && pos.y > 250) {
      mouseDegrees =
        180 + (Math.atan((250 - pos.x) / (pos.y - 250)) * 180) / Math.PI;
    }
    // Quad 4
    if (pos.x <= 250 && pos.y <= 250) {
      mouseDegrees =
        270 + (Math.atan((250 - pos.y) / (250 - pos.x)) * 180) / Math.PI;
    }
    setMouseDegrees(mouseDegrees);
  }

  useEffect(() => {
    if (canvasNode) {
      canvasNode.addEventListener("mousemove", draw2);
      return () => canvasNode.removeEventListener("mousemove", draw2);
    }
    return () => {};
  }, [canvasNode]);

  // console.log(state)
  return <ControlsContext.Provider value={{ mouseDegrees }} {...props} />;
}
