import React from "react";
import { Square } from "./chessSquare";
import "../pallete.css";
function Palete() {
  let squares = [],
    verticallAxis = ["A", "B", "C", "D", "E", "F", "G", "H"],
    horizantalAxis = [1, 2, 3, 4, 5, 6, 7, 8],
    index = 0,
    row = 8,
    column = 0,
    even = true;
  while (index < 64) {
    if (index % 8 === 0) {
      even = !even;
      column = 0;
      row--;
    }
    even = !even;
    squares.push(
      <Square
        key={index}
        cellId={index + 1}
        color={even ? "cyan" : "red"}
        poss={[verticallAxis[column], horizantalAxis[row]]}
      ></Square>
    );
    column++;
    index++;
  }
  return <div>{squares}</div>;
}
export { Palete };
