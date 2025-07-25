import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Terminal from './components/Terminal';
import LoadingScreen from './components/LoadingScreen';
import ErrorBoundary from './components/ErrorBoundary';
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <ErrorBoundary>
      <div className="App">
        <AnimatePresence mode="wait">
          {isLoading ? (
            <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
          ) : (
            <Terminal key="terminal" />
          )}
        </AnimatePresence>
      </div>
    </ErrorBoundary>
  );
}

export default App;
