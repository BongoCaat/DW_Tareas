import { Link } from 'react-router-dom';
import { API_URL } from '../config/constants';
import { useUserContext } from '../hooks/useUserContext';

export const UserList = () => {
    const { users, loading } = useUserContext();

    return (
        <div id="ListUsers">
            <h1 className="textoHead1 mt-4">Lista de Usuarios</h1>
            <h3>
                <a
                    className="name link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    href={API_URL}
                    target="_blank"
                >
                    Base de datos
                </a>
            </h3>
            <Link to="/api-web/create" className="btn btn-outline-success">Crear Usuario</Link>
            {loading ? (
                <div style={{ textAlign: 'center', margin: '.6rem' }}>
                    <i className="bx bx-loader bx-spin bx-rotate-180" style={{ fontSize: '10rem' }} />
                </div>
            ) : users.length === 0 ? (
                <div style={{ textAlign: 'center', margin: '.6rem' }}>
                    <p style={{ fontSize: '36px' }}>No hay usuarios en la lista.</p>
                </div>
            ) : (
                <div id="listaCont">
                    <ul className="lista-tareas list-group list-group-numbered">
                        {users.map((user) => (
                            <li className="lista a b list-group-item list-group-item-action" key={user.id}>
                                <span className="textSpan">Usuario : {user.name}</span>
                                <span className="textSpan">Email : {user.email}</span>
                                <div className="botones">
                                    <Link to={`/api-web/users/${user.id}`} className='btn btn-outline-info'>Ver Usuario</Link>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};
