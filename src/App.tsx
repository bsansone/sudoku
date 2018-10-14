import * as React from "react";
import "./App.css";
import GameBoard from "./GameBoard";
import GameBoardRow from "./GameBoardRow";
import GameBoarCell from "./GameBoardCell";

interface State {
  selectedCell: SelectedCell;
}

interface SelectedCell {
  row?: string;
  cell?: string;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      selectedCell: {}
    };

    this.handleCellClick = this.handleCellClick.bind(this);
  }

  public handleCellClick(selectedCell: SelectedCell): void {
    this.setState({ selectedCell });
  }

  public render() {
    return (
      <div className="App">
        <div className="App-Title-Wrapper">
          <h1 className="App-Title">Sudoku</h1>
        </div>
        <GameBoard>
          {Array.from(Array(9).keys(), row => (
            <GameBoardRow key={row}>
              {Array.from(Array(9).keys(), cell => (
                <GameBoarCell
                  key={cell}
                  cell={String(cell)}
                  row={String(row)}
                  handleCellClick={this.handleCellClick}
                  selectedCell={this.state.selectedCell}
                />
              ))}
            </GameBoardRow>
          ))}
        </GameBoard>
      </div>
    );
  }
}

export default App;
