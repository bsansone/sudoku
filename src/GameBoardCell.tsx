import * as React from "react";
import "./App.css";

interface Props {
  cell: number;
  row: number;
  handleCellClick: (selectedCell: SelectedCell) => void;
  selectedCell: SelectedCell;
  value: number;
  handleCellKeyDown: (value: number) => void;
  initialBoard: number[][];
}

interface SelectedCell {
  row?: number;
  cell?: number;
  value?: number;
}

class GameBoardCell extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public onClick() {
    const selectedCell: SelectedCell = {
      cell: this.props.cell,
      row: this.props.row,
      value: this.props.value
    };
    this.props.handleCellClick(selectedCell);
  }

  public onKeyDown(event: any) {
    const isNumber = isFinite(event.key);
    if (isNumber) {
      const enteredNumber: number = Number(event.key);
      this.props.handleCellKeyDown(enteredNumber);
    }
  }

  public render() {
    const sameSelectedRow: boolean =
      this.props.selectedCell.row === this.props.row;
    const sameSelectedCell: boolean =
      this.props.selectedCell.cell === this.props.cell;
    const isSelected: boolean = sameSelectedRow && sameSelectedCell;
    const sameCellValue: boolean =
      this.props.selectedCell.value === this.props.value;
    const initiallyFilled =
      this.props.initialBoard[this.props.row][this.props.cell] !== 0;
    let className: string = "GameBoard-Cell-Wrapper";

    if ((this.props.value && sameCellValue) || isSelected) {
      className += " selected-primary";
    }

    if (initiallyFilled) {
      className += " initially-filled";
    }

    return (
      <div
        role="button"
        className={className}
        onClick={this.onClick}
        onKeyDown={
          isSelected && !initiallyFilled
            ? e => {
                this.onKeyDown(e);
              }
            : undefined
        }
        tabIndex={0}
      >
        <div className="GameBoard-Cell">
          {this.props.value !== 0 && <span>{this.props.value}</span>}
        </div>
      </div>
    );
  }
}

export default GameBoardCell;
