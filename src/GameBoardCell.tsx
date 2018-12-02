import * as React from "react";
import "./App.css";

interface Props {
  column: number;
  row: number;
  handleCellClick: (selectedCell: SelectedCell) => void;
  selectedCell: SelectedCell;
  value: number;
  handleDigitSelect: (value: number) => void;
  emptyCells: number[][];
  erroredCell: ErroredCell;
}

interface State {
  isInitiallyEmpty: boolean;
  isSelected: boolean;
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
      isInitiallyEmpty: false,
      isSelected: this.checkIfSelected()
    };

    this.onClick = this.onClick.bind(this);
    this.checkIfInitiallyEmpty = this.checkIfInitiallyEmpty.bind(this);
    this.onKeyUp = this.onKeyUp.bind(this);
    this.getClassName = this.getClassName.bind(this);
    this.checkIfSelected = this.checkIfSelected.bind(this);
  }

  public shouldComponentUpdate(prevProps: Props, prevState: State): boolean {
    if (
      this.props.value !== prevProps.value ||
      this.props.selectedCell !== prevProps.selectedCell ||
      this.state.isInitiallyEmpty !== prevState.isInitiallyEmpty ||
      this.props.erroredCell !== prevProps.erroredCell ||
      this.props.emptyCells !== prevProps.emptyCells ||
      this.state.isSelected !== prevState.isSelected
    ) {
      return true;
    }
    return false;
  }

  public componentDidUpdate(nextProps: Props): void {
    if (this.props.emptyCells !== nextProps.emptyCells) {
      this.checkIfInitiallyEmpty([this.props.row, this.props.column]);
    }
    if (this.props.selectedCell !== nextProps.selectedCell) {
      this.setState({ isSelected: this.checkIfSelected() });
    }
  }

  private checkIfSelected(): boolean {
    return (
      this.props.selectedCell.row === this.props.row &&
      this.props.selectedCell.column === this.props.column
    );
  }

  private onClick(): void {
    const selectedCell: SelectedCell = {
      column: this.props.column,
      row: this.props.row,
      value: this.props.value
    };
    this.props.handleCellClick(selectedCell);
  }

  private onKeyUp(event: any): void {
    const isNumber: boolean = isFinite(event.key);
    if (isNumber && this.state.isInitiallyEmpty) {
      const enteredNumber: number = Number(event.key);
      this.props.handleDigitSelect(enteredNumber);
    }
  }

  private checkIfInitiallyEmpty(cell: Array<number | undefined>): void {
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

  private getClassName(): string {
    const { selectedCell, erroredCell } = this.props;
    const sameCellValue: boolean = selectedCell.value === this.props.value;
    const isErroredCell =
      this.props.row === erroredCell.row &&
      this.props.column === erroredCell.column;

    let className: string = "GameBoard-Cell-Wrapper";

    if ((this.props.value && sameCellValue) || this.state.isSelected) {
      className += " selected-primary";
    }

    if (!this.state.isInitiallyEmpty) {
      className += " initially-filled";
    }

    if (isErroredCell) {
      className += " errored";
    }

    return className;
  }

  public render() {
    return (
      <div
        role="button"
        className={this.getClassName()}
        onClick={this.onClick}
        onKeyUp={
          this.state.isSelected && this.state.isInitiallyEmpty
            ? e => this.onKeyUp(e)
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
