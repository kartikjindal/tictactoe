import { useState } from "react";
import "./App.css";

export default function App() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const currentSquares = history[currentMove];
  const xIsNext = currentMove % 2 === 0;

  function handlePlay(arr) {
    const nextHistory = [...history.slice(0, currentMove + 1), arr];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(move) {
    setCurrentMove(move);
  }

  const moves = history.map((squares, move) => {
    const description = move > 0 ? `Go to move #${move}` : 'Go to game start';
    return (
      <li key={move}>
        <button className="moves-button" onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <>
      <div className="header">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="wrapper">
        <div className="sidebar">
          <ol className="moves-list">{moves}</ol>
        </div>
        <div className="space">
          
        </div>
        <div className="app">
          <Board arr={currentSquares} xIsNext={xIsNext} onPlay={handlePlay} />
        </div>
      </div>
    </>
  );
}

function Board({ arr, xIsNext, onPlay }) {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  function checkWinner() {
    for (let i = 0; i < winPatterns.length; i++) {
      const [a, b, c] = winPatterns[i];
      if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
        return arr[a];
      }
    }
    return null;
  }

  const winner = checkWinner();
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`;

  function handleClick(i) {
    if (arr[i] || winner) return;
    const newarr = arr.slice();
    newarr[i] = xIsNext ? "X" : "O";
    onPlay(newarr);
  }

  return (
    <div className="board-container">
      <p className="top_message">{status}</p>
      <div className="board">
        {[0, 1, 2].map((row) => (
          <div key={row} className="row">
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              return (
                <Square
                  key={index}
                  value={arr[index]}
                  onSquareClick={() => handleClick(index)}
                />
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}
