import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootswatch/dist/morph/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'boxicons/css/boxicons.min.css';

import './styles/styles.css';
import Header from './components/Header.jsx';
import App from './App.jsx';
import Footer from './components/Footer.jsx';

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Header />
        <App />
        <Footer />
    </BrowserRouter>,
);


