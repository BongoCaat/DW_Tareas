import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/morph/bootstrap.min.css';
import './styles.css';
import Header from './Header.jsx';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <Header />
        <App />
    </StrictMode>,
);


