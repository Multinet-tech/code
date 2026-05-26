import { useState } from 'react';
import { motion } from 'framer-motion';
import { Dices } from 'lucide-react';

const DiceRoller = () => {
  const [dice1, setDice1] = useState(1);
  const [dice2, setDice2] = useState(1);
  const [rolling, setRolling] = useState(false);
  const [history, setHistory] = useState([]);

  const rollDice = () => {
    setRolling(true);
    
    let count = 0;
    const rollInterval = setInterval(() => {
      setDice1(Math.floor(Math.random() * 6) + 1);
      setDice2(Math.floor(Math.random() * 6) + 1);
      count++;
      
      if (count > 10) {
        clearInterval(rollInterval);
        const final1 = Math.floor(Math.random() * 6) + 1;
        const final2 = Math.floor(Math.random() * 6) + 1;
        setDice1(final1);
        setDice2(final2);
        setHistory([{ dice1: final1, dice2: final2, total: final1 + final2 }, ...history.slice(0, 4)]);
        setRolling(false);
      }
    }, 100);
  };

  const getDiceDots = (value) => {
    const dotPositions = {
      1: [[50, 50]],
      2: [[25, 25], [75, 75]],
      3: [[25, 25], [50, 50], [75, 75]],
      4: [[25, 25], [75, 25], [25, 75], [75, 75]],
      5: [[25, 25], [75, 25], [50, 50], [25, 75], [75, 75]],
      6: [[25, 25], [75, 25], [25, 50], [75, 50], [25, 75], [75, 75]]
    };

    return dotPositions[value] || [];
  };

  const renderDice = (value) => (
    <div className="relative w-20 h-20 bg-surface border-2 border-accent-cyan rounded-xl"
      style={{ boxShadow: '0 0 20px rgba(5, 217, 232, 0.5)' }}>
      {getDiceDots(value).map((pos, idx) => (
        <div
          key={idx}
          className="absolute w-3 h-3 bg-accent-green rounded-full"
          style={{
            left: `${pos[0]}%`,
            top: `${pos[1]}%`,
            transform: 'translate(-50%, -50%)',
            boxShadow: '0 0 10px rgba(1, 255, 195, 0.8)'
          }}
        />
      ))}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6" data-testid="dice-roller-game">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-heading font-black text-accent-yellow uppercase mb-2">Dice Roller</h2>
        <p className="text-text-secondary text-sm">Roll the dice and test your luck!</p>
      </div>

      <div className="flex gap-6 mb-6">
        <motion.div
          animate={rolling ? { rotateX: 360, rotateY: 360 } : {}}
          transition={{ duration: 0.5, repeat: rolling ? Infinity : 0 }}
          data-testid="dice-1"
        >
          {renderDice(dice1)}
        </motion.div>
        <motion.div
          animate={rolling ? { rotateX: 360, rotateY: 360 } : {}}
          transition={{ duration: 0.5, repeat: rolling ? Infinity : 0 }}
          data-testid="dice-2"
        >
          {renderDice(dice2)}
        </motion.div>
      </div>

      <div className="text-center mb-6">
        <p className="text-text-secondary text-sm mb-1">Total</p>
        <p className="text-accent-cyan text-4xl font-bold" data-testid="dice-total">{dice1 + dice2}</p>
      </div>

      <motion.button
        onClick={rollDice}
        disabled={rolling}
        data-testid="dice-roll-btn"
        className="px-8 py-3 bg-accent-yellow text-background font-bold rounded-lg flex items-center gap-2 disabled:opacity-50"
        whileHover={!rolling ? { scale: 1.05, boxShadow: '0 0 20px rgba(242, 233, 78, 0.5)' } : {}}
        whileTap={!rolling ? { scale: 0.95 } : {}}
      >
        <Dices className="w-5 h-5" />
        {rolling ? 'Rolling...' : 'Roll Dice'}
      </motion.button>

      {history.length > 0 && (
        <div className="mt-8 w-full max-w-xs">
          <p className="text-text-secondary text-xs uppercase tracking-wider mb-3 text-center">History</p>
          <div className="space-y-2">
            {history.map((roll, idx) => (
              <div key={idx} className="flex justify-between items-center bg-surface/50 px-4 py-2 rounded border border-border-default">
                <span className="text-text-secondary text-sm">Roll {history.length - idx}</span>
                <span className="text-text-primary font-bold">{roll.dice1} + {roll.dice2} = {roll.total}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DiceRoller;