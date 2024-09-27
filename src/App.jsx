import { useState } from 'react';

function App() {
    const [tareas, setTareas] = useState([])
    const [textValue, setTextValue] = useState('')

    const handleTextChange = (event) => {
        setTextValue(event.target.value)
    }

    const setTarea = () => {
        if (textValue === '') return;
        setTareas([...tareas, textValue])
        setTextValue('')
    }

    return (
        <>
            <div id="tareasBox">
                <h1 id="tareaHead">- Lista de Tareas -</h1>
                <div className="input-group mb-3">
                    <input type="text" value={textValue} onChange={handleTextChange} className="form-control" placeholder="Ingrese una tarea" aria-label="Ingrese una Tarea" />
                        <button onClick={setTarea} className="btn btn-outline-success" type="button" id="addButton">Añadir Tarea</button>
                </div>
                <ul className="list-group">
                    {tareas.map((tarea, index) => (
                        <li className="list-group-item list-group-item-action" key={index}>
                            <span className='tareasList'>{tarea}</span>
                            <button id="deleteButton" type="button" className="btn btn-outline-danger">Eliminar</button>
                        </li>
                    ))}
                    </ul>
            </div>
        </>
    );
};

export default App;
