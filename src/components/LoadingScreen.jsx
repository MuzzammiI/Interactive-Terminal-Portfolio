import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentText, setCurrentText] = useState('');
  
  const loadingTexts = [
    'Initializing terminal...',
    'Loading portfolio data...',
    'Setting up command interface...',
    'Preparing interactive experience...',
    'Ready to explore!'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 2;
        
        // Update loading text based on progress
        const textIndex = Math.floor((newProgress / 100) * loadingTexts.length);
        if (textIndex < loadingTexts.length) {
          setCurrentText(loadingTexts[textIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 500);
          return 100;
        }
        return newProgress;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-terminal-bg flex items-center justify-center z-50"
    >
      <div className="text-center space-y-8">
        {/* Terminal Icon Animation */}
        <motion.div
          animate={{ 
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-6xl text-terminal-green mb-8"
        >
          💻
        </motion.div>

        {/* Loading Text */}
        <motion.div
          key={currentText}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-terminal-green text-xl font-mono font-semibold"
        >
          {currentText}
        </motion.div>

        {/* Progress Bar */}
        <div className="w-80 h-2 bg-terminal-border rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-terminal-green to-terminal-blue"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>

        {/* Progress Percentage */}
        <div className="text-terminal-gray font-mono">
          {progress}%
        </div>

        {/* Matrix-style background effect */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-terminal-green font-mono text-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                y: [0, -20, -40],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            >
              {Math.random() > 0.5 ? '1' : '0'}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;