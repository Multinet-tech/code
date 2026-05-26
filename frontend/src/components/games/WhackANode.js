import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

const WhackANode = () => {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [activeNodes, setActiveNodes] = useState([]);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const nodes = Array.from({ length: 9 }, (_, i) => i);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameOver(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const interval = setInterval(() => {
      const randomNode = Math.floor(Math.random() * 9);
      setActiveNodes([randomNode]);
      
      setTimeout(() => {
        setActiveNodes([]);
      }, 800);
    }, 1000);

    return () => clearInterval(interval);
  }, [gameStarted, gameOver]);

  const handleNodeClick = (nodeId) => {
    if (activeNodes.includes(nodeId)) {
      setScore(score + 1);
      setActiveNodes([]);
    }
  };

  const startGame = () => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setTimeLeft(30);
    setActiveNodes([]);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6" data-testid="whack-a-node-game">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-heading font-black text-accent-green uppercase mb-2">Whack-A-Node</h2>
        <div className="flex gap-6 justify-center text-sm">
          <p className="text-text-secondary">Score: <span className="text-accent-cyan font-bold">{score}</span></p>
          <p className="text-text-secondary">Time: <span className="text-accent-yellow font-bold">{timeLeft}s</span></p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {nodes.map((node) => {
          const isActive = activeNodes.includes(node);
          return (
            <motion.button
              key={node}
              data-testid={`whack-node-${node}`}
              onClick={() => handleNodeClick(node)}
              className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-2 transition-all ${
                isActive
                  ? 'bg-accent-green border-accent-green'
                  : 'bg-surface border-border-default'
              }`}
              style={{
                boxShadow: isActive ? '0 0 30px rgba(1, 255, 195, 0.8)' : 'none'
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              disabled={!gameStarted || gameOver}
            >
              {isActive && <Zap className="w-full h-full p-4 text-background" />}
            </motion.button>
          );
        })}
      </div>

      {gameOver && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center mb-4"
          data-testid="whack-game-over"
        >
          <p className="text-accent-pink text-xl font-bold">Game Over!</p>
          <p className="text-text-primary">Final Score: {score}</p>
        </motion.div>
      )}

      {!gameStarted || gameOver ? (
        <motion.button
          onClick={startGame}
          data-testid="whack-start-btn"
          className="px-6 py-2 bg-accent-green text-background font-bold rounded-lg"
          whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(1, 255, 195, 0.5)' }}
          whileTap={{ scale: 0.95 }}
        >
          {gameOver ? 'Play Again' : 'Start Game'}
        </motion.button>
      ) : null}
    </div>
  );
};

export default WhackANode;