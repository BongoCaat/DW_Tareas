import { Routes, Route } from 'react-router-dom';

import Inicio from './pages/Inicio.jsx'
import TaskList from './pages/TaskList.jsx'
import APIWeb from './pages/APIWeb.jsx'

function App() {
    return (
        <>
                <main className="App">
                    <Routes>
                        <Route path="/" element={ <Inicio/> } />
                        <Route path="/task-list" element={ <TaskList /> } />
                        <Route path="/api-web/*" element={ <APIWeb /> } />
                    </Routes>
                </main>
        </>
    )
};

export default App;

