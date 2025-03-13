import { useState, useEffect, useCallback}  from 'react';
import { usersApi } from './api/config';

export const useUsers = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const fetchUsers = useCallback(async () => {
        setLoading(true);
        try {
            const response = await usersApi.getAllUsers();
            setUsers(response.data);
            setError(null);
        } catch (err) {
            setError('erreur blabla');
            setUsers([]);
        } finally {
            setLoading(false);
        }
    }, []);

    

const createUser = async (userData) => {
    setLoading(true);
    try {
        const response = await usersApi.createUser(userData);
        setUsers(currentUsers => [...currentUsers, response.data]);
        setError(null);
        return response.data;
    } catch (error) {
        setError(error.message);
        throw error;
    } finally {
        setLoading(false);
    }
};

const updateUser = async (id, userData) => {
    setLoading(true);
    try {
        const response = await usersApi.updateUser(id, userData);
        setUsers(currentUsers => currentUsers.map(user => user.id === id ? response.data : user));
        setError(null);
        return response.data;
    } catch (error) {
        setError(error.message);
        throw error;
    } finally {
        setLoading(false);
    }
};

const deleteUser = async (id) => {
    setLoading(true);
    try {
        await usersApi.deleteUser(id);
        setUsers(currentUsers => currentUsers.filter(user => user.id !== id));
        setError(null);
    } catch (error) {
        setError(error.message);
        throw error;
    } finally {
        setLoading(false);
    }
};

useEffect(() => {
    fetchUsers();
}, [fetchUsers]);

return {
    users,
    error,
    loading,
    createUser,
    updateUser,
    deleteUser,
    fetchUsers

};



};