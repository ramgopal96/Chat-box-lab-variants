import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const IsolatedInput = ({ variant = '1', label = '' }) => {
    const [inputValue, setInputValue] = useState('');

    // Generate random seed on mount for organic feel
    const [seed, setSeed] = useState(0);
    useEffect(() => {
        setSeed(Math.random());
    }, []);

    const hasText = inputValue.trim().length > 0;

    // Helper to get animation config based on variant - NOW subtle variations of the SAME screen effect
    const getVariantConfig = () => {
        const base = {
            duration: 4,
            rotateSpeed: 15,
            scaleAmount: 0.15, // Large scale breath
            opacityMult: 1,
            blurAmount: '30px',
            gradientType: 'standard' // mix
        };

        switch (variant) {
            case '1': return { ...base, duration: 4, rotateSpeed: 20 }; // Standard Screen
            case '2': return { ...base, duration: 2.5, scaleAmount: 0.18, rotateSpeed: 12 }; // Active/Busy Screen
            case '3': return { ...base, duration: 6, scaleAmount: 0.1, rotateSpeed: 30, blurAmount: '40px' }; // Idle/Ambient Screen
            case '4': return { ...base, duration: 4, opacityMult: 0.7, blurAmount: '20px' }; // Dimmed Screen
            default: return base;
        }
    };

    const config = getVariantConfig();
    const opacityMult = config.opacityMult || 1;

    // Shared transition prop
    const pulseTransition = {
        duration: config.duration + (seed * 2), // Randomize slightly
        repeat: Infinity,
        ease: "easeInOut",
        repeatType: "mirror"
    };

    const rotateTransition = {
        duration: config.rotateSpeed,
        repeat: Infinity,
        ease: "linear"
    };

    return (
        <div className="isolated-input-wrapper" style={{ width: '100%', maxWidth: '380px' }}>
            {label && <div style={{ color: '#fff', marginBottom: '24px', textAlign: 'center', opacity: 0.8, fontFamily: 'sans-serif', fontSize: '14px', letterSpacing: '0.5px' }}>{label}</div>}

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', position: 'relative' }}>

                {/* Input container needs overflow-visible so the halo spills out */}
                <div className="input-container ai-mode" style={{
                    position: 'relative',
                    overflow: 'visible',
                    background: '#fff',
                    flex: 1,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.1)', // Subtle shadow for the pill itself
                    zIndex: 10
                }}>

                    {/* Primary Glow - The "Halo" */}
                    <motion.div
                        initial={{ opacity: 0.6 * opacityMult, rotate: 0, scale: 1 }}
                        animate={{
                            opacity: [0.6 * opacityMult, 0.8 * opacityMult, 0.6 * opacityMult],
                            scale: [1, 1.05 + config.scaleAmount, 1],
                            rotate: config.rotateSpeed ? 360 : 0
                        }}
                        transition={{
                            opacity: pulseTransition,
                            scale: pulseTransition,
                            rotate: rotateTransition
                        }}
                        style={{
                            position: 'absolute',
                            inset: '-20px', // Large spill
                            borderRadius: '40px',
                            background: 'conic-gradient(from 180deg, transparent 0%, #6FC9E8 30%, #5fded8 50%, #6FC9E8 70%, transparent 100%)', // Cyan/Blue mix
                            filter: 'blur(30px)', // Heavy blur
                            zIndex: -1,
                            pointerEvents: 'none',
                            transformOrigin: 'center center'
                        }}
                    />

                    {/* Secondary centralized glow for intensity */}
                    <motion.div
                        initial={{ opacity: 0.4, scale: 0.9 }}
                        animate={{ opacity: [0.4, 0.6, 0.4], scale: [0.9, 0.95, 0.9] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                        style={{
                            position: 'absolute',
                            inset: '-10px',
                            borderRadius: '50px',
                            background: '#6FC9E8',
                            filter: 'blur(40px)', // Very diffuse core
                            zIndex: -2,
                            pointerEvents: 'none'
                        }}
                    />

                    <div className="plus-icon-container" style={{ position: 'relative', zIndex: 20 }}>
                        <img src="/assets/plus-custom.svg" alt="Add" style={{ width: 16, height: 16 }} />
                    </div>
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Ask Owting AI..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        style={{ position: 'relative', zIndex: 20, background: 'transparent' }}
                    />
                </div>

                {/* Owting Button */}
                <div className={`owting-button active ${hasText ? 'has-text' : ''}`} style={{ width: '43px', height: '43px' }}>
                    <img src="/assets/full_screen/46a454a14686c0d6da2856f10afde8515e6333f2.svg" className="button-bg" alt="bg" />
                    <img src="/assets/full_screen/bc3f4b7f6bcc3a68d977dd1e28ecf9d032afc7cc.svg" className="button-logo" alt="logo" />
                    <div className="close-icon">
                        <img src="/assets/plus-custom.svg" alt="Close" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <div className="send-icon">
                        <img src="/assets/figma_icons/08ef2a11a1c71f0628efcc5a4b7738d116c846ac.svg" alt="Send" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                </div>

            </div>
        </div>
    );
};

export default IsolatedInput;
