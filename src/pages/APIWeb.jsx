// TODO : Mover funciones a otros archivos.

import { useState, useEffect } from "react";

const APIWeb = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [userSelect, setUserSelect] = useState(null);

    const apiUrl = "https://6718464eb910c6a6e02b84fb.mockapi.io/usuarios";

    const getUsers = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.log("Hubo un error en la solicitud para conseguir la lista:", error);
        };
    };

    const handleAddUser = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        if (userSelect) {
            // console.log("Evitando duplicar el usuario.")
            return;
        }

        const userExist = users.find(user => user.name.trim() === name.trim() && user.email.trim() === email.trim());
        if (userExist) {
            alert(`El usuario "${name.trim()}" con email "${email.trim()}" ya existe en la base de datos.`);
            return;
        }

        const newUser = { name, email };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json();
                setUsers([...users, data]);
                setName('');
                setEmail('');
            } else {
                if (response.status === 400) {
                    alert("Se ha alcanzado el maximo de usuarios para la base de datos, tienes que borrar otros usuarios si quieres agregar mas.")
                    return;
                } else {
                    console.log("Hubo un error al intentar agregar el usuario");
                }
            }
        } catch (error) {
            console.log("Hubo un error en la solicitud para agregar el usuario:", error);
        }
    }

    const handleDeleteUser = async (id) => {
        const secretKey = prompt("Ingrese la clave secreta: ");
        // eslint-disable-next-line no-undef
        if (secretKey !== process.env.SECRET_KEY) {
            alert("La clave ingresada es incorrecta (Pista: el nombre de mi gato viejo xd)");
            return;
        }

        try {
            const response = await fetch(`${apiUrl}/${id}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers(users.filter(user => user.id !== id));
            } else {
                console.log("Hubo un error al intentar borrar el usuario.");
            }
        } catch (error) {
            console.log("Hubo un error en la solicitud para borrar el usuario:", error);
            return;
        }
    }

    const handleSelectedUser = (user) => {
        setUserSelect(user);
        setName(user.name);
        setEmail(user.email);
    }

    const handleUpdateUser = async (id) => {
        if (!userSelect) {
            console.log("No hay ningun usuario seleccionado para actualizar.");
            return;
        }

        if (!name.trim() || !email.trim()) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const sameUser = users.find(userSelect => userSelect.name.trim() === name.trim() && userSelect.email.trim() === email.trim());
        if (sameUser) {
            alert(`El usuario "${name.trim()}" con email "${email.trim()}" sigue siendo igual al cual quieres actualizar.`);
            return;
        }

        const updatedUser = { name, email };

        try {
            const response = await fetch(`${apiUrl}/${userSelect.id}`, {
                method: 'PUT',
                body: JSON.stringify(updatedUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers(users.map((user) => (user.id === userSelect.id === id ? data : user)));
                setUserSelect(null);
                setName('');
                setEmail('');
            } else {
                if (response.status === 404) {
                    alert("El usuario fue borrado de la base de datos. Volviendo al formulario principal.");
                    setUserSelect(null);
                    setName('');
                    setEmail('');
                    return;
                } else {
                    console.log("Hubo un error al intentar actualizar el usuario.");
                }
            }
        } catch (error) {
            console.log("Hubo un error en la solicitud para actualizar el usuario:", error);
            return;
        } finally {
            getUsers();
        }
    }

    const handleCancelUpdate = () => {
        if (!userSelect) {
            console.log("No ha seleccionado ningun usuario para cancelar la actualizacion del mismo.");
            return;
        }

        if ((email.trim() || name.trim()) || (email.length > 0 || name.length > 0)) {
            setName('');
            setEmail('');
        }

        setUserSelect(null);
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <form id="FormUser" onSubmit={handleAddUser}>
                <h1 className="textoHead1 mb-2">Formulario</h1>

                <label className="labText" htmlFor="name">Nombre: </label>
                <input id="name" className="form-control" type="text" value={name} maxLength={50} placeholder={userSelect ? userSelect.name : "example name"} onChange={(e) => setName(e.target.value)} />

                <label className="labText" htmlFor="email">Email: </label>
                <input id="email" className="form-control" type="text" value={email} maxLength={50} placeholder={userSelect ? userSelect.email : "exampleemail@gmail.com"} onChange={(e) => setEmail(e.target.value)} />

                {userSelect ? (
                    <div id="selectButtons" className="botones">
                        <button className="btn btn-outline-info" onClick={() => handleUpdateUser(userSelect.id)}>Actualizar Usuario</button>
                        <button className="btn btn-outline-danger" onClick={handleCancelUpdate}>Cancelar</button>
                    </div>
                ) : (
                    <button className="btn btn-outline-primary" type="submit">Agregar Usuario</button>
                )}
            </form>

            <div id="ListUsers">
                <h1 className="textoHead1 mt-4">Lista de Usuarios</h1>
                <h3><a className="name link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover"
                    href="https://6718464eb910c6a6e02b84fb.mockapi.io/usuarios" target="_blank">Base de datos
                </a>
                </h3>
                {users.length === 0 ? (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontSize: '36px' }}>No hay usuarios en la lista.</p>
                        <i className="bx bx-loader bx-spin bx-rotate-180" style={{ fontSize: '10rem' }} />
                    </div>
                ) : (
                    <div id="listaCont">
                        <ul className="lista-tareas list-group list-group-numbered">
                            {users.map((user) => (
                                <li className="lista a b list-group-item list-group-item-action" key={user.id}>
                                    <span className="textSpan">Usuario : {user.name}</span>
                                    <span className="textSpan">Email : {user.email}</span>
                                    <div className="botones">
                                        <button className="btn btn-outline-danger" onClick={() => handleDeleteUser(user.id)}>Eliminar</button>
                                        <button className="btn btn-outline-info" onClick={() => handleSelectedUser(user)}>Actualizar</button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>
        </>
    )
};

export default APIWeb;


