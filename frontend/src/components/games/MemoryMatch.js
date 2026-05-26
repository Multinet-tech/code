import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';

const emojis = ['🎮', '🎯', '🎪', '🎨', '🎭', '🎬', '🎸', '🎹'];

const MemoryMatch = () => {
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);

  useEffect(() => {
    initGame();
  }, []);

  const initGame = () => {
    const shuffled = [...emojis, ...emojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, idx) => ({ id: idx, emoji, matched: false }));
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setGameWon(false);
  };

  const handleCardClick = (id) => {
    if (flipped.length === 2 || flipped.includes(id) || matched.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(moves + 1);
      const [first, second] = newFlipped;
      if (cards[first].emoji === cards[second].emoji) {
        const newMatched = [...matched, first, second];
        setMatched(newMatched);
        setFlipped([]);
        if (newMatched.length === cards.length) {
          setGameWon(true);
        }
      } else {
        setTimeout(() => setFlipped([]), 800);
      }
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6" data-testid="memory-match-game">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-heading font-black text-accent-cyan uppercase mb-2">Memory Match</h2>
        <p className="text-text-secondary text-sm">Moves: <span className="text-accent-green font-bold">{moves}</span></p>
      </div>

      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card) => {
          const isFlipped = flipped.includes(card.id) || matched.includes(card.id);
          return (
            <motion.button
              key={card.id}
              data-testid={`memory-card-${card.id}`}
              onClick={() => handleCardClick(card.id)}
              className="w-16 h-16 sm:w-20 sm:h-20 relative"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className={`w-full h-full transition-all duration-300 transform ${
                isFlipped ? 'rotate-y-180' : ''
              }`}>
                <div className="absolute inset-0 rounded-lg border border-border-default bg-surface flex items-center justify-center text-3xl"
                  style={{
                    backfaceVisibility: 'hidden',
                    transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                    boxShadow: isFlipped ? '0 0 20px rgba(5, 217, 232, 0.5)' : 'none'
                  }}>
                  {isFlipped ? card.emoji : '?'}
                </div>
              </div>
            </motion.button>
          );
        })}
      </div>

      {gameWon && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="text-center"
          data-testid="memory-win-message"
        >
          <Trophy className="w-12 h-12 mx-auto mb-2 text-accent-yellow" />
          <p className="text-accent-green font-bold text-xl">You Won in {moves} moves!</p>
        </motion.div>
      )}

      <motion.button
        onClick={initGame}
        data-testid="memory-restart-btn"
        className="mt-4 px-6 py-2 bg-accent-cyan text-background font-bold rounded-lg hover:bg-accent-green"
        whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(1, 255, 195, 0.5)' }}
        whileTap={{ scale: 0.95 }}
      >
        {gameWon ? 'Play Again' : 'Restart'}
      </motion.button>
    </div>
  );
};

export default MemoryMatch;