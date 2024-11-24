import { API_URL } from '../config/constants';

export const getUsers = async () => {
    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            if (response.status === 404) {
                console.error('No se encontro la lista de usuarios');
            }

            console.warn(`Error: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Hubo un error al intentar conseguir la lista de usuarios", error);
        return null;
    }
};

export const getUser = async (id) => {
  try {
    const response = await fetch(`${API_URL}/${id}`);

    if (!response.ok) {
      if (response.status === 404) {
            console.error(`El usuario con ID: ${id} no fue encontrado`);
            return null;
      }

        console.warn(`Error: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Hubo un error al intentar conseguir el usuario:", error);
    return null;
  }
};

export const addUser = async (newUser) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            body: JSON.stringify(newUser),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            console.warn(`Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error("Hubo un error al intentar crear el usuario:", error);
        return null;
    }
};

export const deleteUser = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.error(`El usuario con ID: ${id} no fue encontrado`);
                return null;
            }

            console.warn(`Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error("Hubo un error al intentar eliminar el usuario:", error);
        return null;
    }
};

export const updateUser = async (id, updatedUser) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(updatedUser),
            headers: { 'Content-Type': 'application/json' }
        });

        if (!response.ok) {
            if (response.status === 404) {
                console.error(`El usuario con ID: ${id} no fue encontrado`);
                return null;
            }

            console.warn(`Error: ${response.status}`);
        }

        return response;
    } catch (error) {
        console.error("Hubo un error al intentar actualizar el usuario:", error);
        return null;
    }
};