import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
  renderSquare(row,col) {
    return (
      <Square
        value={this.props.squares[row][col]}
        onClick={() => this.props.onClick(row,col)}
      />
    );
  }

  render() {
    //   const rows = 3;
    //   const cols = 3;
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
