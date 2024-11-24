import { Routes, Route } from 'react-router-dom';
import { UserForm } from '../components/UserForm';
import { UserList } from '../components/UserList';
import { UserDelete } from '../utils/UserDelete';
import { UserDetails } from '../utils/UserDetails';
import { UserEdit } from '../utils/UserEdit';
import { UserProvider } from '../context/userContext';

const APIWeb = () => {

    return (
        <>
            <UserProvider>
                <Routes>
                    <Route path='/' element={<UserList />} />
                    <Route path='/users/:id' element={<UserDetails />} />
                    <Route path='/create' element={<UserForm />} />
                    <Route path='/edit/:id' element={<UserEdit />} />
                    <Route path="/delete/:id" element={<UserDelete />} />
                </Routes>
            </UserProvider>
        </>
    );
};

export default APIWeb;