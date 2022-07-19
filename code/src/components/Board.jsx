import { useState } from 'react';
import '../index.css';
import { Square } from './Square';
import { winnerIs } from './utils';

export const Board = () => {
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

