import { useContext } from "react";
import { TransformContext } from "./Transform";
import { CanvasContext } from "./Canvas";

export const ORIGIN = { TOP_LEFT: "TOP_LEFT", CENTER: "CENTER" };
export function Rect({ x, y, color, width, height, origin = ORIGIN.TOP_LEFT }) {
  const { ctx, frame } = useContext(CanvasContext);
  const { width: canvasWidth, height: canvasHeight } = ctx.canvas;
  const { translate, scale, rotate = 0 } = useContext(TransformContext);
  const originX = origin === ORIGIN.TOP_LEFT ? 0 : width / 2;
  const originY = origin === ORIGIN.TOP_LEFT ? 0 : height / 2;
  // console.log(rotate)
  ctx.save();
  ctx.translate(x, y);
  // ctx.translate(canvasWidth / 2, canvasHeight / 2);
  ctx.rotate((Math.PI / 180) * rotate);
  ctx.fillStyle = color;
  ctx.fillRect(-originX, -originY, width, height);
  ctx.restore();
  return null;
}
