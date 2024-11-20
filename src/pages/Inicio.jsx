import { Link } from 'react-router-dom';

function Inicio() {
    const styles = {
        all: {
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center'
        },
        textH: {
            fontSize: '3rem'
        },
        textP: {
            fontSize: '2rem'
        },
    };

    return (
        <>
            <div id="inicio" style={styles.all}>
                    <h1 className="textSpan" style={styles.textH}>Valentino Pietropaolo</h1>
                    <p className="textSpan" style={styles.textP}>Proyecto Desarollo Web 3</p>

                <div className="botones">
                    <Link to="/task-list" type="button" className="btn btn-outline-primary">Lista de Tareas</Link>
                    <Link to="/api-web" type="button" className="btn btn-outline-primary">Proyecto API (MockAPI)</Link>
                </div>
            </div>
        </>
    )

}

export default Inicio;
