import {useUsers} from '../../hooks/useUsers';

function Users(){
    const {users, loading, error, deleteUser} = useUsers();

    if (loading) return <div>Chargement...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2>Users list</h2>

            {users.map(user => (
                <div key={user.id}>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.age}</p>
                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                </div>
            ))}
         </div>
    )
}

export default Users;