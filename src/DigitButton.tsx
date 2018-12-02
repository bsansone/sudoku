import * as React from "react";
import "./App.css";

interface Props {
  value: number;
  onClick: (value: number) => void;
}

class DigitButton extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);

    this.onClick = this.onClick.bind(this);
  }

  public onClick() {
    this.props.onClick(this.props.value);
  }

  public render() {
    return (
      <div
        role="button"
        className="GameBoard-Controls-Digit-Wrapper"
        onClick={this.onClick}
      >
        <div className="GameBoard-Controls-Digit">
          <span>{this.props.value}</span>
        </div>
      </div>
    );
  }
}

export default DigitButton;
