import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Particles from 'react-tsparticles';
import { loadSlim } from 'tsparticles-slim';
import { Cloud, Gamepad2, Puzzle, Zap, Dices, Volume2, VolumeX } from 'lucide-react';
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
  const [showKineticIntro, setShowKineticIntro] = useState(false);
  const [musicOn, setMusicOn] = useState(false);
  const audioRef = useRef(null);

  const particlesInit = useCallback(async (engine) => {
    await loadSlim(engine);
  }, []);

  const handleMultiDriveClick = () => {
    setMultiDriveOpen(true);
    setShowKineticIntro(true);
    setTimeout(() => {
      setShowKineticIntro(false);
    }, 2800);
  };

  const handleRedirect = () => {
    setRedirecting(true);
    setTimeout(() => {
      window.open('https://cloud.multigroup.my.id', '_blank');
      setRedirecting(false);
      setMultiDriveOpen(false);
    }, 1500);
  };

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (musicOn) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {});
    }
    setMusicOn(!musicOn);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
    }
  }, []);

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

      {/* Background Music */}
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/10/30/audio_347111d654.mp3"
        data-testid="bg-music-audio"
      />

      {/* Music Toggle Button */}
      <motion.button
        onClick={toggleMusic}
        data-testid="music-toggle-btn"
        className="fixed top-6 right-6 z-50 w-12 h-12 bg-surface border border-border-default rounded-full flex items-center justify-center"
        whileHover={{ 
          scale: 1.1, 
          boxShadow: '0 0 20px rgba(5, 217, 232, 0.6)',
          borderColor: 'rgba(5, 217, 232, 0.8)'
        }}
        whileTap={{ scale: 0.9 }}
        animate={musicOn ? { 
          boxShadow: ['0 0 5px rgba(1, 255, 195, 0.3)', '0 0 15px rgba(1, 255, 195, 0.6)', '0 0 5px rgba(1, 255, 195, 0.3)']
        } : {}}
        transition={{ duration: 1.5, repeat: musicOn ? Infinity : 0 }}
      >
        {musicOn ? (
          <Volume2 className="w-5 h-5 text-accent-green" />
        ) : (
          <VolumeX className="w-5 h-5 text-text-secondary" />
        )}
      </motion.button>

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
          <div className="py-8 text-center min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              {showKineticIntro ? (
                <motion.div
                  key="kinetic"
                  className="w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  data-testid="multidrive-kinetic-intro"
                >
                  <div className="flex justify-center items-center gap-1 flex-wrap mb-4">
                    {'POWERED BY'.split('').map((char, i) => (
                      <motion.span
                        key={`p-${i}`}
                        initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                        transition={{ delay: i * 0.05, duration: 0.4 }}
                        className="text-xl font-heading font-black uppercase text-text-secondary tracking-wider"
                      >
                        {char === ' ' ? '\u00A0' : char}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex justify-center items-center gap-1 flex-wrap">
                    {'MULTINET'.split('').map((char, i) => (
                      <motion.span
                        key={`m-${i}`}
                        initial={{ opacity: 0, y: 30, filter: 'blur(12px)', scale: 0.5 }}
                        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
                        transition={{ delay: 0.6 + i * 0.08, duration: 0.5, type: 'spring' }}
                        className="text-4xl font-heading font-black uppercase text-accent-cyan"
                        style={{ textShadow: '0 0 20px rgba(5, 217, 232, 0.8)' }}
                      >
                        {char}
                      </motion.span>
                    ))}
                  </div>
                  <motion.div
                    className="mt-6 h-[2px] mx-auto bg-gradient-to-r from-transparent via-accent-cyan to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: '100%' }}
                    transition={{ delay: 1.5, duration: 1 }}
                  />
                </motion.div>
              ) : !redirecting ? (
                <motion.div
                  key="info"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                  className="w-full"
                >
                  <Cloud className="w-20 h-20 mx-auto mb-6 text-accent-cyan" />
                  <p className="text-text-secondary mb-2 text-sm">Secure Cloud Storage Platform</p>
                  <motion.div
                    className="inline-block px-4 py-1.5 mb-8 border border-accent-green rounded-full"
                    animate={{ boxShadow: ['0 0 5px rgba(1, 255, 195, 0.3)', '0 0 20px rgba(1, 255, 195, 0.6)', '0 0 5px rgba(1, 255, 195, 0.3)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <p className="text-text-accent font-body text-xs tracking-wider uppercase">
                      Powered by MultiNet
                    </p>
                  </motion.div>
                  <motion.button
                    onClick={handleRedirect}
                    data-testid="multidrive-access-btn"
                    className="w-full px-6 py-3 bg-accent-cyan text-background font-bold rounded-lg"
                    whileHover={{ scale: 1.05, boxShadow: '0 0 20px rgba(5, 217, 232, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Access Drive
                  </motion.button>
                </motion.div>
              ) : (
                <motion.div
                  key="redirect"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center"
                  data-testid="multidrive-redirecting"
                >
                  <div className="w-16 h-16 mb-4">
                    <motion.div
                      className="w-full h-full border-4 border-accent-cyan border-t-transparent rounded-full"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                  </div>
                  <p className="text-accent-cyan font-bold">Redirecting to MultiDrive...</p>
                </motion.div>
              )}
            </AnimatePresence>
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