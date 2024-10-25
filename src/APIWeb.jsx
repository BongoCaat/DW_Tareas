import { useState, useEffect } from "react";

function APIWeb() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);
    const [userSelect, setUserSelect] = useState(null);

    const apiUrl = "https://6718464eb910c6a6e02b84fb.mockapi.io/usuarios"

    const addUser = async () => {
        if (!name.trim() || !email.trim()) {
            alert('Por favor, complete todos los campos.');
            return;
        }
        const newUser = { name, email };

        try {
            const response = await fetch((apiUrl), {
                method: 'POST',
                body: JSON.stringify(newUser),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (response.ok) {
                const data = await response.json();
                setUsers([...users, data]);
                console.log(data);
                setName('');
                setEmail('');
            } else {
                console.log("Hubo un error al intentar agregar el usuario");
            }
        } catch (error) {
            console.log("Hubo un error en la solicitud:", error);
        }
    }

    const getUsers = async () => {
        try {
            const response = await fetch(apiUrl);
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.log("Hubo un error al intentar conseguir la lista de usuarios");
            }
        } catch (error) {
            console.log("Hubo un error en la solicitud para conseguir la lista:", error);
        }
    }

    const deleteUser = async (id) => {
        const secretKey = prompt("Ingrese la clave secreta: ");
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
        }
    }

    const updateUser = async (id) => {
        if (!userSelect) {
            console.log("No hay ningun usuario seleccionado para actualizar.");
            return;
        }

        if (!name.trim() || !email.trim()) {
            alert('Por favor, complete todos los campos.');
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
                console.log(data);
                setUserSelect(null);
                setName('');
                setEmail('');
            } else {
                console.log("Hubo un error al intentar actualizar el usuario.");
            }
        } catch (error) {
            console.log("Hubo un error en la solicitud para actualizar el usuario:", error);
        } finally {
            getUsers();
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div id="FormUser">
                <h1 className="textoHead1 mb-2">Formulario</h1>

                <label  className="labText" htmlFor="name">Nombre: </label>
                <input id="name" className="form-control" type="text" value={name} maxLength={50} placeholder={userSelect ? userSelect.name : "Nombre"} onChange={(e) => setName(e.target.value)} />

                <label  className="labText" htmlFor="email">Email: </label>
                <input id="email" className="form-control" type="email" value={email} maxLength={50} placeholder={userSelect ? userSelect.email : "correo@gmail.com"} onChange={(e) => setEmail(e.target.value)} />

                {userSelect ? (
                    <div id="selectButtons">
                        <button className="btn btn-outline-info" onClick={updateUser}>Actualizar Usuario</button>
                        <button className="btn btn-outline-danger" onClick={() => setUserSelect(null)}>Cancelar</button>
                    </div>
                ) : (
                    <button className="btn btn-outline-primary" onClick={addUser}>Agregar Usuario</button>
                )}
            </div>

            <div id="ListUsers">
                <h1 className="textoHead1 mt-4">Lista de Usuarios</h1>
                <h3><a className="name link-info link-offset-2 link-underline-opacity-25 link-underline-opacity-100-hover" href="https://6718464eb910c6a6e02b84fb.mockapi.io/usuarios" target="_blank">Base de datos</a></h3>
                {users.length === 0 ? (
                    <div style={{textAlign: 'center'}}>
                        <p style={{fontSize: '36px'}}>No hay usuarios en la lista.</p>
                        <i className="bx bx-loader bx-spin bx-rotate-180" style={{fontSize: '10rem'}} />
                    </div>
                ) : (
                    <div id="listaCont">
                        <ul className="lista-tareas list-group list-group-numbered">
                        {users.map((user) => (
                            <li className="lista a b list-group-item list-group-item-action" key={user.id}>
                                <span className="textSpan">Usuario : {user.name}</span>
                                <span className="textSpan">Email : {user.email}</span>
                                <button className="btn btn-outline-danger" onClick={() => deleteUser(user.id)}>Eliminar</button>
                                <button className="btn btn-outline-info" onClick={() => setUserSelect(user)}>Actualizar</button>
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