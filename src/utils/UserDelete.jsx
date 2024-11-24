import { useParams, useNavigate } from 'react-router-dom';
import { deleteUser, getUser } from '../hooks/userService';
import { useUserContext } from '../hooks/useUserContext'
import { useEffect, useState } from 'react';


export const UserDelete = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [error, setError] = useState(null);
    const { refreshUsers } = useUserContext();
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

    const handleDelete = async () => {
        // const secretKey = prompt("Ingrese la clave secreta: (bartolo)");

        // // eslint-disable-next-line no-undef
        // if (secretKey !== process.env.SECRET_KEY) {
        //     alert("La clave ingresada es incorrecta.");
        //     return;
        // }

        try {
            const response = await deleteUser(user.id);

            if (response.ok) {
                refreshUsers();
                alert("Usuario eliminado con éxito")
                navigate("/api-web");
            } else if (response.status === 404) {
                alert("El usuario ya no existe en la base de datos");
                navigate("/api-web");
            } else {
                alert("Error al borrar el usuario");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al procesar la solicitud");
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
            <div className="deleteUser">
                <h1 className="textoHead1 mt-4 text-danger">¿Estás seguro de que quieres borrar este usuario?</h1>
                <h2 className="text-danger">Esta acción no se puede deshacer</h2>
                <div className="userInfo">
                    <h3 className="text-info">ID: {loading ? "Cargando..." : user.id}</h3>
                    <h3 className="text-info">Nombre: {loading ? "Cargando..." : user.name}</h3>
                    <h3 className="text-info">Email: {loading ? "Cargando..." : user.email}</h3>
                </div>
                {!loading && (
                    <div className="botones">
                        <button className="btn btn-outline-danger" onClick={handleDelete}>Si</button>
                        <button className="btn btn-outline-primary" onClick={() => navigate("/api-web")}>No</button>
                    </div>
                )}
            </div>
        )
    );
};