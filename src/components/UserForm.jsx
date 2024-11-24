import { useState } from 'react';
import { useUserContext } from '../hooks/useUserContext';
import { useNavigate } from 'react-router-dom';
import { addUser } from '../hooks/userService';

export const UserForm = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const { users, refreshUsers } = useUserContext();

    const handleAddUser = async (e) => {
        e.preventDefault();

        if (!name.trim() || !email.trim()) {
            alert('Por favor, complete todos los campos.');
            return;
        }

        const userExist = users.find(u =>
            u.name.trim().toLowerCase() === name.trim().toLowerCase() &&
            u.email.trim().toLowerCase() === email.trim().toLowerCase()
        );

        if (userExist) {
            alert("Ya existe un usuario con ese nombre o email.");
            return;
        }

        try {
            const response = await addUser({
                name: name.trim(),
                email: email.trim().toLowerCase()
            });

            if (response.ok) {
                refreshUsers();
                alert("Usuario agregado con éxito");
                navigate("/api-web");
            } else if (response.status === 400) {
                alert("Se ha alcanzado el máximo de usuarios permitidos.");
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form id="FormUser" onSubmit={handleAddUser}>
            <h1 className="textoHead1 mb-2">Formulario</h1>

            <label className="labText" htmlFor="name">Nombre: </label>
            <input
                id="name"
                className="form-control"
                type="text"
                value={name}
                maxLength={50}
                placeholder={"example name"}
                onChange={(e) => setName(e.target.value)}
            />

            <label className="labText" htmlFor="email">Email: </label>
            <input
                id="email"
                className="form-control"
                type="text"
                value={email}
                maxLength={50}
                placeholder={"exampleemail@gmail.com"}
                onChange={(e) => setEmail(e.target.value)}
            />

            <button className="btn btn-outline-primary" type="submit">
                Agregar Usuario
            </button>
        </form>
    );
};
