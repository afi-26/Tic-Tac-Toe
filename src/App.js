import React, { useState } from 'react';
import './App.css';
import TicTacToe from './components/tic';
import GuessTheNumber from './components/guess';
import Navbar from './components/nav';
import Footer from './components/footer';
import Character from './components/dino';

function App() {
  const [currentGame, setCurrentGame] = useState('tic');

  const showTicTacToe = () => {
    setCurrentGame('tic');
  };

  const showGuessTheNumber = () => {
    setCurrentGame('guess');
  };

  const showDino = () => {
    setCurrentGame('dino');
  };

  return (
    <div className="App">
      <Navbar 
        onGuessClick={showGuessTheNumber} 
        onTicTacToeClick={showTicTacToe} 
        onDinoClick={showDino}
      />
      {currentGame !== 'dino' && (
        <header className="App-header">
          {currentGame === 'tic' && <TicTacToe />}
          {currentGame === 'guess' && <GuessTheNumber />}
        </header>
      )}
      {currentGame === 'dino' && (
        <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
          <Character />
        </div>
      )}
      <Footer />
    </div>
  );
}

export default App;
