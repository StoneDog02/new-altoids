import { Rect } from "./Rect";

export function Square(props) {
  return <Rect height={props.width} {...props} />;
}
