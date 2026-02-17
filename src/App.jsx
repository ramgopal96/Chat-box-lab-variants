import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
    Calendar,
    Clock,
    MapPin,
    Plus,
    X,
    Send,
    Search,
    Check
} from 'lucide-react';
import AuraInput from './AuraInput';

const App = () => {
    // State
    const [aiMode, setAiMode] = useState(false);
    const [selectionMode, setSelectionMode] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [activeSheet, setActiveSheet] = useState(null); // 'location', 'time', 'activity'

    const [wizardSteps, setWizardSteps] = useState({
        location: { completed: false, value: '' },
        time: { completed: false, value: '' },
        activity: { completed: false, value: '' }
    });

    // Temporary selection state for modals
    const [selectionValues, setSelectionValues] = useState({
        location: 'Macarthur Park',
        time: 'Aug 14, 8:00 PM',
        activity: 'Hiking'
    });

    const chatBodyRef = useRef(null);
    const aiOverlayRef = useRef(null);
    const inputRef = useRef(null);

    // Auto-scroll
    useEffect(() => {
        if (chatBodyRef.current) {
            chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
        }
    }, [aiMode]);


    // Handlers
    const toggleSelectionMenu = () => {
        if (aiMode) {
            closeAll();
        } else {
            setSelectionMode(!selectionMode);
        }
    };

    const enterPlanningMode = () => {
        setSelectionMode(false);
        setAiMode(true);
        setInputValue('');
    };

    const closeAll = () => {
        setAiMode(false);
        setSelectionMode(false);
        setInputValue('');
        setShowResults(false);
        setIsGenerating(false);
        setActiveSheet(null);
        setWizardSteps({
            location: { completed: false, value: '' },
            time: { completed: false, value: '' },
            activity: { completed: false, value: '' }
        });
    };

    const startGenerating = () => {
        setIsGenerating(true);
        setInputValue('');

        setTimeout(() => {
            setIsGenerating(false);
            setShowResults(true);
        }, 2000);
    };

    const handleSendMessage = () => {
        if (!inputValue.trim()) return;
        startGenerating();
    };

    const markStepLink = (type, value) => {
        setWizardSteps(prev => ({
            ...prev,
            [type]: { completed: true, value }
        }));
        setActiveSheet(null);
    };

    // Check if wizard is done
    useEffect(() => {
        if (wizardSteps.location.completed && wizardSteps.time.completed && wizardSteps.activity.completed && !showResults && !isGenerating) {
            startGenerating();
        }
    }, [wizardSteps, showResults, isGenerating]);

    const hasText = inputValue.trim().length > 0;

    return (
        <div className="iphone-container">
            {/* Status Bar */}
            <div className="status-bar">
                <div className="time">10:02</div>
                <div className="status-icons">
                    <svg width="20" height="13" viewBox="0 0 20 13" fill="none">
                        <rect x="0.5" y="6" width="3.5" height="6.5" rx="1" fill="#151E52" />
                        <rect x="5.5" y="4.5" width="3.5" height="8" rx="1" fill="#151E52" />
                        <rect x="10.5" y="2.5" width="3.5" height="10" rx="1" fill="#151E52" />
                        <rect x="15.5" y="0.5" width="3.5" height="12" rx="1" fill="#151E52" opacity="0.3" />
                    </svg>
                    <img src="/assets/full_screen/065de82c6da05bd7303c7597f3fb6e4051d4d8d1.svg" className="status-icon" alt="Wifi" />
                    <svg width="28" height="13" viewBox="0 0 28 13" fill="none">
                        <rect x="0.5" y="0.5" width="23.5" height="11" rx="2.5" stroke="#151E52" strokeOpacity="0.35" />
                        <path d="M26 4L26 8.5" stroke="#151E52" strokeOpacity="0.35" strokeLinecap="round" />
                        <rect x="2.5" y="2.5" width="19.5" height="7" rx="1" fill="#151E52" />
                    </svg>
                </div>
            </div>

            {/* Header */}
            <header className="header">
                <div className="header-left">
                    <div className="header-icon-wrapper back-button">
                        <img src="/assets/figma_header/1d88aa07410bc23c859aa4d918e5a4875205fe55.svg" alt="Back" className="back-icon" />
                    </div>
                    <div className="profile-section">
                        <div className="avatar-container">
                            <img src="/assets/figma_header/0595011a6a72034824a54b8a4d584dc0b7415d4a.png" alt="John Human" className="avatar" />
                            <div className="activity-indicator"></div>
                        </div>
                        <div className="user-info">
                            <h1 className="user-name">John Human</h1>
                            <div className="user-status">
                                Active
                                <img src="/assets/figma_header/65bb484b70db90bc2af58747997c0a4ff45023d5.svg" className="status-chevron" alt="chevron" />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-actions">
                    <div className="header-icon-wrapper">
                        <img src="/assets/figma_header/9434e0eb22228fdc30888a0945f85b60867a0de9.svg" alt="Schedule" className="action-icon" />
                    </div>
                    <div className="header-icon-wrapper">
                        <img src="/assets/figma_header/70b5ae22eaeeb9a273c165c8cccaaec214ffff46.svg" alt="More" className="more-icon" />
                    </div>
                </div>
            </header>

            {/* Main Chat Body */}
            <main className={`chat-body ${selectionMode || aiMode ? 'blurred' : ''}`} ref={chatBodyRef}>
                <div className="date-divider">
                    <div className="line"></div>
                    <span className="date-text">Yesterday</span>
                    <div className="line"></div>
                </div>

                <div className="message-group received-group">
                    <div className="message received">
                        sup man, you still down to hit that ridge trail this weekend?
                        <div className="message-time">10:32 PM</div>
                    </div>
                </div>

                <div className="date-divider">
                    <div className="line"></div>
                    <span className="date-text">Today</span>
                    <div className="line"></div>
                </div>

                <div className="message-group sent-group">
                    <div className="message sent">
                        Always.
                        <div className="message-time">6:30 PM</div>
                    </div>
                </div>

                <div className="message-group sent-group">
                    <div className="message sent">
                        The one that almost killed us???
                        <div className="message-time">6:30 PM</div>
                    </div>
                </div>

                <div className="message-group received-group">
                    <div className="message received">
                        Character-building trail yeah
                        <div className="message-time">6:30 PM</div>
                    </div>
                </div>
            </main>

            {/* AI OVERLAY */}
            <AnimatePresence>
                {aiMode && (
                    <motion.div
                        className="ai-overlay active"
                        ref={aiOverlayRef}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6, ease: [0.1, 0.7, 0.1, 1] }}
                    >
                        <div className="ai-divider">
                            <div className="ai-divider-logo">
                                <img src="/assets/full_screen/aa3337979e1fa838164e33d8dd7c08a9cbbf5dc6.svg" alt="Owting" />
                            </div>
                            <div className="ai-divider-content">
                                <div className="ai-divider-line"></div>
                                <div className="ai-divider-text">
                                    You’re planning an event with Owting AI<br />
                                    Only visible to you until you share
                                </div>
                                <div className="ai-divider-line"></div>
                            </div>
                        </div>

                        <div className="ai-message">
                            <div className="ai-message-avatar">
                                <img src="/assets/full_screen/46a454a14686c0d6da2856f10afde8515e6333f2.svg" className="avatar-bg" alt="bg" />
                                <img src="/assets/full_screen/bc3f4b7f6bcc3a68d977dd1e28ecf9d032afc7cc.svg" className="avatar-logo" alt="logo" />
                            </div>
                            <div className="ai-message-bubble">
                                <img src="/assets/full_screen/bc3f4b7f6bcc3a68d977dd1e28ecf9d032afc7cc.svg" className="ai-branding-logo" alt="Owting" />
                                Looks like you have something in mind — let’s shape it together ✨<br /><br />
                                Start with the basics (what, when, and where), and I’ll help fill in the rest 💭
                                <div className="ai-time">6:30 PM</div>
                            </div>
                        </div>

                        {/* Wizard Card */}
                        <div className="ai-options-card">
                            <div className={`ai-option-row ${wizardSteps.location.completed ? 'completed' : ''}`} onClick={() => setActiveSheet('location')}>
                                <div className="ai-option-label">Location</div>
                                <div className="ai-option-value">{wizardSteps.location.value}</div>
                                <div className="ai-option-icon">
                                    {wizardSteps.location.completed ? <Check size={20} color="#4CAF50" /> : <MapPin size={20} />}
                                </div>
                            </div>
                            <div className={`ai-option-row ${wizardSteps.time.completed ? 'completed' : ''}`} onClick={() => setActiveSheet('time')}>
                                <div className="ai-option-label">Time</div>
                                <div className="ai-option-value">{wizardSteps.time.value}</div>
                                <div className="ai-option-icon">
                                    {wizardSteps.time.completed ? <Check size={20} color="#4CAF50" /> : <Clock size={20} />}
                                </div>
                            </div>
                            <div className={`ai-option-row ${wizardSteps.activity.completed ? 'completed' : ''}`} onClick={() => setActiveSheet('activity')}>
                                <div className="ai-option-label">Activity</div>
                                <div className="ai-option-value">{wizardSteps.activity.value}</div>
                                <div className="ai-option-icon">
                                    {wizardSteps.activity.completed ? <Check size={20} color="#4CAF50" /> : <Plus size={20} />}
                                </div>
                            </div>
                        </div>

                        {isGenerating && (
                            <div className="generating-dots visible">
                                <div className="generating-dot"></div>
                                <div className="generating-dot"></div>
                                <div className="generating-dot"></div>
                            </div>
                        )}

                        {showResults && (
                            <>
                                <motion.div
                                    className="ai-message"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                >
                                    <div className="ai-message-avatar">
                                        <img src="/assets/full_screen/46a454a14686c0d6da2856f10afde8515e6333f2.svg" className="avatar-bg" alt="bg" />
                                        <img src="/assets/full_screen/bc3f4b7f6bcc3a68d977dd1e28ecf9d032afc7cc.svg" className="avatar-logo" alt="logo" />
                                    </div>
                                    <div className="ai-message-bubble">
                                        <img src="/assets/full_screen/bc3f4b7f6bcc3a68d977dd1e28ecf9d032afc7cc.svg" className="ai-branding-logo" alt="Owting" />
                                        Here's what I've put together for you! 🎉 Check out these Owting ideas:
                                        <div className="ai-time">6:31 PM</div>
                                    </div>
                                </motion.div>

                                <div className="ai-event-cards-wrapper visible">
                                    <div className="ai-cards-scroll">
                                        <div className="event-card selected">
                                            <div className="event-card-image">
                                                <img src="/assets/full_screen/475c2a667879fd71917ee124ea7ff0abcaa45331.png" alt="Top Golf" />
                                                <div className="event-card-date">SEP<span>19</span></div>
                                                <div className="event-card-activity-badge">⛳</div>
                                            </div>
                                            <div className="event-card-body">
                                                <div className="event-card-time">8:00PM - 2:00AM</div>
                                                <div className="event-card-title">Thursday Night Top Golf</div>
                                                <div className="event-card-tags">
                                                    <span className="event-card-tag">Physical</span>
                                                    <span className="event-card-tag">Intermediate</span>
                                                    <span className="event-card-tag">Free</span>
                                                </div>
                                                <div className="event-card-desc">We're getting a bunch of friends together to go play top golf. We can eat, drink, and chat!</div>
                                                <div className="event-card-location">
                                                    <MapPin size={14} color="#949ca8" /> Los Angeles, CA
                                                </div>
                                            </div>
                                        </div>

                                        <div className="event-card">
                                            <div className="event-card-image">
                                                <img src="/assets/full_screen/b95fd8da187bc45d6289762d6d5aab8fa6603a8d.png" alt="PCH Run" />
                                                <div className="event-card-date">AUG<span>7</span></div>
                                                <div className="event-card-activity-badge">🏃‍♂️</div>
                                            </div>
                                            <div className="event-card-body">
                                                <div className="event-card-time">6:00PM - 7:30PM</div>
                                                <div className="event-card-title">PCH Run Club🏃‍♂️🏃‍♀️</div>
                                                <div className="event-card-tags">
                                                    <span className="event-card-tag">Running</span>
                                                    <span className="event-card-tag">Beach</span>
                                                    <span className="event-card-tag">Casual</span>
                                                </div>
                                                <div className="event-card-desc">Join us for an exhilarating evening run along the beautiful Pacific Coast Highway! Whether you're a seasoned runner or just starting out...</div>
                                                <div className="event-card-location">
                                                    <MapPin size={14} color="#949ca8" /> Los Angeles, CA
                                                </div>
                                            </div>
                                        </div>

                                        <div className="event-card">
                                            <div className="event-card-image">
                                                <img src="/assets/full_screen/mountain_view.jpg" alt="Art Walk" />
                                                <div className="event-card-date">AUG<span>12</span></div>
                                                <div className="event-card-activity-badge">🎨</div>
                                            </div>
                                            <div className="event-card-body">
                                                <div className="event-card-time">7:00PM - 10:00PM</div>
                                                <div className="event-card-title">Downtown Art Walk</div>
                                                <div className="event-card-tags">
                                                    <span className="event-card-tag">Culture</span>
                                                    <span className="event-card-tag">Walking</span>
                                                    <span className="event-card-tag">Social</span>
                                                </div>
                                                <div className="event-card-desc">Explore the city's vibrant art scene with guided gallery tours and street art showcases.</div>
                                                <div className="event-card-location">
                                                    <MapPin size={14} color="#949ca8" /> Downtown LA
                                                </div>
                                            </div>
                                        </div>

                                        <div className="event-card">
                                            <div className="event-card-image">
                                                <img src="/assets/full_screen/comedy_stage_v2.jpg" alt="Comedy Night" />
                                                <div className="event-card-date">SEP<span>5</span></div>
                                                <div className="event-card-activity-badge">🎤</div>
                                            </div>
                                            <div className="event-card-body">
                                                <div className="event-card-time">9:00PM - 11:30PM</div>
                                                <div className="event-card-title">Comedy Night Live</div>
                                                <div className="event-card-tags">
                                                    <span className="event-card-tag">Fun</span>
                                                    <span className="event-card-tag">Nightlife</span>
                                                    <span className="event-card-tag">Drinks</span>
                                                </div>
                                                <div className="event-card-desc">A hysterical night featuring top local comedians. Drinks and snacks available!</div>
                                                <div className="event-card-location">
                                                    <MapPin size={14} color="#949ca8" /> Hollywood Improv
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="ai-quick-responses active">
                                    <div className="ai-quick-pill">Edit Owting</div>
                                    <div className="ai-quick-pill">Share Owting</div>
                                    <div className="ai-quick-pill">Save for Later</div>
                                    <div className="ai-quick-pill" onClick={() => setShowResults(false) || handleSendMessage()}>Generate Again</div>
                                </div>
                            </>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input Area */}
            <div className="input-area">
                <div className="input-wrapper">
                    {/* 2. Chat Input Pill */}
                    <div className={`input-box ${aiMode ? 'ai-mode' : ''}`} id="inputBox">
                        {/* Unified Halo Aura - Now strictly contained within the pill's relative space */}
                        <AnimatePresence>
                            {aiMode && (
                                <div className="unified-halo-wrapper">
                                    <div className="halo-beam" />
                                    <div className="halo-ambient" />
                                    <div className="glow-layer" />
                                </div>
                            )}
                        </AnimatePresence>

                        <div className="plus-icon-container">
                            <img src="/assets/plus-custom.svg" className="plus-icon" alt="plus" style={{ width: 12, height: 12 }} />
                        </div>
                        <input
                            ref={inputRef}
                            type="text"
                            className="input-field"
                            id="inputField"
                            placeholder={aiMode ? "Ask Owting AI..." : "Message"}
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        />
                    </div>

                    {/* 3. Global AI Action Button */}
                    <div
                        className={`owting-button ${selectionMode || aiMode ? 'active' : ''} ${hasText ? 'has-text' : ''}`}
                        onClick={toggleSelectionMenu}
                    >
                        <img src="/assets/full_screen/46a454a14686c0d6da2856f10afde8515e6333f2.svg" className="button-bg" alt="bg" />
                        <img src="/assets/full_screen/bc3f4b7f6bcc3a68d977dd1e28ecf9d032afc7cc.svg" className="button-logo" alt="logo" />

                        {/* Playground SVG Icons */}
                        <svg className="close-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"></line>
                            <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>

                        <svg className="send-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" onClick={(e) => { e.stopPropagation(); handleSendMessage(); }}>
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </div>
                </div>
            </div>

            {/* Fan Selection Menu */}
            <AnimatePresence>
                {selectionMode && (
                    <motion.div
                        className="selection-menu active"
                        style={{ bottom: '105px', right: '16px' }}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                    >
                        {[
                            { id: 'planning', label: 'Let’s get planning', icon: <img src="/assets/full_screen/bc3f4b7f6bcc3a68d977dd1e28ecf9d032afc7cc.svg" style={{ width: 24, height: 24, objectFit: 'contain' }} />, action: enterPlanningMode },
                            { id: 'surprise', label: 'Surprise Me!', icon: <img src="/assets/plus-custom.svg" style={{ width: 24, height: 24 }} />, action: closeAll },
                            { id: 'manual', label: 'Create manually', icon: <MapPin size={24} color="#151E52" />, action: closeAll }
                        ].map((item, i) => (
                            <motion.div
                                key={item.id}
                                className="selection-pill"
                                onClick={item.action}
                                variants={{
                                    hidden: { opacity: 0, y: 15, scale: 0.9, filter: 'blur(8px)' },
                                    visible: {
                                        opacity: 1,
                                        y: 0,
                                        scale: 1,
                                        filter: 'blur(0px)',
                                        transition: {
                                            type: 'spring',
                                            stiffness: 350,
                                            damping: 22,
                                            mass: 0.6,
                                            delay: i * 0.04
                                        }
                                    }
                                }}
                                whileHover={{ scale: 1.02, x: -5, transition: { duration: 0.1 } }}
                                whileTap={{ scale: 0.96 }}
                            >
                                {item.icon}
                                <span>{item.label}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Bottom Sheets */}
            <AnimatePresence>
                {activeSheet && (
                    <>
                        <motion.div
                            className="bottom-sheet-backdrop active"
                            onClick={() => setActiveSheet(null)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.35 }}
                        />
                        <motion.div
                            className="bottom-sheet active"
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            transition={{
                                duration: 0.35,
                                ease: [0.1, 0.9, 0.2, 1] // Fast start, very slow ease out
                            }}
                        >
                            <div className="bottom-sheet-handle"></div>
                            <div className="bottom-sheet-title-wrapper">
                                <div className="bottom-sheet-title">{activeSheet.charAt(0).toUpperCase() + activeSheet.slice(1)}</div>
                            </div>

                            {activeSheet === 'location' && (
                                <div className="location-sheet-content">
                                    <div className="location-search-wrapper">
                                        <Search size={16} color="#3c3c4399" />
                                        <input
                                            type="text"
                                            className="location-search-input"
                                            placeholder="Search Maps"
                                            value={selectionValues.location}
                                            onChange={(e) => setSelectionValues(prev => ({ ...prev, location: e.target.value }))}
                                        />
                                    </div>
                                    <div className="map-viewport">
                                        <img src="/assets/location_modal/map_base.png" className="map-base" alt="Map" />
                                        <div className="map-annotation-label">{selectionValues.location}</div>
                                        <div className="map-pin-icon">
                                            <img src="/assets/location_modal/pin.svg" alt="Pin" style={{ width: '100%', height: '100%' }} />
                                        </div>
                                    </div>
                                    <div className="sheet-save-container">
                                        <button className="sheet-save-button" onClick={() => markStepLink('location', selectionValues.location)}>Save</button>
                                    </div>
                                </div>
                            )}

                            {activeSheet === 'time' && (
                                <div className="time-sheet-content">
                                    <div className="calendar-card">
                                        <div className="calendar-header-nav">
                                            <ChevronLeft size={24} color="#272937" />
                                            <div className="calendar-month-year">August, 2023</div>
                                            <ChevronRight size={24} color="#272937" />
                                        </div>
                                        <div className="calendar-days-grid">
                                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <div key={d} className="calendar-weekday">{d}</div>)}
                                            {[31, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 1, 2, 3].slice(0, 35).map((day, index) => {
                                                const isOtherMonth = index === 0; // Jul 31
                                                const isToday = day === 3 && !isOtherMonth;
                                                // Strict check for "Aug X" where X is the day
                                                const currentSelection = selectionValues.time.split(',')[0].trim(); // e.g., "Aug 14"
                                                const isSelected = currentSelection === `Aug ${day}` && !isOtherMonth;

                                                return (
                                                    <div
                                                        key={`${day}-${index}`}
                                                        className={`calendar-day-cell ${isOtherMonth ? 'other-month' : ''} ${isToday ? 'today-cell' : ''} ${isSelected ? 'selected-day' : ''}`}
                                                        onClick={() => setSelectionValues(prev => ({ ...prev, time: `Aug ${day}, 8:00 PM` }))}
                                                    >
                                                        {day}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                    <div className="time-inputs-container">
                                        <div className="time-inputs-row">
                                            <div className="time-box">
                                                <input
                                                    type="text"
                                                    placeholder="Start Time*"
                                                    value={selectionValues.time.split(', ')[1] || '8:00 PM'}
                                                    onChange={(e) => setSelectionValues(prev => ({ ...prev, time: `${prev.time.split(', ')[0]}, ${e.target.value}` }))}
                                                />
                                                <Clock size={17} color="#151E52" style={{ opacity: 0.5 }} />
                                            </div>
                                            <div className="time-box">
                                                <input type="text" placeholder="End Time*" defaultValue="10:00 PM" />
                                                <Clock size={17} color="#151E52" style={{ opacity: 0.5 }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sheet-save-container">
                                        <button className="sheet-save-button" onClick={() => markStepLink('time', selectionValues.time)}>Save</button>
                                    </div>
                                </div>
                            )}

                            {activeSheet === 'activity' && (
                                <div className="activity-sheet-content">
                                    <div className="location-search-wrapper">
                                        <Search size={16} color="#3c3c4399" />
                                        <input
                                            type="text"
                                            className="activity-search-bar"
                                            placeholder="Search Activity"
                                            style={{ background: 'transparent', border: 'none', outline: 'none', flex: 1 }}
                                            value={selectionValues.activity}
                                            onChange={(e) => setSelectionValues(prev => ({ ...prev, activity: e.target.value }))}
                                        />
                                    </div>
                                    <div className="activity-scroll-area">
                                        <div className="activity-group">
                                            <div className="activity-group-title">Going out</div>
                                            <div className="activity-chips">
                                                {['🍹 Bar', '🍖 BBQ', '🍻 Brewery', '🥞 Brunch', '🎰 Casino', '💃 Clubbing'].map(a => (
                                                    <div
                                                        key={a}
                                                        className={`activity-chip ${selectionValues.activity === a ? 'selected' : ''}`}
                                                        onClick={() => setSelectionValues(prev => ({ ...prev, activity: a }))}
                                                    >
                                                        {a}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="activity-group">
                                            <div className="activity-group-title">Outdoor</div>
                                            <div className="activity-chips">
                                                {['🎒 Backpacking', '🏖️ Beach', '🥾 Hiking'].map(a => (
                                                    <div
                                                        key={a}
                                                        className={`activity-chip ${selectionValues.activity === a ? 'selected' : ''}`}
                                                        onClick={() => setSelectionValues(prev => ({ ...prev, activity: a }))}
                                                    >
                                                        {a}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="sheet-save-container">
                                        <button className="sheet-save-button" onClick={() => markStepLink('activity', selectionValues.activity)}>Save</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
            {/* Preview of AuraInput */}
            <div style={{ position: 'absolute', top: '40%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
                <AuraInput />
            </div>
        </div>
    );
};

export default App;
