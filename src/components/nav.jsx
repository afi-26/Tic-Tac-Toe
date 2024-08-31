import React from 'react';
import './nav.css';

const Navbar = ({ onGuessClick, onTicTacToeClick, onDinoClick }) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">Game Center</h1>
        <ul className="nav-menu">
          <li className="nav-item">
            <a href="#" onClick={onGuessClick} className="nav-link">Guess Number</a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={onTicTacToeClick} className="nav-link">Tic Tac Toe</a>
          </li>
          <li className="nav-item">
            <a href="#" onClick={onDinoClick} className="nav-link">Dino</a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
