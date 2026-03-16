import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const GalleryPage = () => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const preloadImages = async () => {
            try {
                // Determine base path for GitHub Pages or Local Dev
                const basePath = import.meta.env.BASE_URL;
                
                // Array of paths resolving correctly against the base URL
                const imagePaths = Array.from({ length: 8 }, (_, i) => `${basePath}images/${i + 1}.webp`);

                // Fetch all images in parallel and convert to Blobs
                const fetchPromises = imagePaths.map(async (path) => {
                    const response = await fetch(path);
                    if (!response.ok) throw new Error(`Failed to load ${path}`);
                    const blob = await response.blob();
                    return URL.createObjectURL(blob);
                });

                const loadedImages = await Promise.all(fetchPromises);
                setImages(loadedImages);
                setIsLoading(false);
            } catch (error) {
                console.error("Error preloading images:", error);
                // Fallback to direct paths if fetch fails, giving the browser a chance to handle it gracefully
                const fallbackPaths = Array.from({ length: 8 }, (_, i) => `${import.meta.env.BASE_URL}images/${i + 1}.webp`);
                setImages(fallbackPaths);
                setIsLoading(false);
            }
        };

        preloadImages();

        // Cleanup object URLs on unmount
        return () => {
            images.forEach(url => {
                if (url.startsWith('blob:')) {
                    URL.revokeObjectURL(url);
                }
            });
        };
        // Intentionally omitting 'images' dependency to run only once on mount
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: '#FAF8F5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowX: 'hidden',
            position: 'relative'
        }}>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        style={{
                            position: 'fixed',
                            top: 0,
                            left: 0,
                            width: '100vw',
                            height: '100vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FAF8F5',
                            zIndex: 50,
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

            {!isLoading && images.map((src, index) => (
                <motion.div
                    key={index}
                    initial={{ opacity: 0.3 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    style={{
                        width: '100%',
                        maxWidth: '600px', // Restrain ultimate width on very wide screens for better reading experience
                        minHeight: '100vh', // Ensure minimum height so next section doesn't bleed into view initially
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        padding: '0',
                        margin: '0',
                    }}
                >
                    <img
                        src={src}
                        alt={`Invitation Page ${index + 1}`}
                        style={{
                            width: '100%',
                            minHeight: '100vh', // Forces image to span entire height
                            height: '100%',
                            objectFit: 'cover', // Crops perfectly to viewport size so no second image is visible
                            objectPosition: 'center', // Explicitly anchor cropping to the center
                            display: 'block',
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default GalleryPage;
