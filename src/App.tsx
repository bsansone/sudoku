import * as React from "react";
import "./App.css";
import GameBoard from "./GameBoard";
import GameBoardRow from "./GameBoardRow";
import GameBoarCell from "./GameBoardCell";
import GameBoardControls from "./GameBoardControls";

interface State {
  board: number[][];
  highlightSelected: boolean;
  selectedCell: SelectedCell;
}

interface SelectedCell {
  row?: number;
  cell?: number;
}

class App extends React.Component<{}, State> {
  constructor(props: {}) {
    super(props);

    this.state = {
      board: [
        [0, 9, 0, 0, 0, 0, 0, 0, 6],
        [0, 0, 0, 9, 6, 0, 4, 8, 5],
        [0, 0, 0, 5, 8, 1, 0, 0, 0],
        [0, 0, 4, 0, 0, 0, 0, 0, 0],
        [5, 1, 7, 2, 0, 0, 9, 0, 0],
        [6, 0, 2, 0, 0, 0, 3, 7, 0],
        [1, 0, 0, 8, 0, 4, 0, 2, 0],
        [7, 0, 6, 0, 0, 0, 8, 1, 0],
        [3, 0, 0, 0, 9, 0, 0, 0, 0]
      ],
      highlightSelected: true,
      selectedCell: {}
    };

    this.handleCellClick = this.handleCellClick.bind(this);
    this.toggleHighlightSelected = this.toggleHighlightSelected.bind(this);
    this.handleCellKeyDown = this.handleCellKeyDown.bind(this);
    this.findAndReplaceCellValue = this.findAndReplaceCellValue.bind(this);
  }

  public handleCellClick(selectedCell: SelectedCell): void {
    this.setState({ selectedCell });
  }

  public toggleHighlightSelected(): void {
    this.setState(state => ({
      highlightSelected: !state.highlightSelected
    }));
  }

  public handleCellKeyDown(value: number): void {
    const newBoard: State["board"] = this.findAndReplaceCellValue(value);

    this.setState({ board: newBoard });
  }

  public render() {
    return (
      <div className="App">
        <div className="App-Title-Wrapper">
          <h1 className="App-Title">Sudoku</h1>
        </div>
        <GameBoard>
          {this.state.board.map((row, i) => (
            <GameBoardRow key={`row-${i}`}>
              {row.map((cell, j) => (
                <GameBoarCell
                  key={`cell-${j}`}
                  cell={j}
                  value={cell}
                  row={i}
                  handleCellClick={this.handleCellClick}
                  selectedCell={this.state.selectedCell}
                  highlightSelected={this.state.highlightSelected}
                  handleCellKeyDown={this.handleCellKeyDown}
                />
              ))}
            </GameBoardRow>
          ))}
        </GameBoard>
        <div className="GameBoard-Controls-Title-Wrapper">
          <h2 className="GameBoard-Controls-Title">Controls</h2>
        </div>
        <GameBoardControls>
          <span onClick={this.toggleHighlightSelected}>
            Highlight selected row/column
            {this.state.highlightSelected ? <span>👍</span> : <span>👎</span>}
          </span>
        </GameBoardControls>
      </div>
    );
  }

  private findAndReplaceCellValue(newValue: number): number[][] {
    const { row: selectedRow, cell: selectedCell } = this.state.selectedCell;
    const currentBoard: State["board"] = this.state.board.slice();

    for (let i = 0; i < currentBoard.length; i++) {
      if (i === selectedRow) {
        const row = currentBoard[i];
        for (let j = 0; j < row.length; j++) {
          if (j === selectedCell) {
            currentBoard[i][j] = newValue;
          }
        }
      }
    }

    return currentBoard;
  }
}

export default App;
