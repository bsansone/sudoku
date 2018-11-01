import * as React from "react";
import "./App.css";

interface Props {
  column: number;
  row: number;
  handleCellClick: (selectedCell: SelectedCell) => void;
  isInitiallyEmpty: boolean;
  selectedCell: SelectedCell;
  value: number;
  handleCellKeyDown: (value: number) => void;
  emptyCells: number[][];
  erroredCell: ErroredCell;
}

interface SelectedCell {
  row?: number;
  column?: number;
  value?: number;
}

interface ErroredCell {
  row?: number;
  column?: number;
}

class GameBoardCell extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public shouldComponentUpdate(prevProps: Props): boolean {
    if (
      this.props.value !== prevProps.value ||
      this.props.selectedCell !== prevProps.selectedCell ||
      this.props.isInitiallyEmpty !== prevProps.isInitiallyEmpty ||
      this.props.erroredCell !== prevProps.erroredCell
    ) {
      return true;
    }

    return false;
  }

  public onClick(): void {
    const selectedCell: SelectedCell = {
      column: this.props.column,
      row: this.props.row,
      value: this.props.value
    };
    this.props.handleCellClick(selectedCell);
  }

  public onKeyDown(event: any): void {
    const isNumber = isFinite(event.key);
    if (isNumber) {
      const enteredNumber: number = Number(event.key);
      this.props.handleCellKeyDown(enteredNumber);
    }
  }

  public render() {
    const { selectedCell, erroredCell } = this.props;
    const sameSelectedRow: boolean = selectedCell.row === this.props.row;
    const sameSelectedCell: boolean = selectedCell.column === this.props.column;
    const isSelected: boolean = sameSelectedRow && sameSelectedCell;
    const sameCellValue: boolean = selectedCell.value === this.props.value;
    const erroredRow = erroredCell.row;
    const erroredColumn = erroredCell.column;
    const isErroredCell =
      this.props.row === erroredRow && this.props.column === erroredColumn;

    let className: string = "GameBoard-Cell-Wrapper";

    if (isSelected && isErroredCell && this.props.isInitiallyEmpty) {
      className += " errored";
    } else {
      if ((this.props.value && sameCellValue) || isSelected) {
        className += " selected-primary";
      }

      if (!this.props.isInitiallyEmpty) {
        className += " initially-filled";
      }
    }

    return (
      <div
        role="button"
        className={className}
        onClick={this.onClick}
        onKeyDown={
          isSelected && !this.props.isInitiallyEmpty
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
