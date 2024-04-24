import { createItem, deleteItem, getItems, updateItem } from "../App/services/api";
import { useEffect, useState } from 'react';
import { FireCrud } from "../styles/crud";

function Crud() {
    const [id, setId] = useState('');
    const [userName, setUserName] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userDate, setUserDate] = useState('');
    const [items, setItems] = useState([]);

    useEffect(() => {
        queryItems();
    }, []);

    const queryItems = async () => {
        const items = await getItems();
        setItems(items);
    };

    const handleSave = async () => {
        if (!userName || !userPassword ||!userDate ) {
            alert('Porfavor completa los campos');
            return;
        }
        await createItem({ userName, userPassword,userDate });
        queryItems();
        clearFields();
    };

    const handleDelete = async (id) => {
        if (!window.confirm('estas seguro de eliminar este elemento?')) {
            return;
        }
        await deleteItem(id);
        queryItems();
    };

    const handleUpdate = async () => {
        if (!id || !userName || !userPassword || !userDate) {
            alert('selecciona el elemento a actualizar');
            return;
        }
        await updateItem(id, { userName, userPassword, userDate });
        queryItems();
        clearFields();
    };

    const clearFields = () => {
        setId('');
        setUserName('');
        setUserPassword('');
        setUserDate('');
    };

    const handleSelectItem = (item) => {
        setId(item.id);
        setUserName(item.userName);
        setUserPassword(item.userPassword);
        setUserDate(item.userDate)
    };

    return (
        <>
        <FireCrud>
            <input type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="password" placeholder="Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />
            <input type="date" placeholder="Name" value={userDate} onChange={(e) => setUserDate(e.target.value)} />

            <button onClick={handleSave}>Save</button>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={clearFields}>Clear</button>



            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Password</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {items.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.userName}</td>
                            <td>{item.userPassword}</td>
                            <td>{item.userDate}</td>

                            <td>
                                <button onClick={() => handleSelectItem(item)}>Edit</button>
                                <button onClick={() => handleDelete(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </FireCrud>
        </>
    );
}

export default Crud;
