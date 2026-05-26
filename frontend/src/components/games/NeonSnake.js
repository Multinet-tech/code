import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, RotateCcw } from 'lucide-react';

const GRID_SIZE = 15;
const CELL_SIZE = 20;
const INITIAL_SNAKE = [{ x: 7, y: 7 }];
const INITIAL_DIRECTION = { x: 1, y: 0 };

const NeonSnake = () => {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [food, setFood] = useState({ x: 10, y: 10 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);

  const generateFood = useCallback(() => {
    const newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE)
    };
    setFood(newFood);
  }, []);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setGameOver(false);
    setScore(0);
    setGameStarted(false);
    generateFood();
  };

  const startGame = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!gameStarted || gameOver) return;
      
      switch (e.key) {
        case 'ArrowUp':
          if (direction.y === 0) setDirection({ x: 0, y: -1 });
          break;
        case 'ArrowDown':
          if (direction.y === 0) setDirection({ x: 0, y: 1 });
          break;
        case 'ArrowLeft':
          if (direction.x === 0) setDirection({ x: -1, y: 0 });
          break;
        case 'ArrowRight':
          if (direction.x === 0) setDirection({ x: 1, y: 0 });
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [direction, gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const moveSnake = () => {
      setSnake((prevSnake) => {
        const head = prevSnake[0];
        const newHead = {
          x: head.x + direction.x,
          y: head.y + direction.y
        };

        // Check wall collision
        if (newHead.x < 0 || newHead.x >= GRID_SIZE || newHead.y < 0 || newHead.y >= GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Check self collision
        if (prevSnake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [newHead, ...prevSnake];

        // Check food collision
        if (newHead.x === food.x && newHead.y === food.y) {
          setScore((s) => s + 10);
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    };

    const interval = setInterval(moveSnake, 150);
    return () => clearInterval(interval);
  }, [direction, food, gameStarted, gameOver, generateFood]);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6" data-testid="neon-snake-game">
      <div className="text-center mb-4">
        <h2 className="text-3xl font-heading font-black text-accent-pink uppercase mb-2">Neon Snake</h2>
        <p className="text-text-secondary text-sm">Score: <span className="text-accent-green font-bold">{score}</span></p>
      </div>

      <div 
        className="relative border-2 border-accent-cyan rounded-lg mb-4"
        style={{ 
          width: GRID_SIZE * CELL_SIZE, 
          height: GRID_SIZE * CELL_SIZE,
          background: 'rgba(11, 12, 16, 0.8)',
          boxShadow: '0 0 20px rgba(5, 217, 232, 0.3)'
        }}
      >
        {/* Food */}
        <div
          className="absolute rounded-full bg-accent-yellow"
          style={{
            width: CELL_SIZE - 4,
            height: CELL_SIZE - 4,
            left: food.x * CELL_SIZE + 2,
            top: food.y * CELL_SIZE + 2,
            boxShadow: '0 0 10px rgba(242, 233, 78, 0.8)'
          }}
        />

        {/* Snake */}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="absolute rounded-sm"
            style={{
              width: CELL_SIZE - 4,
              height: CELL_SIZE - 4,
              left: segment.x * CELL_SIZE + 2,
              top: segment.y * CELL_SIZE + 2,
              background: index === 0 ? '#01FFC3' : '#05D9E8',
              boxShadow: index === 0 ? '0 0 10px rgba(1, 255, 195, 0.8)' : '0 0 5px rgba(5, 217, 232, 0.5)'
            }}
          />
        ))}

        {/* Game Over Overlay */}
        {gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center" data-testid="snake-game-over">
            <div className="text-center">
              <p className="text-accent-pink text-2xl font-bold mb-2">Game Over!</p>
              <p className="text-text-primary">Final Score: {score}</p>
            </div>
          </div>
        )}

        {/* Start Overlay */}
        {!gameStarted && !gameOver && (
          <div className="absolute inset-0 bg-black/80 flex items-center justify-center">
            <div className="text-center">
              <p className="text-text-secondary mb-3 text-sm">Use arrow keys to move</p>
            </div>
          </div>
        )}
      </div>

      <div className="flex gap-3">
        {!gameStarted && !gameOver && (
          <motion.button
            onClick={startGame}
            data-testid="snake-start-btn"
            className="px-6 py-2 bg-accent-green text-background font-bold rounded-lg flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(1, 255, 195, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <Play className="w-4 h-4" />
            Start
          </motion.button>
        )}
        {(gameOver || gameStarted) && (
          <motion.button
            onClick={resetGame}
            data-testid="snake-restart-btn"
            className="px-6 py-2 bg-accent-cyan text-background font-bold rounded-lg flex items-center gap-2"
            whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(5, 217, 232, 0.5)' }}
            whileTap={{ scale: 0.95 }}
          >
            <RotateCcw className="w-4 h-4" />
            Restart
          </motion.button>
        )}
      </div>
    </div>
  );
};

export default NeonSnake;