import { useState, useEffect } from 'react';
import api from "../services/api";
const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        api.get("/api/users")
            .then(data => setUsers(data))
            .catch((err) => console.log(err))
    }, []);

    if (!users.length) {
        return (
            <div>
                No users in DB ;(
            </div>
        );
    }

    return (
        <div>
            <table border='1px'>
                <caption>User Table</caption>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                        {users.map((user, key) => (
                            <tr key={key}>
                                <td>{user.first_name}</td>
                                <td>{user.last_name}</td>
                            </tr>
                        ))}
                </tbody>
            </table>
        </div>
    );
};
export default Users;