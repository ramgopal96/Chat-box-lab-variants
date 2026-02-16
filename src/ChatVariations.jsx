import React, { useState } from 'react';
import { motion } from 'framer-motion';
import IsolatedInput from './IsolatedInput';

/**
 * ChatVariations Component
 * Renders a grid of IsolatedInput components with different input animation configurations.
 */
const ChatVariations = () => {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '80px',
            padding: '80px 60px', // More padding on left
            backgroundColor: '#333333', // Dark Grey as requested (to see the white glow effect properly, light grey might wash it out but let's try a medium grey or dark grey as usually requested for "grey bg") - actually "grey" usually means a neutral background. The user wants to see the effect "like in the screen" which was white-ish, so a dark grey is better to see the glow. Let's go with #333.
            minHeight: '100vh',
            placeItems: 'start', // Align left
            alignContent: 'start',
        }}>
            {/* Variant 1 */}
            <IsolatedInput
                variant="1"
                label="Variant 1 (Standard)"
            />

            {/* Variant 2 */}
            <IsolatedInput
                variant="2"
                label="Variant 2 (Fast Pulse)"
            />

            {/* Variant 3 */}
            <IsolatedInput
                variant="3"
                label="Variant 3 (Slow & Deep)"
            />

            {/* Variant 4 */}
            <IsolatedInput
                variant="4"
                label="Variant 4 (Subtle)"
            />
        </div>
    );
};

export default ChatVariations;
