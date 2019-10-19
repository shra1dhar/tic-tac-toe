import React, { Component } from "react";
import ReactDOM from "react-dom";
import update from "immutability-helper";

import "./index.css";
import Board from "./components/Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          row: null,
          col: null,
          squares: Array(3).fill(Array(3).fill(null))
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }
  handleClick(row, col) {
    let history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares;
    if (calculateWinner(squares) || squares[row][col]) {
      return;
    }
    this.setState({
      history: history.concat([
        {
          row: row,
          col: col,
          squares: update(squares, {
            [row]: { [col]: { $set: this.state.xIsNext ? "X" : "O" } }
          })
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }
  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const squares = current.squares;

    const winner = calculateWinner(squares);

    const moves = history.map((objValue, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next Player: " + (this.state.xIsNext ? "X" : "O");
    }
    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={squares}
            onClick={(row, col) => this.handleClick(row, col)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}
ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [2, 2], [2, 0]]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      squares[a[0]][a[1]] &&
      squares[a[0]][a[1]] === squares[b[0]][b[1]] &&
      squares[a[0]][a[1]] === squares[c[0]][c[1]]
    ) {
      return squares[a[0]][a[1]];
    }
  }

  return null;
}
