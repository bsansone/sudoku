import * as React from "react";
import "./App.css";

const GameBoardControls: React.StatelessComponent<{}> = props => (
  <div className="GameBoard-Controls-Wrapper">
    <div className="GameBoard-Controls">{props.children}</div>
  </div>
);

export default GameBoardControls;
