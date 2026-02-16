import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import Handoff from './Handoff.jsx'
import ChatVariations from './ChatVariations.jsx'
import './styles/App.css'

const Main = () => {
    const getHashView = () => {
        const hash = window.location.hash;
        if (hash === '#lab') return 'lab';
        if (hash === '#variants') return 'variants';
        return 'app';
    };

    const [view, setView] = React.useState(getHashView());

    React.useEffect(() => {
        const handleHashChange = () => {
            setView(getHashView());
        };
        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    if (view === 'lab') return <Handoff />;
    if (view === 'variants') return <ChatVariations />;
    return <App />;
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
)
