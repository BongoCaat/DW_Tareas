import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUser } from '../hooks/userService';


export const UserDetails = () => {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);

    const fetchUser = async () => {
        try {
            setLoading(true);
            const data = await getUser(id);
            if (data) {
                setUser(data);
                setError(false);
                setLoading(false);
            } else {
                setError(true);
            }
        } catch (error) {
            console.log("Error al obtener usuario:", error);
        }
    };

    useEffect(() => {
        fetchUser();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        error ? (
            <div className="error">
                <h1 className="text-danger">Hubo un error!</h1>
                <i className='bx bxs-error' style={{ color: '#ed0505', fontSize: '48px' }}></i>
            </div>
        ) : (
            <div className="detailUser">
                <h1 className="textoHead1 mt-4">Detalles del usuario</h1>
                <div className="userInfo">
                    <h3 className="text-info">ID: {loading ? "Cargando..." : user.id}</h3>
                    <h3 className="text-info">Nombre: {loading ? "Cargando..." : user.name}</h3>
                    <h3 className="text-info">Email: {loading ? "Cargando..." : user.email}</h3>
                </div>
                {!loading && (
                    <div className='botones'>
                        <Link to={`/api-web/edit/${user.id}`} className='btn btn-outline-warning'>Editar Usuario</Link>
                        <Link to={`/api-web/delete/${user.id}`} className='btn btn-outline-danger'>Borrar Usuario</Link>
                        <Link to={"/api-web"} className='btn btn-outline-primary'>Volver a la lista</Link>
                    </div>
                )}
            </div>
        )
    );
};

