import { useState, useEffect } from "react";


function APIWeb() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [users, setUsers] = useState([]);

    const addUser = async () => {
        if ((!name || !email) || (name.split(' ').join('').length === 0 || email.split(' ').join('').length === 0)) {
            alert('Por favor, complete todos los campos.');
            return;
        };
        const newUser = { name, email };

        try {
            const response = await fetch('https://6718464eb910c6a6e02b84fb.mockapi.io/usuarios', {
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
            const response = await fetch('https://6718464eb910c6a6e02b84fb.mockapi.io/usuarios');
            if (response.ok) {
                const data = await response.json();
                setUsers(data);
            } else {
                console.log("Hubo un error al intentar conseguir la lista de usuarios");
            }
        } catch (error) {
            console.log("Hubo un error en la solicitud para conseguir la lista:", error);
        }
    };

    const deleteList = async () => {
        const secretKey = prompt("Ingrese la clave secreta: ");
        if (secretKey !== process.env.SECRET_KEY) {
            alert("La clave ingresada es incorrecta (Pista: el nombre de mi gato viejo xd)");
            return;
        }

        try {
            const response = await fetch('https://6718464eb910c6a6e02b84fb.mockapi.io/usuarios', {
                method: 'DELETE',
            });
            if (response.ok) {
                setUsers([]);
            } else {
                console.log("Hubo un error al intentar borrar la lista de usuarios.")
            }
        } catch (error) {
            console.log("Hubo un error en la solicitud para borrar la lista:", error)
        }
    }

    useEffect(() => {
        getUsers();
    }, []);

    return (
        <>
            <div id="FormUser">
                <h1>Agregar Usuario</h1>

                <label htmlFor="name">Nombre: </label>
                <input id="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="email">Email: </label>
                <input id="email" type="text" value={email} onChange={(e) => setEmail(e.target.value)} />

                <button onClick={addUser}>Agregar Usuario</button>
            </div>

            <div id="ListUsers">
                <h1>Lista de Usuarios</h1>
                <h3>Base de usuarios : <a>https://6718464eb910c6a6e02b84fb.mockapi.io/usuarios</a></h3>
                {users.length === 0 ? (
                    <p>No hay usuarios en la lista.</p>
                ) : (
                    <div>
                        <ul>
                        {users.map((user, index) => (
                            <li key={index}> Usuario : {user.name} - Email: {user.email} </li>
                        ))};
                        </ul>
                        <button id="deleteList" onClick={deleteList}>Borrar la lista de usuarios</button>
                    </div>
                )}
            </div>
        </>
    )
};

export default APIWeb;