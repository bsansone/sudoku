import * as React from "react";
import "./App.css";

interface Props {
  column: number;
  row: number;
  handleCellClick: (selectedCell: SelectedCell) => void;
  selectedCell: SelectedCell;
  value: number;
  handleCellKeyDown: (value: number) => void;
  emptyCells: number[][];
  erroredCell: ErroredCell;
}

interface State {
  isInitiallyEmpty: boolean;
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

class GameBoardCell extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isInitiallyEmpty: false
    };

    this.onClick = this.onClick.bind(this);
    this.checkIfInitiallyEmpty = this.checkIfInitiallyEmpty.bind(this);
  }

  public shouldComponentUpdate(prevProps: Props, prevState: State): boolean {
    if (
      this.props.value !== prevProps.value ||
      this.props.selectedCell !== prevProps.selectedCell ||
      this.state.isInitiallyEmpty !== prevState.isInitiallyEmpty ||
      this.props.erroredCell !== prevProps.erroredCell ||
      this.props.emptyCells !== prevProps.emptyCells
    ) {
      return true;
    }
    return false;
  }

  public componentDidUpdate(nextProps: Props): void {
    if (this.props.emptyCells !== nextProps.emptyCells) {
      this.checkIfInitiallyEmpty([this.props.row, this.props.column]);
    }
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
    if (isNumber && !this.state.isInitiallyEmpty) {
      const enteredNumber: number = Number(event.key);
      this.props.handleCellKeyDown(enteredNumber);
    }
  }

  public checkIfInitiallyEmpty(cell: Array<number | undefined>): void {
    let isInitiallyEmpty = false;
    for (const emptyCell of this.props.emptyCells) {
      // stringify to compare zeroes as strings
      if (JSON.stringify(emptyCell) === JSON.stringify(cell)) {
        isInitiallyEmpty = true;
        break;
      }
    }
    this.setState({ isInitiallyEmpty });
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

    if ((this.props.value && sameCellValue) || isSelected) {
      className += " selected-primary";
    }

    if (!this.state.isInitiallyEmpty) {
      className += " initially-filled";
    }

    if (isErroredCell) {
      className += " errored";
    }

    return (
      <div
        role="button"
        className={className}
        onClick={this.onClick}
        onKeyDown={
          isSelected && !this.state.isInitiallyEmpty
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
