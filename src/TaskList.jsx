import { useState } from 'react';

function TaskList() {
    const [tareas, setTareas] = useState([])
    const [textValue, setTextValue] = useState('')

    const handleTextChange = (event) => {
        setTextValue(event.target.value)
    }

    const setTarea = () => {
        if (textValue.trim() === '') return;
        setTareas([...tareas, textValue])
        setTextValue('')
    }

    const deleteTarea = (index) => {
        setTareas(tareas.filter((tarea, i) => i !== index))
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && textValue.trim() !== '' ) {
            setTarea()
        }
    }
    document.addEventListener('keydown', handleKeyDown);

    return (
        <>
            <div id="tareasBox">
                <h1 id="tareaHead">- Lista de Tareas -</h1>
                <div className="input-group mb-3">
                    <input type="text" value={textValue} maxLength={200} onChange={handleTextChange} className="form-control" placeholder="Ingrese una tarea" aria-label="Ingrese una Tarea" />
                        <button onClick={setTarea} className="btn btn-outline-success" type="button" id="addButton">Añadir Tarea</button>
                </div>
                <ul className="lista-tareas list-group">
                    {tareas.map((tarea, index) => (
                        <li className="lista a b list-group-item list-group-item-action" key={index}>
                            <span className='tareaText'>{tarea}</span>
                            <a onClick={() => deleteTarea(index)} type="button" className="btn btn-outline-danger"><i className='bx bxs-trash bx-md'></i></a>
                        </li>
                    ))}
                    </ul>
            </div>
        </>
    );
};

export default TaskList;