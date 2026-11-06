import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/space-grotesk';
import './styles/tokens.css';
import './styles/global.css';
import { PreferencesProvider } from './app/Preferences';
import { App } from './app/App';
createRoot(document.getElementById('root')!).render(<StrictMode><PreferencesProvider><App/></PreferencesProvider></StrictMode>);
