import React, { useState } from 'react';
import './tic.css';

const TicTacToe = () => {
  const [boardSize, setBoardSize] = useState(3);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handleClick = (i) => {
    const newBoard = [...board];
    if (calculateWinner(newBoard, boardSize) || newBoard[i]) return;
    newBoard[i] = xIsNext ? 'X' : 'O';
    setBoard(newBoard);
    setXIsNext(!xIsNext);
  };

  const renderSquare = (i) => {
    return (
      <button className="square" onClick={() => handleClick(i)}>
        {board[i]}
      </button>
    );
  };

  const restartGame = () => {
    setBoard(Array(boardSize * boardSize).fill(null));
    setXIsNext(true);
  };

  const changeBoardSize = (size) => {
    setBoardSize(size);
    setBoard(Array(size * size).fill(null));
    setXIsNext(true);
  };

  const winner = calculateWinner(board, boardSize);
  let status;
  if (winner) {
    status = `Congratulations, user ${winner} is win`;
  } else if (board.every(Boolean)) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? 'X' : 'O'}`;
  }

  const renderBoard = () => {
    const rows = [];
    for (let i = 0; i < boardSize; i++) {
      const cells = [];
      for (let j = 0; j < boardSize; j++) {
        cells.push(renderSquare(i * boardSize + j));
      }
      rows.push(<div key={i} className="board-row">{cells}</div>);
    }
    return rows;
  };

  return (
    <div className="game">
      <h1 className="game-title">Tic Tac Toe</h1>
      <div className="game-board">
        {renderBoard()}
      </div>
      <div className="game-info">{status}</div>
      <button className="restart-button" onClick={restartGame}>Restart Game</button>
      <div className="board-size-buttons">
        <button onClick={() => changeBoardSize(3)}>3x3</button>
        <button onClick={() => changeBoardSize(4)}>4x4</button>
        <button onClick={() => changeBoardSize(8)}>8x8</button>
        <button onClick={() => changeBoardSize(16)}>16x16</button>
      </div>
    </div>
  );
};

const calculateWinner = (squares, size) => {
  const winLength = 3; // Always check for 3 in a row

  // Check rows
  for (let i = 0; i < size; i++) {
    for (let j = 0; j <= size - winLength; j++) {
      const row = Array.from({ length: winLength }, (_, k) => i * size + j + k);
      if (checkLine(squares, row)) return squares[row[0]];
    }
  }

  // Check columns
  for (let i = 0; i <= size - winLength; i++) {
    for (let j = 0; j < size; j++) {
      const col = Array.from({ length: winLength }, (_, k) => (i + k) * size + j);
      if (checkLine(squares, col)) return squares[col[0]];
    }
  }

  // Check diagonals
  for (let i = 0; i <= size - winLength; i++) {
    for (let j = 0; j <= size - winLength; j++) {
      const diag1 = Array.from({ length: winLength }, (_, k) => (i + k) * size + j + k);
      const diag2 = Array.from({ length: winLength }, (_, k) => (i + k) * size + (j + winLength - 1 - k));
      if (checkLine(squares, diag1)) return squares[diag1[0]];
      if (checkLine(squares, diag2)) return squares[diag2[0]];
    }
  }

  return null;
};

const checkLine = (squares, line) => {
  const firstSquare = squares[line[0]];
  return firstSquare && line.every(index => squares[index] === firstSquare);
};

export default TicTacToe;
