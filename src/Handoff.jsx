import React, { useState } from 'react';
import { Microphone, PaperPlaneRight, X, DownloadSimple, FileCode } from '@phosphor-icons/react';
import './styles/Handoff.css';

const GENERATE_REACT_COMPONENT = (title, variantClass, defaultText = "Ask Owting AI...", leftIconType = null, isExitMode = false) => {
    // 1. Clean the title to create a valid React Component Name (e.g., "1. Aura" -> "AuraInput")
    const cleanTitle = title.replace(/^[0-9\.\s]+/, '').split('(')[0].trim().replace(/[^a-zA-Z0-9]/g, '');
    const componentName = cleanTitle + 'Input';

    // 2. Inline SVG strings (Dependency-free ingredients)
    const ICONS = {
        microphone: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M128,176a48.05,48.05,0,0,0,48-48V64a48,48,0,0,0-96,0v64A48.05,48.05,0,0,0,128,176ZM96,64a32,32,0,0,1,64,0v64a32,32,0,0,1-64,0Zm40,143.6V232a8,8,0,0,1-16,0V207.6A80.11,80.11,0,0,1,48,128a8,8,0,0,1,16,0,64,64,0,0,0,128,0,8,8,0,0,1,16,0A80.11,80.11,0,0,1,136,207.6Z"></path></svg>`,
        paperPlane: `<svg width="20" height="20" viewBox="0 0 256 256" fill="currentColor"><path d="M227.32,28.68a16,16,0,0,0-15.66-4.08l-157.76,48.69a16,16,0,0,0-2.24,5.8H48a16,16,0,0,0-15,21.32l25.7,77.1L95.6,220.39A16,16,0,0,0,110.82,232H112a16,16,0,0,0,14.07-9l97.66-179.79A16,16,0,0,0,227.32,28.68Z"></path></svg>`,
        exit: `<svg width="24" height="24" viewBox="0 0 256 256" fill="currentColor"><path d="M205.66,194.34a8,8,0,0,1-11.32,11.32L128,139.31,61.66,205.66a8,8,0,0,1-11.32-11.32L116.69,128,50.34,61.66A8,8,0,0,1,61.66,50.34L128,116.69l66.34-66.35a8,8,0,0,1,11.32,11.32L139.31,128Z"></path></svg>`
    };

    // 3. Embedded Styles (Portable Ingredients)
    const CSS = `
    /* Resets & Container */
    * { box-sizing: border-box; }
    
    .demo-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        min-height: 100vh;
        background: #f0f4f8; /* The "Clean Slate" background to make effects pop */
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
        background: ${isExitMode ? 'transparent' : '#0F172A'};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        cursor: pointer;
        transition: all 0.2s ease;
        color: ${isExitMode ? '#1F2937' : 'white'};
    }
    
    .action-button:hover {
        transform: scale(1.05);
        background: ${isExitMode ? 'rgba(0,0,0,0.05)' : '#1E293B'};
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

    /* Variant Implementation */
    ${variantClass === 'v-original' ? `
        .halo-beam {
            inset: 4px;
            background: conic-gradient(from var(--angle), #6FC9E8, #a0d8f0, rgba(255, 255, 255, 0.8), #a0d8f0, #6FC9E8);
            animation: breatheInner 4s ease-in-out infinite;
            filter: blur(16px);
        }
        .halo-ambient {
            inset: 0px;
            background: conic-gradient(from var(--angle), #6FC9E8, rgba(255, 255, 255, 0.3), #6FC9E8, #6FC9E8);
            animation: breatheOuter 5s ease-in-out infinite;
            filter: blur(15px);
        }
        .glow-layer {
            inset: -5px;
            background: conic-gradient(from var(--angle), #6FC9E8, rgba(255, 255, 255, 0.1), #6FC9E8);
            animation: breatheAmbient 6s ease-in-out infinite;
            filter: blur(20px);
            opacity: 0.2;
        }
    ` : ''}

    ${variantClass === 'v-pulse' ? `
        @keyframes flarePulse {
            0%, 100% { transform: scale(0.95); opacity: 0.4; filter: blur(15px); }
            50% { transform: scale(1.1); opacity: 0.8; filter: blur(25px); }
        }
        .halo-beam {
            inset: 4px;
            background: conic-gradient(from var(--angle), #6FC9E8, #ffffff, #6FC9E8);
            animation: flarePulse 3s ease-in-out infinite;
        }
        .halo-ambient {
            inset: -2px;
            background: #6FC9E8;
            opacity: 0.3;
            animation: flarePulse 4s ease-in-out infinite 0.5s;
        }
    ` : ''}

    ${variantClass === 'v-orbs' ? `
        @keyframes audioPulse {
            0%, 100% { transform: scale(1); opacity: 0.5; filter: blur(10px); }
            50% { transform: scale(1.03); opacity: 0.9; filter: blur(14px); }
        }
        .halo-beam {
            inset: 4px;
            background: conic-gradient(from var(--angle), #6FC9E8, #fff, #6FC9E8);
            animation: spin 4s linear infinite, audioPulse 1.2s ease-in-out infinite;
            filter: blur(16px);
        }
        .halo-ambient {
            inset: 0px;
            background: rgba(111, 201, 232, 0.4);
            animation: spin 6s linear infinite reverse, audioPulse 1.2s ease-in-out infinite 0.1s;
        }
    ` : ''}

    ${variantClass === 'v-shimmer' ? `
        .halo-beam, .halo-ambient {
            background: linear-gradient(90deg, transparent, #6FC9E8, #fff, #6FC9E8, transparent);
            background-size: 200% 100%;
            animation: shimmerMove 5s linear infinite;
            inset: -2px;
            border-radius: 40px;
        }
    ` : ''}

    ${variantClass === 'v-steady' ? `
        .halo-ambient {
            inset: -5px;
            background: linear-gradient(to right, #6FC9E8, #A5F3FC);
            animation: slowDrift 5s ease-in-out infinite;
        }
        .glow-layer {
            animation: slowDrift 8s ease-in-out infinite reverse;
        }
    ` : ''}

    ${variantClass === 'v-flowing-border' ? `
        .halo-beam {
            inset: -3px;
            background: linear-gradient(90deg, #6FC9E8, #ffffff, #6FC9E8, #ffffff, #6FC9E8);
            background-size: 300% 300%;
            filter: blur(16px);
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
    ` : ''}
    `;

    // 4. Component Template (The Final Output)
    const code = `import React from 'react';

// Wrapper component to center the input on screen
const DemoWrapper = ({ children }) => (
    <div className="demo-wrapper">
        {children}
    </div>
);

export const ${componentName} = () => {
    return (
        <DemoWrapper>
            <style>{\`
                ${CSS}
            \`}</style>
            
            <div className="input-box">
                <div className="halo-wrapper">
                    <div className="halo-beam" />
                    <div className="halo-ambient" />
                    <div className="glow-layer" />
                </div>
                
                ${leftIconType ? `
                <div className="input-icon-left">
                    <div style={{ color: '#9CA3AF', display: 'flex' }} dangerouslySetInnerHTML={{ __html: \`${ICONS[leftIconType]}\` }} />
                </div>` : ''}

                <input 
                    type="text" 
                    className="input-field" 
                    placeholder="${defaultText}" 
                    readOnly
                />

                <button className="action-button">
                    <div style={{ display: 'flex' }} dangerouslySetInnerHTML={{ __html: \`${isExitMode ? ICONS.exit : ICONS.paperPlane}\` }} />
                </button>
            </div>
        </DemoWrapper>
    );
};

export default ${componentName};
`;
    return { code, filename: `${componentName}.jsx` };
};

const HaloVariant = ({ title, stateName, variantClass, showTitle = true, placeholder = "Ask Owting AI...", isExitMode = false, techDetails, leftIcon }) => {

    // Determine the icon type for the generator
    const getLeftIconType = () => {
        if (title.toLowerCase().includes('audio')) return 'microphone';
        return null;
    };

    const handleDownload = () => {
        const { code, filename } = GENERATE_REACT_COMPONENT(
            `${title}`,
            variantClass,
            placeholder,
            getLeftIconType(),
            isExitMode
        );

        const blob = new Blob([code], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className={`lab-item ${variantClass}`}>
            {showTitle && (
                <div className="lab-header-row" style={{ gap: '16px' }}>
                    <h3 className="lab-title">{title}</h3>

                    <button
                        className="variant-download-btn"
                        onClick={handleDownload}
                        title="Download Source Code"
                    >
                        <FileCode size={16} weight="duotone" />
                        <span>Source</span>
                    </button>

                    <button
                        className="variant-download-btn"
                        onClick={handleDownload}
                        title="Download Source Code"
                        style={{ marginLeft: '-8px' }}
                    >
                        <DownloadSimple size={16} weight="bold" />
                    </button>
                </div>
            )}

            <div className="lab-wrapper">
                <div className={`input-box ai-mode`}>
                    <div className="unified-halo-wrapper">
                        <div className="halo-beam" />
                        <div className="halo-ambient" />
                        <div className="glow-layer" />
                    </div>
                    {leftIcon && <div className="input-icon-left" style={{ display: 'flex', alignItems: 'center', color: '#1B1A57' }}>{leftIcon}</div>}
                    <input
                        type="text"
                        className="input-field"
                        placeholder={placeholder}
                        readOnly
                    />
                </div>
                <div className={`owting-button active ${isExitMode ? 'exit-mode' : ''}`}>
                    {isExitMode ? (
                        <X size={24} color="#151E52" weight="bold" />
                    ) : (
                        <PaperPlaneRight size={20} color="white" weight="fill" />
                    )}
                </div>

                {/* Tech Details Tooltip Overlay */}
                {(techDetails || stateName) && (
                    <div className="tech-tooltip">
                        <h4>{stateName || "Animation Physics"}</h4>
                        <p>{techDetails}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

const ControlsPanel = ({ speed, setSpeed, blur, setBlur, text, setText }) => {
    return (
        <div className="controls-panel">
            <div className="control-group">
                <label className="control-label">Live Preview Text</label>
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="text-preview-input"
                    placeholder="Type to change preview..."
                />
            </div>

            <div className="control-group">
                <label className="control-label">Cycle Speed ({speed}s)</label>
                <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.5"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="slack-range"
                />
            </div>

            <div className="control-group">
                <label className="control-label">Glow Blur ({blur}px)</label>
                <input
                    type="range"
                    min="1"
                    max="20"
                    step="1"
                    value={blur}
                    onChange={(e) => setBlur(Number(e.target.value))}
                    className="slack-range"
                />
            </div>
        </div>
    );
};

const Handoff = () => {
    const [speed, setSpeed] = useState(4);
    const [blur, setBlur] = useState(16);
    const [text, setText] = useState("Ask Owting AI...");
    const [colorTheme, setColorTheme] = useState('owting');

    // CSS Variables for dynamic control
    const dynamicStyles = {
        '--halo-speed': `${speed}s`,
        '--halo-blur': `${blur}px`,
        // We'll handle colors via data-theme attribute or className on the wrapper
    };

    React.useEffect(() => {
        document.body.classList.add('lab-active');
        return () => document.body.classList.remove('lab-active');
    }, []);

    return (
        <div className="handoff-container">
            <div className="handoff-content">
                <header className="lab-header">
                    <h1>Handoff & Documentation</h1>
                    <p>Interaction explorations for the <strong>Owting AI Creator</strong>.</p>
                </header>

                <div className="content-scroll-area">
                    <section className="doc-section">
                        <div className="section-title">Anatomy & Terminology (Figma)</div>
                        <div className="doc-body-text">
                            To reproduce this "Liquid Light" effect in Figma, we stack 3 distinct layers giving the illusion of volume.
                        </div>
                        <div className="anatomy-grid">
                            <div className="anatomy-cell">
                                <span className="cell-label">Layer 1 (Beam)</span>
                                <span className="cell-value">Top layer. <strong>Angular Gradient</strong> (CSS: `conic-gradient`). 100% Opacity. 0px Blur. This is the "Hard Edge".</span>
                            </div>
                            <div className="anatomy-cell">
                                <span className="cell-label">Layer 2 (Ambient)</span>
                                <span className="cell-value">Middle layer. Angular Gradient. 40% Opacity. 10-20px Blur. Creates the "Body".</span>
                            </div>
                            <div className="anatomy-cell">
                                <span className="cell-label">Layer 3 (Glow)</span>
                                <span className="cell-value">Bottom layer. Solid Color. 10% Opacity. 40px+ Blur. Creates the "Atmosphere".</span>
                            </div>
                        </div>
                    </section>

                    <section className="doc-section">
                        <div className="section-title">Specs</div>
                        <div className="specs-stack">
                            <div className="spec-line-detailed">
                                <span className="sp-label">Trigger:</span>
                                <span className="sp-desc"><strong>On Focus</strong>. Fade-in triggered via CSS visibility transition.</span>
                            </div>
                            <div className="spec-line-detailed">
                                <span className="sp-label">Animation:</span>
                                <span className="sp-desc"><code>300ms ease-in-out</code> Opacity & Scale transforms.</span>
                            </div>
                            <div className="spec-line-detailed">
                                <span className="sp-label">Rendering:</span>
                                <span className="sp-desc">GPU-Accelerated <code>translateZ(0)</code> layer at 60fps.</span>
                            </div>
                            <div className="spec-line-detailed">
                                <span className="sp-label">Masking:</span>
                                <span className="sp-desc">Precision <code>mask-image</code> pathing for light flow.</span>
                            </div>
                            <div className="spec-line-detailed">
                                <span className="sp-label">Blending:</span>
                                <span className="sp-desc"><code>screen</code> blend mode for additive chromatic glow.</span>
                            </div>
                            <div className="spec-line-detailed">
                                <span className="sp-label">Framework:</span>
                                <span className="sp-desc">Built using <strong>React Native</strong> for native mobile performance.</span>
                            </div>
                        </div>
                    </section>

                    <div className="controls-section" style={dynamicStyles}>
                        <div className="section-title">Final Implementation & Controls</div>
                        <div className="editor-group-card">
                            <ControlsPanel
                                speed={speed} setSpeed={setSpeed}
                                blur={blur} setBlur={setBlur}
                                text={text} setText={setText}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="handoff-preview-area">
                <div className="handoff-canvas" style={dynamicStyles} data-theme="owting">
                    <HaloVariant
                        title="1. Aura"
                        variantClass="v-flowing-border"
                        placeholder={text === "Ask Owting AI..." ? "Press X to exit AI planner" : text}
                        isExitMode={true}
                        techDetails="ORGANIC FLUIDITY. Masked Conic Rotation. The gradient spins behind a mask."
                    />
                    <HaloVariant
                        title="2. Halo"
                        variantClass="v-original"
                        placeholder={text}
                        techDetails="Mechanical Rotation. Uses 'spin' keyframe on a Conic Gradient."
                    />
                    <HaloVariant
                        title="3. Pulsing"
                        variantClass="v-pulse"
                        placeholder={text}
                        techDetails="Scale & Opacity Pulse. Global `transform: scale(1.1)` triggers on loop."
                    />
                    <HaloVariant
                        title="4. Audio"
                        variantClass="v-orbs"
                        placeholder={text}
                        leftIcon={<Microphone size={20} color="#9CA3AF" weight="bold" />} // Grey color similar to text
                        techDetails="Rapid Frequency Oscillation. Mimics audio waveform reaction."
                    />
                    <HaloVariant
                        title="5. Shimmer"
                        variantClass="v-shimmer"
                        placeholder="Creating your event..."
                        techDetails="Linear Translation. `background-position` moves left-to-right."
                    />
                    <HaloVariant
                        title="6. Breathing"
                        variantClass="v-steady"
                        placeholder={text}
                        techDetails="Vertical Drift. `translateY` animation with slow blur."
                    />
                </div>
            </div>
        </div>
    );
};

export default Handoff;
