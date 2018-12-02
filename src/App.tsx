import * as React from "react";
import "./App.css";
import GameBoard from "./GameBoard";
import GameBoardRow from "./GameBoardRow";
import GameBoardCell from "./GameBoardCell";
import GameBoardControls from "./GameBoardControls";
import DigitButton from "./DigitButton";

interface State {
  board: number[][];
  emptyCells: number[][];
  erroredCell: ErroredCell;
  highlightSelected: boolean;
  selectedCell: SelectedCell;
  shouldValidateCell: boolean;
  isDuplicateValue: boolean;
}

interface SelectedCell {
  row: number;
  column: number;
  value?: number;
}

interface ErroredCell {
  row?: number;
  column?: number;
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
      emptyCells: [],
      erroredCell: {},
      highlightSelected: true,
      isDuplicateValue: false,
      selectedCell: {
        column: 0,
        row: 0
      },
      shouldValidateCell: true
    };

    this.handleCellClick = this.handleCellClick.bind(this);
    this.toggleHighlightSelected = this.toggleHighlightSelected.bind(this);
    this.handleDigitSelect = this.handleDigitSelect.bind(this);
    this.isDuplicateValue = this.isDuplicateValue.bind(this);
    this.hasDuplicateRowValue = this.hasDuplicateRowValue.bind(this);
    this.hasDuplicateColumnValue = this.hasDuplicateColumnValue.bind(this);
    this.hasDuplicateValueInSquare = this.hasDuplicateValueInSquare.bind(this);
    this.findEmptyPositions = this.findEmptyPositions.bind(this);
    this.getInitiallySelectedCell = this.getInitiallySelectedCell.bind(this);
    this.setErroredCell = this.setErroredCell.bind(this);
    this.setValueOnBoard = this.setValueOnBoard.bind(this);
  }

  public componentDidMount() {
    this.findEmptyPositions();
    this.getInitiallySelectedCell();
  }

  private findEmptyPositions(): void {
    const emptyCells: State["board"] = [];
    this.state.board.forEach((row, rowIndex) => {
      row.forEach((cell, column) => {
        if (cell === 0) {
          emptyCells.push([rowIndex, column]);
        }
      });
    });
    this.setState({ emptyCells });
  }

  private getInitiallySelectedCell(): void {
    this.setState(state => ({
      selectedCell: {
        column: 0,
        row: 0,
        value: state.board[0][0]
      }
    }));
  }

  private handleCellClick(selectedCell: SelectedCell): void {
    this.setState({ selectedCell, erroredCell: {} });
  }

  private toggleHighlightSelected(): void {
    this.setState(state => ({
      highlightSelected: !state.highlightSelected
    }));
  }

  private isDuplicateValue(value: number): boolean {
    if (
      this.hasDuplicateValueInSquare(value) ||
      this.hasDuplicateColumnValue(value) ||
      this.hasDuplicateRowValue(value)
    ) {
      return true;
    }
    return false;
  }

  private hasDuplicateRowValue(value: number): boolean {
    const { selectedCell } = this.state;
    let hasDuplicateRowValue: boolean = false;
    for (let i = 0; i < this.state.board[selectedCell.row].length; i++) {
      if (this.state.board[selectedCell.row][i] === value) {
        hasDuplicateRowValue = true;
        this.setErroredCell({ column: i, row: selectedCell.row });
        break;
      }
    }
    return hasDuplicateRowValue;
  }

  private hasDuplicateColumnValue(value: number): boolean {
    const { selectedCell } = this.state;
    let hasDuplicateColumnValue: boolean = false;
    for (let i = 0; i < this.state.board.length; i++) {
      if (this.state.board[i][selectedCell.column] === value) {
        hasDuplicateColumnValue = true;
        this.setErroredCell({ column: selectedCell.column, row: i });
        break;
      }
    }
    return hasDuplicateColumnValue;
  }

  private hasDuplicateValueInSquare(value: number): boolean {
    const { selectedCell } = this.state;
    const selectedSquareRow = Math.floor(selectedCell.row / 3);
    const selectedSquareColumn = Math.floor(selectedCell.column / 3);
    let hasDuplicateValueInSquare = false;
    for (let i = 0; i < this.state.board.length; i++) {
      const currentSquareRow = Math.floor(i / 3);
      if (currentSquareRow === selectedSquareRow) {
        const row = this.state.board[i];
        for (let j = 0; j < row.length; j++) {
          const currentSquareColumn = Math.floor(j / 3);
          const cell = row[j];
          if (currentSquareColumn === selectedSquareColumn && cell === value) {
            hasDuplicateValueInSquare = true;
            this.setErroredCell({ column: j, row: i });
            break;
          }
        }
        if (hasDuplicateValueInSquare) {
          break;
        }
      }
    }
    return hasDuplicateValueInSquare;
  }

  private setErroredCell(erroredCell: ErroredCell): void {
    this.setState({ erroredCell });
  }

  private handleDigitSelect(value: number): void {
    if (
      (this.state.shouldValidateCell && !this.isDuplicateValue(value)) ||
      !this.state.shouldValidateCell
    ) {
      this.setValueOnBoard(value);
    }
  }

  private setValueOnBoard(value: number): void {
    const newBoard: State["board"] = this.state.board.map((row, i, board) => {
      if (i === this.state.selectedCell.row) {
        return board[i].map((column, j) => {
          if (j === this.state.selectedCell.column) {
            return value;
          }
          return column;
        });
      }
      return row;
    });
    this.setState({ board: newBoard });
  }

  public render() {
    console.log("this.state : ", this.state);
    return (
      <div className="App">
        <div className="App-Title-Wrapper">
          <h1 className="App-Title">Sudoku</h1>
        </div>
        <GameBoard>
          {this.state.board.map((row, rowIndex) => (
            <GameBoardRow key={`row-${rowIndex}`}>
              {row.map((value, columnIndex) => (
                <GameBoardCell
                  key={`cell-${columnIndex}`}
                  column={columnIndex}
                  value={value}
                  row={rowIndex}
                  handleCellClick={this.handleCellClick}
                  selectedCell={this.state.selectedCell}
                  handleDigitSelect={this.handleDigitSelect}
                  emptyCells={this.state.emptyCells}
                  erroredCell={this.state.erroredCell}
                />
              ))}
            </GameBoardRow>
          ))}
        </GameBoard>
        <GameBoardControls>
          <div className="GameBoard-Controls-Digits-Wrapper">
            <div className="GameBoard-Controls-Digits">
              {Array.from(Array(9).keys(), digit => (
                <DigitButton
                  key={`digit-${digit}`}
                  value={digit + 1}
                  onClick={this.handleDigitSelect}
                />
              ))}
            </div>
          </div>
        </GameBoardControls>
      </div>
    );
  }
}

export default App;
