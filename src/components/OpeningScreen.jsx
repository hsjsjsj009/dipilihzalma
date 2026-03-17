import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
const ASSETS = {
    butterfly: `${baseUrl}/assets/Butterfly.png`,
    flower: `${baseUrl}/assets/Flower.png`
};

const OpeningScreen = ({ onOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [imagesLoaded, setImagesLoaded] = useState(false);

    // Extract the 'to' parameter from the URL query string
    // With HashRouter, params might be before the hash (window.location.search) or after (location.search)
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(location.search);
    const recipient = hashParams.get('to') || urlParams.get('to');

    useEffect(() => {
        const preloadImages = async () => {
            const imagePromises = Object.values(ASSETS).map((src) => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.src = src;
                    img.onload = resolve;
                    img.onerror = resolve; // Resolve even on error to not block the whole page forever
                });
            });

            await Promise.all(imagePromises);
            setImagesLoaded(true);
        };

        preloadImages();
    }, []);

    const handleOpen = () => {
        onOpen();
        navigate('/invitation');
    };

    if (!imagesLoaded) {
        return (
            <div style={{
                position: 'fixed',
                top: 0, left: 0, width: '100%', height: '100vh',
                display: 'flex', justifyContent: 'center', alignItems: 'center',
                background: 'linear-gradient(135deg, #FAF8F5 0%, #EAE4D9 100%)',
                zIndex: 999
            }}>
                { /* Simple loading indicator */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    style={{
                        width: '40px', height: '40px',
                        border: '3px solid rgba(89, 124, 88, 0.3)',
                        borderTop: '3px solid #597c58',
                        borderRadius: '50%'
                    }}
                />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                zIndex: 999,
                background: 'linear-gradient(135deg, #FAF8F5 0%, #EAE4D9 100%)',
            }}
        >
            <motion.div
                className="glass-panel"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{
                    padding: '3rem 4rem',
                    borderRadius: '20px',
                    border: '3px solid #ba8c8c',
                    textAlign: 'center',
                    maxWidth: '90%',
                }}
            >
                {recipient && (
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        style={{
                            marginBottom: '1rem',
                            fontSize: '2rem',
                            color: '#597c58',
                            fontFamily: "'Alex Brush', cursive"
                        }}
                    >
                        Dear {recipient},
                    </motion.div>
                )}

                <div style={{ marginBottom: '2rem', width: '100%' }}>
                    <motion.h1
                        className="title"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        style={{
                            margin: '0 auto',
                            fontSize: '2.5rem',
                            color: '#597c58',
                            letterSpacing: '2px',
                            position: 'relative',
                            display: 'inline-block',
                            lineHeight: '1.4'
                        }}
                    >
                        With Love,<br />We Invite You
                        <motion.img
                            src={ASSETS.butterfly}
                            alt="Butterfly"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.8, type: 'spring' }}
                            style={{
                                position: 'absolute',
                                right: '-25px',
                                bottom: '25px',
                                width: '35px',
                                zIndex: 2,
                                pointerEvents: 'none'
                            }}
                        />
                    </motion.h1>
                </div>

                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <motion.img
                        src={ASSETS.flower}
                        alt="Flower"
                        initial={{ opacity: 0, x: -20, y: '-50%' }}
                        animate={{ opacity: 1, x: 0, y: '-50%' }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        style={{
                            position: 'absolute',
                            left: '-45px',
                            top: '-15%',
                            width: '80px',
                            zIndex: 3,
                            pointerEvents: 'none'
                        }}
                    />
                    <motion.button
                        whileHover={{ scale: 1.05, backgroundColor: '#9C8968' }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleOpen}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.9, duration: 0.6 }}
                        style={{
                            position: 'relative',
                            zIndex: 2,
                            padding: '14px 36px',
                            border: 'none',
                            backgroundColor: '#ba8c8c',
                            color: 'white',
                            fontSize: '1rem',
                            letterSpacing: '1px',
                            textTransform: 'uppercase',
                            cursor: 'pointer',
                            borderRadius: '30px',
                            boxShadow: '0 4px 15px rgba(89, 124, 88, 0.4)',
                            transition: 'box-shadow 0.3s ease',
                        }}
                    >
                        Open Invitation
                    </motion.button>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default OpeningScreen;
