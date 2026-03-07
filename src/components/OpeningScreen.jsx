import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';

const OpeningScreen = ({ onOpen }) => {
    const navigate = useNavigate();
    const location = useLocation();

    // Extract the 'to' parameter from the URL query string
    // With HashRouter, params might be before the hash (window.location.search) or after (location.search)
    const urlParams = new URLSearchParams(window.location.search);
    const hashParams = new URLSearchParams(location.search);
    const recipient = hashParams.get('to') || urlParams.get('to');

    const handleOpen = () => {
        onOpen();
        navigate('/invitation');
    };

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
                            color: '#555555',
                            fontFamily: "'Alex Brush', cursive"
                        }}
                    >
                        Dear {recipient},
                    </motion.div>
                )}

                <motion.h1
                    className="title"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.8 }}
                    style={{
                        marginBottom: '2rem',
                        fontSize: '2.5rem',
                        color: '#3A3A3A',
                        letterSpacing: '2px'
                    }}
                >
                    With Love, We Invite You
                </motion.h1>

                <motion.button
                    whileHover={{ scale: 1.05, backgroundColor: '#9C8968' }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleOpen}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.6 }}
                    style={{
                        padding: '14px 36px',
                        border: 'none',
                        backgroundColor: '#B8A47E',
                        color: 'white',
                        fontSize: '1rem',
                        letterSpacing: '1px',
                        textTransform: 'uppercase',
                        cursor: 'pointer',
                        borderRadius: '30px',
                        boxShadow: '0 4px 15px rgba(184, 164, 126, 0.4)',
                        transition: 'box-shadow 0.3s ease',
                    }}
                >
                    Open Invitation
                </motion.button>
            </motion.div>
        </motion.div>
    );
};

export default OpeningScreen;
