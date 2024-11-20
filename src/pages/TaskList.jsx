import { useState } from 'react';

function TaskList() {
    const [tareas, setTareas] = useState([]);
    const [textValue, setTextValue] = useState('');
    const [updating, setUpdating] = useState(null);

    const handleTextChange = (event) => {
        setTextValue(event.target.value);
    };

    const setTarea = () => {
        // console.log(textValue);
        if (textValue.trim() === '') return;

        if (updating !== null) {
            const updatedTareas = tareas.map((tarea, index) =>
                index === updating ? textValue : tarea
            );
            // console.log("Actualizando Tarea")
            setTareas(updatedTareas);
            setUpdating(null);
        } else {
            // console.log("Publicando Tarea");
            setTareas([...tareas, textValue]);
        }

        setTextValue('');
    };

    const updateTarea = (tarea, index) => {
        setUpdating(index);
        setTextValue(tarea);
    };

    const cancelUpdate = () => {
        setUpdating(null);
        setTextValue('');
    }

    const deleteTarea = (index) => {
        setTareas(tareas.filter((tarea, i) => i !== index));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && textValue.trim() !== '') {
            setTarea();
        }
    };

    return (
        <>
            <div id="tareasBox">
                <h1 id="tareaHead">- Lista de Tareas -</h1>
                <div className="input-group mb-3">
                    <input type="text" value={textValue} maxLength={200} onChange={handleTextChange} onKeyDown={handleKeyDown} className="form-control" placeholder={updating !== null ? "Actualice la Tarea" : "Ingrese una tarea"} aria-label="Actualice o Ingrese una Tarea" />
                    <div style={{ display: 'flex', flexFlow: 'column wrap' }}>
                        <button onClick={setTarea} className="btn btn-outline-success buttonTarea" type="button">
                            {updating !== null ? "Actualizar" : "Añadir Tarea"}
                        </button>
                        {updating !== null && (
                            <button onClick={cancelUpdate} className="btn btn-outline-warning buttonTarea" type="button">
                                Cancelar
                            </button>
                        )}
                    </div>
                </div>
                <ul className="lista-tareas list-group">
                    {tareas.map((tarea, index) => (
                        <li className="lista a b list-group-item list-group-item-action" key={index}>
                            <span className='tareaText'>{tarea}</span>
                            <div className="botones">
                                <a onClick={() => updateTarea(tarea, index)} type="button" className="btn btn-outline-success">
                                    <i className='bx bxs-comment-edit'></i>
                                </a>
                                <a onClick={() => deleteTarea(index)} type="button" className="btn btn-outline-danger">
                                    <i className='bx bxs-trash'></i>
                                </a>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default TaskList;