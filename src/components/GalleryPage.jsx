import React from 'react';
import { motion } from 'framer-motion';

const GalleryPage = () => {
    // Array of image paths
    const images = Array.from({ length: 8 }, (_, i) => `/images/${i + 1}.webp`);

    return (
        <div style={{
            width: '100vw',
            minHeight: '100vh',
            backgroundColor: '#FAF8F5',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            overflowX: 'hidden',
        }}>
            {images.map((src, index) => (
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
                            display: 'block',
                        }}
                    />
                </motion.div>
            ))}
        </div>
    );
};

export default GalleryPage;
