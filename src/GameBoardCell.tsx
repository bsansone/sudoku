import * as React from "react";
import "./App.css";

interface Props {
  cell: string;
  row: string;
  handleCellClick: (selectedCell: SelectedCell) => void;
  selectedCell: SelectedCell;
}

interface SelectedCell {
  row?: string;
  cell?: string;
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

  public render() {
    const sameSelectedRow = this.props.selectedCell.row === this.props.row;
    const sameSelectedCell = this.props.selectedCell.cell === this.props.cell;
    const isSelected = sameSelectedRow && sameSelectedCell;
    let className = "GameBoard-Cell-Wrapper";

    if (isSelected) {
      className += " selected-primary";
    } else if (sameSelectedRow || sameSelectedCell) {
      className += " selected-secondary";
    }

    return (
      <div role="button" className={className} onClick={this.onClick}>
        <div className="GameBoard-Cell">
          <span>{this.props.cell}</span>
        </div>
      </div>
    );
  }
}

export default GameBoardCell;
