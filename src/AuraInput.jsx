import React from 'react';

// Wrapper component to center the input on screen
const DemoWrapper = ({ children }) => (
    <div className="demo-wrapper">
        {children}
    </div>
);

export const AuraInput = () => {
    return (
        <DemoWrapper>
            <style>{`
                
    /* Resets & Container */
    * { box-sizing: border-box; }
    
    .demo-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: #f0f4f8; /* Light gray background to show off white glow */
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    }

    /* Layout & Base */
    .input-box {
        position: relative;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 16px 22px;
        background: white;
        border-radius: 30px;
        box-shadow: 0px 10px 30px rgba(0, 0, 0, 0.1);
        width: 100%;
        max-width: 400px;
        transform-style: preserve-3d;
        transition: transform 0.2s ease;
    }
    
    .input-field {
        flex: 1;
        border: none;
        outline: none;
        background: transparent;
        font-size: 16px;
        color: #111827;
        font-family: inherit;
        padding: 0;
        margin: 0;
    }

    .input-icon-left {
        display: flex;
        align-items: center;
        justify-content: center;
        color: #9CA3AF;
        margin-right: 4px;
    }

    .action-button {
        width: 40px;
        height: 40px;
        background: transparent;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        color: #1F2937;
    }
    
    .action-button:hover {
        transform: scale(1.05);
        background: rgba(0,0,0,0.05);
    }

    /* Aura / Halo Layers */
    .halo-wrapper {
        position: absolute;
        inset: -5px -10px;
        pointer-events: none;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: -1;
    }

    .halo-beam, .halo-ambient, .glow-layer {
        position: absolute;
        border-radius: 34px;
        pointer-events: none;
    }

    /* Base Keyframes */
    @property --angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
    }

    @keyframes spin {
        from { --angle: 0deg; }
        to { --angle: 360deg; }
    }
    
    @keyframes breatheInner {
        0%, 100% { opacity: 0.6; transform: scale(1); }
        50% { opacity: 1.0; transform: scale(1.05); }
    }

    @keyframes breatheOuter {
        0%, 100% { opacity: 0.2; transform: scale(1); }
        50% { opacity: 0.5; transform: scale(1.1); }
    }
    
    @keyframes breatheAmbient {
        0%, 100% { opacity: 0.1; }
        50% { opacity: 0.4; }
    }
    
    @keyframes shimmerMove {
        0% { background-position: -200% center; }
        100% { background-position: 200% center; }
    }

    @keyframes slowDrift {
        0%, 100% { transform: translateY(-5px); filter: blur(20px); }
        50% { transform: translateY(5px); filter: blur(30px); }
    }

    @keyframes borderFlow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
    }
    
                
            .halo-beam {
                inset: -3px;
                background: linear-gradient(90deg, #6FC9E8, #ffffff, #6FC9E8, #ffffff, #6FC9E8);
                background-size: 300% 300%;
                filter: blur(10px);
                border-radius: 34px;
                animation: borderFlow 4s ease-in-out infinite;
                z-index: -1;
                opacity: 1;
            }
            .halo-ambient {
                inset: -4px;
                background: linear-gradient(90deg, rgba(111, 201, 232, 0.4), rgba(255, 255, 255, 0.6), rgba(111, 201, 232, 0.4));
                background-size: 300% 300%;
                filter: blur(20px);
                border-radius: 36px;
                animation: borderFlow 4s ease-in-out infinite reverse;
                opacity: 0.6;
            }
            .glow-layer {
                inset: -10px;
                background: radial-gradient(circle, rgba(111, 201, 232, 0.3) 0%, transparent 70%);
                filter: blur(15px);
                opacity: 0.4;
                animation: breatheAmbient 4s ease-in-out infinite;
            }
        
            `}</style>

            <div className="input-box">
                <div className="halo-wrapper">
                    <div className="halo-beam" />
                    <div className="halo-ambient" />
                    <div className="glow-layer" />
                </div>



                <input
                    type="text"
                    className="input-field"
                    placeholder="Press X to exit AI planner"
                    readOnly
                />

                <button className="action-button">
                    <div style={{ display: 'flex' }} dangerouslySetInnerHTML={{ __html: `<svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>` }} />
                </button>
            </div>
        </DemoWrapper>
    );
};

export default AuraInput;
