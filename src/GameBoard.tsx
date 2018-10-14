import * as React from "react";
import "./App.css";

const GameBoard: React.StatelessComponent<{}> = props => (
  <div className="GameBoard-Wrapper">
    <div className="GameBoard">{props.children}</div>
  </div>
);

export default GameBoard;
