import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Music, Play, Pause } from 'lucide-react';

const AudioPlayer = ({ isPlaying, setIsPlaying }) => {
    const audioRef = useRef(null);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(error => console.log('Autoplay prevented:', error));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    return (
        <>
            <audio ref={audioRef} loop src={`${import.meta.env.BASE_URL}music.mp3`} preload="auto" />

            <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsPlaying(!isPlaying)}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    left: '20px',
                    zIndex: 1000,
                    background: 'rgba(184, 164, 126, 0.8)',
                    backdropFilter: 'blur(5px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    borderRadius: '50%',
                    width: '50px',
                    height: '50px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.1)'
                }}
            >
                {isPlaying ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 4, ease: "linear" }}>
                        <Music size={20} />
                    </motion.div>
                ) : (
                    <Music size={20} style={{ opacity: 0.6 }} />
                )}
            </motion.button>
        </>
    );
};

export default AudioPlayer;
