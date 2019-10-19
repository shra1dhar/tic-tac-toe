import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
  renderSquare(row, col) {
    const line = this.props.line ? this.props.line : [];
    let square = (
      <Square
        value={this.props.squares[row][col]}
        onClick={() => this.props.onClick(row, col)}
        bgcolor={false}
      />
    );
    for (let i = 0; i < line.length; i++) {
      if (row === this.props.line[i][0] && col === this.props.line[i][1]) {
        square = (
          <Square
            value={this.props.squares[row][col]}
            onClick={() => this.props.onClick(row, col)}
            bgcolor={true}
          />
        );
      }
    }
    return square;
  }

  render() {
    const rows = [0, 1, 2];
    const cols = [0, 1, 2];
    const squares = rows.map(row => {
      return (
        <div className="board-row">
          {cols.map(col => {
            return this.renderSquare(row, col);
          })}
        </div>
      );
    });
    return <div>{squares}</div>;
  }
}

export default Board;
