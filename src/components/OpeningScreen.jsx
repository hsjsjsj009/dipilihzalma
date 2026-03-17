import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { preloadImageAsBlob, getPreloadedImage } from '../utils/imageLoader';

const baseUrl = import.meta.env.BASE_URL.replace(/\/$/, '');
const ASSETS = {
    butterfly: `${baseUrl}/assets/Butterfly.png`,
    flower: `${baseUrl}/assets/Flower.png`,
    bg: `${baseUrl}/assets/BG1.webp`
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
            const assetPromises = Object.values(ASSETS).map((src) => {
                return preloadImageAsBlob(src);
            });

            // Preload gallery images (1.webp to 8.webp)
            const galleryPromises = Array.from({ length: 8 }).map((_, i) => {
                return preloadImageAsBlob(`${baseUrl}/images/${i + 1}.webp`);
            });

            await Promise.all([...assetPromises, ...galleryPromises]);
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
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${getPreloadedImage(ASSETS.bg)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundAttachment: 'fixed',
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
                flexDirection: 'column',
                justifyContent: 'flex-start',
                paddingTop: 'clamp(1rem, 5vh, 4rem)',
                alignItems: 'center',
                zIndex: 999,
                backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${getPreloadedImage(ASSETS.bg)})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center bottom',
                backgroundAttachment: 'fixed',
            }}
        >
            {/* Top Text: A Promise Before Forever */}
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                style={{
                    fontFamily: "'Glacial Indifference', sans-serif",
                    fontSize: 'clamp(1.5rem, 6vw, 2.2rem)',
                    color: '#FFFFFF',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                    textAlign: 'center',
                    marginBottom: 'clamp(1rem, 3vw, 2rem)',
                    lineHeight: '1.1',
                    letterSpacing: '1px',
                    zIndex: 2
                }}
            >
                A Promise<br />Before Forever
            </motion.div>

            {/* Middle Text: Zalma & Dipta */}
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                style={{
                    fontFamily: "'Euphoria Script', cursive",
                    color: '#FFFFFF',
                    textShadow: '2px 2px 4px rgba(0,0,0,0.6), -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000',
                    fontSize: 'clamp(3rem, 12vw, 4rem)',
                    marginBottom: 'clamp(2rem, 5vw, 3rem)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    lineHeight: '0.9',
                    zIndex: 2
                }}
            >
                <div style={{ alignSelf: 'flex-start', marginLeft: 'clamp(-1rem, -4vw, -2.5rem)' }}>Zalma</div>
                <div style={{ fontSize: 'clamp(2rem, 8vw, 3rem)', margin: '0.2rem 0', fontFamily: "'Euphoria Script', cursive" }}>&</div>
                <div style={{ alignSelf: 'flex-end', marginRight: 'clamp(-1rem, -4vw, -2.5rem)' }}>Dipta</div>
            </motion.div>

            <motion.div
                className="glass-panel"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                style={{
                    padding: 'clamp(1.5rem, 5vw, 3rem) clamp(2rem, 6vw, 4rem)',
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
                            fontSize: 'clamp(1.5rem, 5vw, 2rem)',
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
                            fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                            color: '#597c58',
                            letterSpacing: '2px',
                            position: 'relative',
                            display: 'inline-block',
                            lineHeight: '1.4'
                        }}
                    >
                        With Love,<br />We Invite You
                        <motion.img
                            src={getPreloadedImage(ASSETS.butterfly)}
                            alt="Butterfly"
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 1, duration: 0.8, type: 'spring' }}
                            style={{
                                position: 'absolute',
                                right: '-20px',
                                bottom: 'clamp(15px, 3vw, 25px)',
                                width: 'clamp(25px, 6vw, 35px)',
                                zIndex: 2,
                                pointerEvents: 'none'
                            }}
                        />
                    </motion.h1>
                </div>

                <div style={{ position: 'relative', display: 'inline-block' }}>
                    <motion.img
                        src={getPreloadedImage(ASSETS.flower)}
                        alt="Flower"
                        initial={{ opacity: 0, x: -20, y: '-50%' }}
                        animate={{ opacity: 1, x: 0, y: '-50%' }}
                        transition={{ delay: 1.2, duration: 0.8 }}
                        style={{
                            position: 'absolute',
                            left: 'clamp(-50px, -6vw, -33px)',
                            top: '-15%',
                            width: 'clamp(50px, 15vw, 80px)',
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
                            padding: 'clamp(10px, 3vh, 14px) clamp(24px, 6vw, 36px)',
                            border: 'none',
                            backgroundColor: '#ba8c8c',
                            color: 'white',
                            fontSize: 'clamp(0.8rem, 2.5vw, 1rem)',
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
