import { Routes, Route } from 'react-router-dom';

import TaskList from './TaskList.jsx'
import APIWeb from './APIWeb.jsx'

function App() {
    return (
        <>
            <div className="App">
                <Routes>
                    <Route path="/" element={ <TaskList /> } />
                    <Route path="api-web" element={ <APIWeb /> } />
                </Routes>
            </div>
        </>
    )
};

export default App;

