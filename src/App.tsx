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
    this.handleCellKeyDown = this.handleCellKeyDown.bind(this);
    this.findAndReplaceCellValue = this.findAndReplaceCellValue.bind(this);
    this.handleDigitClick = this.handleDigitClick.bind(this);
    this.isDuplicateValue = this.isDuplicateValue.bind(this);
    this.hasDuplicateRowValue = this.hasDuplicateRowValue.bind(this);
    this.hasDuplicateColumnValue = this.hasDuplicateColumnValue.bind(this);
    this.hasDuplicateValueInSquare = this.hasDuplicateValueInSquare.bind(this);
    this.findEmptyPositions = this.findEmptyPositions.bind(this);
    this.checkIfInitiallyEmpty = this.checkIfInitiallyEmpty.bind(this);
    this.getInitiallySelectedCell = this.getInitiallySelectedCell.bind(this);
  }

  public componentDidMount() {
    this.findEmptyPositions();
    this.getInitiallySelectedCell();
  }

  public findEmptyPositions(): void {
    const { board } = this.state;
    const emptyCells: State["board"] = [];
    board.forEach((row, rowIndex) => {
      row.forEach((cell, column) => {
        if (cell === 0) {
          emptyCells.push([rowIndex, column]);
        }
      });
    });
    this.setState({ emptyCells });
  }

  public getInitiallySelectedCell(): void {
    this.setState(state => ({
      selectedCell: {
        column: 0,
        row: 0,
        value: state.board[0][0]
      }
    }));
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

  public isDuplicateValue(value: number): boolean {
    if (
      this.hasDuplicateRowValue(value) ||
      this.hasDuplicateColumnValue(value) ||
      this.hasDuplicateValueInSquare(value)
    ) {
      this.setState(state => ({
        erroredCell: {
          column: state.selectedCell.column,
          row: state.selectedCell.row
        }
      }));
      return true;
    }
    return false;
  }

  public hasDuplicateRowValue(value: number): boolean {
    const { board, selectedCell } = this.state;
    const selectedRow: number[] = board[selectedCell.row];
    return selectedRow.includes(value);
  }

  public hasDuplicateColumnValue(value: number): boolean {
    const { board, selectedCell } = this.state;
    let hasDuplicateColumnValue: boolean = false;
    for (const row of board) {
      if (row[selectedCell.column] === value) {
        hasDuplicateColumnValue = true;
        break;
      }
    }
    return hasDuplicateColumnValue;
  }

  public hasDuplicateValueInSquare(value: number): boolean {
    const { board, selectedCell } = this.state;
    const selectedSquareRow = Math.floor(selectedCell.row / 3);
    const selectedSquareColumn = Math.floor(selectedCell.column / 3);
    let hasDuplicateValueInSquare = false;
    for (let i = 0; i < board.length; i++) {
      const currentSquareRow = Math.floor(i / 3);
      if (currentSquareRow === selectedSquareRow) {
        const row = board[i];
        for (let j = 0; j < row.length; j++) {
          const currentSquareColumn = Math.floor(j / 3);
          const cell = row[j];
          if (currentSquareColumn === selectedSquareColumn && cell === value) {
            hasDuplicateValueInSquare = true;
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

  public handleDigitClick(value: number): void {
    const { selectedCell } = this.state;
    const selectedRow = selectedCell.row;
    const selectedColumn = selectedCell.column;
    const cell = [selectedRow, selectedColumn];
    if (this.checkIfInitiallyEmpty(cell)) {
      if (
        (this.state.shouldValidateCell && !this.isDuplicateValue(value)) ||
        !this.state.shouldValidateCell
      ) {
        const newBoard: State["board"] = this.findAndReplaceCellValue(value);
        this.setState({ board: newBoard });
      }
    }
  }

  public checkIfInitiallyEmpty(cell: Array<number | undefined>): boolean {
    const { emptyCells } = this.state;
    let initiallyEmpty = false;
    for (const emptyCell of emptyCells) {
      // stringify to compare zeroes as strings
      if (JSON.stringify(emptyCell) === JSON.stringify(cell)) {
        initiallyEmpty = true;
        break;
      }
    }
    return initiallyEmpty;
  }

  public render() {
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
                  handleCellKeyDown={this.handleCellKeyDown}
                  emptyCells={this.state.emptyCells}
                  isInitiallyEmpty={this.checkIfInitiallyEmpty([
                    rowIndex,
                    columnIndex
                  ])}
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
                  onClick={this.handleDigitClick}
                />
              ))}
            </div>
          </div>
        </GameBoardControls>
      </div>
    );
  }

  private findAndReplaceCellValue(newValue: number): number[][] {
    const {
      row: selectedRow,
      column: selectedColumn
    } = this.state.selectedCell;
    const currentBoard: State["board"] = this.state.board.slice();
    for (let i = 0; i < currentBoard.length; i++) {
      if (i === selectedRow) {
        const row = currentBoard[i];
        for (let j = 0; j < row.length; j++) {
          if (j === selectedColumn) {
            currentBoard[i][j] = newValue;
          }
        }
      }
    }
    return currentBoard;
  }
}

export default App;
