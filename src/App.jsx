import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import OpeningScreen from './components/OpeningScreen';
import GalleryPage from './components/GalleryPage';
import AudioPlayer from './components/AudioPlayer';

function AnimatedRoutes({ playMusic }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<OpeningScreen onOpen={playMusic} />} />
        <Route path="/invitation" element={<GalleryPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  const startMusic = () => {
    setIsPlaying(true);
  };

  return (
    <Router>
      <AnimatedRoutes playMusic={startMusic} />
      <AudioPlayer isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
    </Router>
  );
}

export default App;
