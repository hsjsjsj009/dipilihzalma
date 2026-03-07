import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryPage = () => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            overflow: 'hidden',
            backgroundColor: '#FAF8F5', // Match the rest of the app's aesthetic
        }}>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FAF8F5',
                            zIndex: 10,
                        }}
                    >
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                            style={{
                                width: '40px',
                                height: '40px',
                                border: '3px solid rgba(184, 164, 126, 0.3)',
                                borderTop: '3px solid #b8a47e',
                                borderRadius: '50%',
                                marginBottom: '16px',
                            }}
                        />
                        <div style={{
                            color: '#b8a47e',
                            fontFamily: 'serif',
                            fontSize: '1.2rem',
                            letterSpacing: '2px',
                        }}>
                            Loading...
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <iframe
                loading="eager"
                onLoad={() => setIsLoading(false)}
                style={{
                    position: 'absolute',
                    left: 0,
                    width: '100%',
                    // Increase height to compensate for negative top offset
                    height: 'calc(100% + 150px)',
                    border: 'none',
                    padding: 0,
                    margin: 0,
                    opacity: isLoading ? 0 : 1, // Hide iframe until it's ready to avoid white flashes
                    transition: 'opacity 0.5s ease-in-out',
                    // Shift the iframe up aggressively to hide the Canva toolbar and top whitespace
                    top: '-100px',
                }}
                src="https://www.canva.com/design/DAHDT3NjVx4/_bMNn5q1N15cxcHUxzlaKQ/view?embed#page=1"
            />
        </div>
    );
};

export default GalleryPage;
