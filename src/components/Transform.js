import { createContext, useContext, useState, useEffect, useRef } from "react";
import { CanvasContext } from "./Canvas";
import anime from "animejs";
import { ControlsContext } from "./Controls";

export const TransformContext = createContext({});

const t = { rotate: 0 };
const a = [
  {
    targets: t,
    rotate: 180,
    loop: true,
    direction: "alternate",
    //  delay: function(el, i) { return i * 100; },
    // elasticity: 200,
    easing: "easeInOutSine"
  }
];
export function Transform({ transforms = a, ...props }) {
  const { frame } = useContext(CanvasContext);
  const { mouseDegrees = 0 } = useContext(ControlsContext);
  const [state, setState] = useState({});
  const [animations, setAnimations] = useState([]);

  const mouseDegreesRef = useRef(0);
  useEffect(() => {
    mouseDegreesRef.current = mouseDegrees;
  });
  const prevMouseDegrees = mouseDegreesRef.current;

  useEffect(() => {
    const animations = transforms.map((transform, idx) => {
      transform.rotate = mouseDegrees;
      transform.targets.rotate = prevMouseDegrees;
      return anime({
        autoplay: false,
        ...transform,
        update: function (a) {
          // console.log(a.animatables[idx].target);
          setState({ ...a.animatables[idx].target });
        }
      });
    });
    setAnimations(animations);
  }, [transforms]);
  useEffect(() => {
    animations.map((animation) => {
      animation.seek(animation.duration * ((frame % 100) / 100));
    });
  }, [frame, animations]);
  // console.log(state)
  return <TransformContext.Provider value={state} {...props} />;
}
