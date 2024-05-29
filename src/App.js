import { useState } from "react";
import "./App.css";

export default function App() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  function handlePlay(arr)
  {
    setHistory([...history,arr]);
    setXIsNext(!xIsNext);
  }
  function jumpTo({move}){
    currentSquares=history[move];
  }
  const Moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div>
      <Board arr={currentSquares} xIsNext={xIsNext} setXIsNext={setXIsNext} onPlay={handlePlay}/>
    <ol>
      <Moves/>
      </ol>
    </div>
  );
}


function Board({ arr,xIsNext ,onPlay}) {
  const winner = checkWinner();
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }
  function checkWinner()
     {
      for(let i=0;i<win.length;i++){
      if (
        arr[win[i][0]] === arr[win[i][1]] &&
        arr[win[i][0]] === arr[win[i][2]]
      ) {
        return arr[win[i][0]];
        // console.log(arr[win[i][0]]);
      }
    }

  }
  function handleclick(i) {
    let newarr = arr.slice();
    if (arr[i] || checkWinner()) return;
    if (xIsNext) {
      newarr[i] = "X";
      // setXIsNext(false);
    } else {
      newarr[i] = "O";
      // setXIsNext(true);
    }
    onPlay(newarr);
    // checkWinner();
  }
  
  return (
    <div>
      <p> {status}</p>
      <div>
        <Square
          value={arr[0]}
          onsquareclick={() => {
            handleclick(0);
          }}
        />
        <Square
          value={arr[1]}
          onsquareclick={() => {
            handleclick(1);
          }}
        />
        <Square
          value={arr[2]}
          onsquareclick={() => {
            handleclick(2);
          }}
        />
      </div>
      <div>
        <Square
          value={arr[3]}
          onsquareclick={() => {
            handleclick(3);
          }}
        />
        <Square
          value={arr[4]}
          onsquareclick={() => {
            handleclick(4);
          }}
        />
        <Square
          value={arr[5]}
          onsquareclick={() => {
            handleclick(5);
          }}
        />
      </div>
      <div>
        <Square
          value={arr[6]}
          onsquareclick={() => {
            handleclick(6);
          }}
        />
        <Square
          value={arr[7]}
          onsquareclick={() => {
            handleclick(7);
          }}
        />
        <Square
          value={arr[8]}
          onsquareclick={() => {
            handleclick(8);
          }}
        />
      </div>
    </div>
  );
}
function Square({ value, onsquareclick }) {
  return (
    <button
      className="square"
      onClick={() => {
        onsquareclick();
      }}
    >
      {value}
    </button>
  );
}
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
