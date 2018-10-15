import * as React from "react";
import "./App.css";

interface Props {
  cell: number;
  row: number;
  handleCellClick: (selectedCell: SelectedCell) => void;
  selectedCell: SelectedCell;
  highlightSelected: boolean;
  value: number;
  handleCellKeyDown: (value: number) => void;
}

interface SelectedCell {
  row?: number;
  cell?: number;
}

class GameBoardCell extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public onClick() {
    const selectedCell: SelectedCell = {
      cell: this.props.cell,
      row: this.props.row
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
    let className: string = "GameBoard-Cell-Wrapper";

    if (isSelected) {
      className += " selected-primary";
    } else if (
      this.props.highlightSelected &&
      (sameSelectedRow || sameSelectedCell)
    ) {
      className += " selected-secondary";
    }

    return (
      <div
        role="button"
        className={className}
        onClick={this.onClick}
        onKeyDown={
          isSelected
            ? e => {
                this.onKeyDown(e);
              }
            : undefined
        }
        tabIndex={0}
      >
        <div className="GameBoard-Cell">
          {/* {this.props.value !== 0 && (
            <input
              type="text"
              value={this.props.value}
              style={{
                border: "none",
                borderBottom: "1px solid #bbb",
                borderRight: "1px solid #bbb",
                height: "100%",
                margin: 0,
                padding: 0,
                width: "100%",
              }}
            />
          )} */}
          {this.props.value !== 0 && <span>{this.props.value}</span>}
        </div>
      </div>
    );
  }
}

export default GameBoardCell;
