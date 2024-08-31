import React, { useState, useEffect } from 'react';
import './guess.css';

const GuessTheNumber = () => {
  const [minRange, setMinRange] = useState(1);
  const [maxRange, setMaxRange] = useState(100);
  const [targetNumber, setTargetNumber] = useState(null);
  const [guess, setGuess] = useState('');
  const [message, setMessage] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  useEffect(() => {
    generateNewNumber();
  }, [minRange, maxRange]);

  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setGameOver(true);
      setMessage(`Time's up! The number was ${targetNumber}.`);
    }
    return () => clearInterval(timer);
  }, [timerActive, timeLeft, targetNumber]);

  const generateNewNumber = () => {
    const newTarget = Math.floor(Math.random() * (maxRange - minRange + 1)) + minRange;
    setTargetNumber(newTarget);
    setGuess('');
    setMessage('');
    setAttempts(0);
    setGameOver(false);
    setTimeLeft(60);
    setTimerActive(false);
  };

  const handleGuess = () => {
    if (!timerActive) {
      setTimerActive(true);
    }
    const userGuess = parseInt(guess);
    if (isNaN(userGuess)) {
      setMessage('Please enter a valid number.');
      return;
    }

    setAttempts(attempts + 1);

    if (userGuess === targetNumber) {
      setMessage(`Congratulations! You guessed the number in ${attempts + 1} attempts.`);
      setGameOver(true);
      setTimerActive(false);
    } else if (userGuess < targetNumber) {
      setMessage('Too low! Try a higher number.');
    } else {
      setMessage('Too high! Try a lower number.');
    }
  };

  const handleInputChange = (e) => {
    setGuess(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !gameOver) {
      handleGuess();
    }
  };

  const setGameOption = (min, max) => {
    setMinRange(min);
    setMaxRange(max);
    generateNewNumber();
  };

  return (
    <div className="guess-game">
      <h1>Guess the Number</h1>
      <p>I'm thinking of a number between {minRange} and {maxRange}.</p>
      <p>Time left: {timeLeft} seconds</p>
      <input
        type="number"
        value={guess}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        disabled={gameOver}
        placeholder="Enter your guess"
      />
      <div className="button-container" style={{ flexDirection: 'row' }}>
        <button onClick={handleGuess} disabled={gameOver}>
          Guess
        </button>
        <button onClick={generateNewNumber}>New Game</button>
      </div>
      <p>{message}</p>
      <p>Attempts: {attempts}</p>
      <div className="game-options">
        <button className="option-button" onClick={() => setGameOption(1, 100)}>1-100</button>
        <button className="option-button" onClick={() => setGameOption(1, 1000)}>1-1000</button>
        <button className="option-button" onClick={() => setGameOption(1, 10000)}>1-10000</button>
      </div>
    </div>
  );
};

export default GuessTheNumber;
