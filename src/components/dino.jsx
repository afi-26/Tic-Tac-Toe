import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';

const Character = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);
  const [character, setCharacter] = useState('dino');
  const [obstacles, setObstacles] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);

  const { y } = useSpring({ 
    y: position.y, 
    config: { tension: 280, friction: 60 } 
  });

  const handleKeyDown = (event) => {
    if (gameOver) return;

    if (event.key === ' ' && !isJumping) {
      setIsJumping(true);
      setPosition(prev => ({ ...prev, y: -100 }));
      setTimeout(() => {
        setPosition(prev => ({ ...prev, y: 0 }));
        setIsJumping(false);
      }, 500);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isJumping, gameOver]);

  useEffect(() => {
    const obstacleInterval = setInterval(() => {
      if (!gameOver) {
        setObstacles(prev => [...prev, { x: 800, y: 0 }]);
        setScore(prev => prev + 1);
      }
    }, 2000);

    return () => clearInterval(obstacleInterval);
  }, [gameOver]);

  useEffect(() => {
    const gameLoop = setInterval(() => {
      setObstacles(prev => prev.map(obstacle => ({ ...obstacle, x: obstacle.x - 5 }))
        .filter(obstacle => obstacle.x > -50));

      const collision = obstacles.some(obstacle => 
        Math.abs(obstacle.x) < 30 && Math.abs(obstacle.y - position.y) < 30
      );

      if (collision) {
        setGameOver(true);
      }
    }, 50);

    return () => clearInterval(gameLoop);
  }, [obstacles, position]);

  const characterStyle = {
    position: 'absolute',
    width: '50px',
    height: '50px',
    left: '50px',
    bottom: '0px',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    transform: y.interpolate((y) => `translateY(${y}px)`),
  };

  const getCharacterShape = () => {
    switch (character) {
      case 'dino':
        return (
          <svg width="50" height="50" viewBox="0 0 50 50">
            <rect x="10" y="20" width="30" height="30" fill="green" />
            <rect x="40" y="30" width="10" height="10" fill="green" />
            <circle cx="15" cy="25" r="2" fill="black" />
          </svg>
        );
      case 'bird':
        return (
          <svg width="50" height="50" viewBox="0 0 50 50">
            <ellipse cx="25" cy="25" rx="20" ry="15" fill="blue" />
            <polygon points="45,25 55,20 55,30" fill="yellow" />
            <circle cx="20" cy="20" r="2" fill="black" />
          </svg>
        );
      case 'cat':
        return (
          <svg width="50" height="50" viewBox="0 0 50 50">
            <circle cx="25" cy="25" r="20" fill="orange" />
            <polygon points="5,25 15,5 25,25" fill="orange" />
            <polygon points="45,25 35,5 25,25" fill="orange" />
            <circle cx="20" cy="20" r="2" fill="black" />
            <circle cx="30" cy="20" r="2" fill="black" />
            <polygon points="25,25 20,30 30,30" fill="pink" />
          </svg>
        );
      default:
        return null;
    }
  };

  const restartGame = () => {
    setPosition({ x: 0, y: 0 });
    setIsJumping(false);
    setObstacles([]);
    setGameOver(false);
    setScore(0);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ position: 'relative', width: '800px', height: '400px', border: '1px solid black' }}>
        <animated.div 
          style={{
            ...characterStyle,
          }}
        >
          {getCharacterShape()}
        </animated.div>
        {obstacles.map((obstacle, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              left: obstacle.x,
              bottom: obstacle.y,
              width: '20px',
              height: '40px',
              backgroundColor: 'red',
            }}
          />
        ))}
        <div style={{ position: 'absolute', top: '10px', left: '10px' }}>Score: {score}</div>
        {gameOver && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            Game Over! Your score: {score}
          </div>
        )}
      </div>
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setCharacter('dino')}>Dino</button>
        <button onClick={() => setCharacter('bird')}>Bird</button>
        <button onClick={() => setCharacter('cat')}>Cat</button>
        <button onClick={restartGame}>Restart</button>
      </div>
    </div>
  );
};

export default Character;
