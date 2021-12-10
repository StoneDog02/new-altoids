import {
  createContext,
  useCallback,
  useContext,
  useState,
  useEffect,
  useRef
} from "react";
import { Collisions } from "./Collisions";
import { Transform } from "./Transform";

export const CanvasContext = createContext({
  canvasNode: null,
  ctx: null,
  frame: 0
});

export function Canvas({ children, ...props }) {
  const [canvasNode, setCanvasNode] = useState(null);
  const canvasRef = useCallback((canvasNode) => {
    setCanvasNode(canvasNode);
  }, []);

  const [frame, setFrame] = useState(0);

  const draw = useCallback(
    function draw() {
      setFrame(frame + 1);
    },
    [frame]
  );

  useEffect(() => {
    let raf = window.requestAnimationFrame(draw);

    // TODO: Make this conditional

    return () => {
      window.cancelAnimationFrame(raf);
    };
  }, [draw]);
  function calcAngle(opposite, adjacent) {
    return Math.atan(opposite / adjacent);
  }

  function getMousePos(canvas, evt) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: evt.clientX - rect.left,
      y: evt.clientY - rect.top
    };
  }
  function hippo(sideOne, sideTwo) {
    return Math.sqrt(sideOne * sideOne + sideTwo * sideTwo);
  }
  function draw2(evt) {
    const pos = getMousePos(canvasNode, evt);
    const sideOne = 250;
    // Quad 1
    if (pos.x > 250 && pos.y <= 250) {
      const sideTwo = hippo(pos.x - 250, 250 - pos.y);
      const radians =
        (Math.atan((pos.x - 250) / (250 - pos.y)) * 180) / Math.PI;
      console.log(radians);
    }
    // Quad 2
    if (pos.x > 250 && pos.y > 250) {
      const sideTwo = hippo(pos.x - 250, 250 - pos.y);
      const radians = (Math.atan((pos.x - 250) / (25 - pos.y)) * 180) / Math.PI;
      console.log(radians);
    }
    // Quad 3
    if (pos.x <= 250 && pos.y > 250) {
      const sideTwo = 5;
    }
    // Quad 4
    if (pos.x <= 250 && pos.y <= 250) {
      const sideTwo = 5;
    }
  }

  return (
    <CanvasContext.Provider
      value={{ canvasNode, ctx: canvasNode?.getContext("2d") || null, frame }}
    >
      <Collisions bodies={[]}>
        <Transform transforms={[]}>
          <canvas ref={canvasRef} {...props} onMouseMove={draw2} />
          {!canvasNode ? null : children}
        </Transform>
      </Collisions>
    </CanvasContext.Provider>
  );
}

//Utils:
