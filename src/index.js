import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from '../src/reportWebVitals';
import './index.css';

const Square = ({value, onClickEvent}) => {
  return (
    <button 
      className="square"
      onClick={onClickEvent}>
      {value}
    </button>
  )
}

const Board = () => {
  const initialSquares = Array(9).fill(null);
  const [squares, setSquares] = useState(initialSquares);
  const [xIsNext, setXIsNext] = useState(true);

  const handleClickEvent = (i) => {
    const winner = winnerIs(squares);
    
    if (winner || squares[i])
      return;

    const newSquares = [...squares];
    newSquares[i] = xIsNext ? "X" : "O";
    setXIsNext(!xIsNext);
    setSquares(newSquares);
  }

  const renderSquare = (i) => {
    return (
      <Square 
        value={squares[i]}
        onClickEvent={() => handleClickEvent(i)} />
    );
  }

  const winner = winnerIs(squares);
  const status = winner 
    ? `Winner is: ${winner}`
    : `Next player: ${xIsNext ? "X" : "O"}`;

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}{renderSquare(1)}{renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}{renderSquare(4)}{renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}{renderSquare(7)}{renderSquare(8)}
      </div>
    </div>
  )
}

const Game = () => {
  return (
    <div className="game">
      Tic-Tac-Toe
      <Board />
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Game />
)
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

function winnerIs(squares) {
  const winnerLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], //rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], //columns
    [0, 4, 8], [2, 4, 6]             //diagonals
  ];

  for (let line of winnerLines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 'X' or 'O'
    }
  }
  return null;
}
