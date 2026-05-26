import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { Cloud, Gamepad2, Puzzle, Zap, Dices } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import MemoryMatch from '@/components/games/MemoryMatch';
import NeonSnake from '@/components/games/NeonSnake';
import WhackANode from '@/components/games/WhackANode';
import DiceRoller from '@/components/games/DiceRoller';
import '@/App.css';

function App() {
  const [multiDriveOpen, setMultiDriveOpen] = useState(false);
  const [activeGame, setActiveGame] = useState(null);
  const [redirecting, setRedirecting] = useState(false);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const handleMultiDriveClick = () => {
    setMultiDriveOpen(true);
  };

  const handleRedirect = () => {
    setRedirecting(true);
    setTimeout(() => {
      window.open('https://cloud.multifocus.com', '_blank');
      setRedirecting(false);
      setMultiDriveOpen(false);
    }, 1500);
  };

  const particlesConfig = {
    fullScreen: {
      enable: true,
      zIndex: 0
    },
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800
        }
      },
      color: {
        value: ['#05D9E8', '#FF2A6D', '#01FFC3']
      },
      shape: {
        type: 'circle'
      },
      opacity: {
        value: 0.5,
        random: true,
        anim: {
          enable: true,
          speed: 1,
          opacity_min: 0.1,
          sync: false
        }
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: true,
          speed: 2,
          size_min: 0.1,
          sync: false
        }
      },
      links: {
        enable: true,
        distance: 150,
        color: '#05D9E8',
        opacity: 0.3,
        width: 1
      },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'bounce',
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200
        }
      }
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: {
          enable: true,
          mode: 'repulse'
        },
        onclick: {
          enable: true,
          mode: 'push'
        },
        resize: true
      },
      modes: {
        repulse: {
          distance: 100,
          duration: 0.4
        },
        push: {
          particles_nb: 4
        }
      }
    },
    retina_detect: true,
    background: {
      color: '#05050A'
    }
  };

  const gameCards = [
    {
      id: 'memory',
      title: 'Memory Match',
      description: 'Test your memory',
      icon: Puzzle,
      color: 'accent-cyan',
      image: 'https://static.prod-images.emergentagent.com/jobs/e0594913-dd3e-46c5-b22b-974ab9719c81/images/be18ff78df4fda015dbe5866f1293b5b89464d4a2afee198d9f3f26fd4f3949f.png',
      component: MemoryMatch,
      testId: 'memory-match-card'
    },
    {
      id: 'snake',
      title: 'Neon Snake',
      description: 'Classic arcade action',
      icon: Gamepad2,
      color: 'accent-pink',
      image: 'https://static.prod-images.emergentagent.com/jobs/e0594913-dd3e-46c5-b22b-974ab9719c81/images/e62b380448ebc755137fbed1257320850d77ca4cfffc4110f4986400a23cb54c.png',
      component: NeonSnake,
      testId: 'neon-snake-card'
    },
    {
      id: 'whack',
      title: 'Whack-A-Node',
      description: 'Quick reflexes needed',
      icon: Zap,
      color: 'accent-green',
      image: 'https://static.prod-images.emergentagent.com/jobs/e0594913-dd3e-46c5-b22b-974ab9719c81/images/2e6a1399303b5cad6a44102bbdd3b797eda8f7cbf164dc5c4727fc0070007631.png',
      component: WhackANode,
      testId: 'whack-a-node-card'
    },
    {
      id: 'dice',
      title: 'Dice Roller',
      description: 'Test your luck',
      icon: Dices,
      color: 'accent-yellow',
      image: 'https://static.prod-images.emergentagent.com/jobs/e0594913-dd3e-46c5-b22b-974ab9719c81/images/660ccfde54cad825d3cc2659c977f26109f32311a2397bd95a9092071889dfad.png',
      component: DiceRoller,
      testId: 'dice-roller-card'
    }
  ];

  return (
    <div className="App relative min-h-screen">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={particlesConfig}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-24">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black tracking-tighter uppercase mb-4"
            style={{
              background: 'linear-gradient(135deg, #05D9E8 0%, #01FFC3 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}>
            Futuristic Hub
          </h1>
          <p className="text-text-secondary text-sm sm:text-base max-w-2xl mx-auto">
            Your digital playground for cloud access and interactive entertainment
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-8 lg:grid-cols-12 gap-6 md:gap-8">
          {/* MultiDrive Hero Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="col-span-1 md:col-span-8 lg:col-span-8 row-span-2"
          >
            <div
              onClick={handleMultiDriveClick}
              data-testid="multidrive-trigger"
              className="relative h-full min-h-[300px] md:min-h-[400px] bg-surface border border-border-default rounded-xl overflow-hidden cursor-pointer group"
              style={{
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(5, 217, 232, 0.8)';
                e.currentTarget.style.boxShadow = '0 0 30px rgba(5, 217, 232, 0.4)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Background Image */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'url(https://static.prod-images.emergentagent.com/jobs/e0594913-dd3e-46c5-b22b-974ab9719c81/images/5d75fc0634717bde02dd1d6fd068d3e1b72c6676ec8dab5615941f4fd7cdf4e0.png)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mixBlendMode: 'screen'
                }}
              />

              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-between p-8">
                <div>
                  <div className="inline-block mb-4 px-3 py-1 bg-accent-cyan/20 border border-accent-cyan rounded-full">
                    <p className="text-xs font-bold tracking-widest uppercase text-accent-cyan">Cloud Access</p>
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-heading font-black uppercase mb-4 text-text-primary">
                    MultiDrive
                  </h2>
                  <p className="text-text-secondary text-base max-w-lg mb-6">
                    Access your secure cloud storage with enterprise-grade encryption and seamless file management.
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <motion.div
                    className="flex items-center gap-3 px-6 py-3 bg-accent-cyan rounded-lg"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Cloud className="w-6 h-6 text-background" />
                    <span className="text-background font-bold">Launch Drive</span>
                  </motion.div>
                  <div className="text-text-secondary text-xs flex items-center gap-2">
                    <div className="w-2 h-2 bg-accent-green rounded-full animate-pulse" />
                    Powered by MultiNet
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Game Cards */}
          {gameCards.map((game, index) => {
            const Icon = game.icon;
            return (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 + index * 0.1 }}
                className="col-span-1 md:col-span-4 lg:col-span-6 row-span-1"
              >
                <div
                  onClick={() => setActiveGame(game)}
                  data-testid={game.testId}
                  className="relative h-full min-h-[250px] bg-surface border border-border-default rounded-xl overflow-hidden cursor-pointer group"
                  style={{
                    transition: 'all 0.3s ease'
                  }}
                  onMouseEnter={(e) => {
                    const colors = {
                      'accent-cyan': 'rgba(5, 217, 232, 0.8)',
                      'accent-pink': 'rgba(255, 42, 109, 0.8)',
                      'accent-green': 'rgba(1, 255, 195, 0.8)',
                      'accent-yellow': 'rgba(242, 233, 78, 0.8)'
                    };
                    e.currentTarget.style.borderColor = colors[game.color];
                    e.currentTarget.style.boxShadow = `0 0 30px ${colors[game.color].replace('0.8', '0.4')}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {/* Background Image */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage: `url(${game.image})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      mixBlendMode: 'overlay'
                    }}
                  />

                  {/* Content */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-6">
                    <div>
                      <Icon className={`w-12 h-12 mb-4 text-${game.color}`} />
                      <h3 className="text-2xl font-heading font-bold uppercase mb-2 text-text-primary">
                        {game.title}
                      </h3>
                      <p className="text-text-secondary text-sm">{game.description}</p>
                    </div>

                    <motion.div
                      className={`inline-flex items-center gap-2 text-${game.color} text-sm font-bold`}
                      whileHover={{ x: 5 }}
                    >
                      Play Now <span className="text-xl">→</span>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* MultiDrive Modal */}
      <Dialog open={multiDriveOpen} onOpenChange={setMultiDriveOpen}>
        <DialogContent className="bg-surface border-accent-cyan max-w-md" data-testid="multidrive-modal">
          <DialogHeader>
            <DialogTitle className="text-2xl font-heading font-black uppercase text-accent-cyan text-center">
              MultiDrive Access
            </DialogTitle>
          </DialogHeader>
          <div className="py-8 text-center">
            {!redirecting ? (
              <>
                <Cloud className="w-20 h-20 mx-auto mb-6 text-accent-cyan" />
                <p className="text-text-secondary mb-2 text-sm">Secure Cloud Storage Platform</p>
                <p className="text-text-accent font-body text-xs tracking-wider uppercase mb-8">
                  Powered by MultiNet
                </p>
                <motion.button
                  onClick={handleRedirect}
                  data-testid="multidrive-access-btn"
                  className="w-full px-6 py-3 bg-accent-cyan text-background font-bold rounded-lg"
                  whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(5, 217, 232, 0.5)' }}
                  whileTap={{ scale: 0.95 }}
                >
                  Access Drive
                </motion.button>
              </>
            ) : (
              <div className="flex flex-col items-center" data-testid="multidrive-redirecting">
                <div className="w-16 h-16 mb-4">
                  <motion.div
                    className="w-full h-full border-4 border-accent-cyan border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  />
                </div>
                <p className="text-accent-cyan font-bold">Redirecting to MultiDrive...</p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Game Modals */}
      <Dialog open={activeGame !== null} onOpenChange={() => setActiveGame(null)}>
        <DialogContent className="bg-surface border-accent-cyan max-w-4xl max-h-[90vh] overflow-auto" data-testid="game-modal">
          {activeGame && (
            <div className="w-full">
              {(() => {
                const GameComponent = activeGame.component;
                return <GameComponent />;
              })()}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default App;