import * as React from "react";
import "./App.css";

const GameBoardRow: React.StatelessComponent<{}> = props => (
  <div className="GameBoard-Row-Wrapper">
    <div className="GameBoard-Row">{props.children}</div>
  </div>
);

export default GameBoardRow;
