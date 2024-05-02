import {auth, signOut, GoogleAuthProvider, signInWithPopup,   db, doc, getDoc,  setDoc, updateDoc } from "../App/services/firebase.js";
import { useEffect, useState } from 'react';
import {getLibro, createLibro, deleteLibro, updateLibro} from "../App/services/libros.js"


const Libros = () => {
    const [id, setId] = useState('');
    const [libroName, setLibroName] = useState('');
    const [userDate, setUserDate] = useState('');
    const [price, setPrice] = useState('');
    const [libros, setLibros] = useState([]);
    const [selectedId, setSelectedId] = useState('');
    const [user, setUser] = useState(null);
    const [showLogin, setShowLogin] = useState(true);

    useEffect(() => {
        queryLibros();
        const unsubscribe = auth.onAuthStateChanged(async (user) => {
            setUser(user);
            setShowLogin(!user); // Si hay un usuario, ocultamos las opciones de inicio de sesión
            if (user) {
                // Verificar si el usuario ya tiene una lista de libros
                const userBooksRef = doc(db, 'users', user.uid);
                const userBooksSnapshot = await getDoc(userBooksRef);
                if (!userBooksSnapshot.exists()) {
                    // Si no tiene una lista de libros, crear una nueva
                    await setDoc(userBooksRef, { libros: [] });
                }
            }
        });
        return () => unsubscribe();
    }, []);

    const queryLibros = async () => {
        if (!user) return;
        // Obtener la lista de libros del usuario actual
        const userBooksRef = doc(db, 'users', user.uid);
        const userBooksSnapshot = await getDoc(userBooksRef);
        const userBooksData = userBooksSnapshot.data();
        if (!userBooksData) return;
        setLibros(userBooksData.libros);
    };

    const handleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleSave = async () => {
        if (!libroName || !price || !userDate) {
            alert('Por favor completa todos los campos');
            return;
        }
        if (!user) {
            alert('Debe iniciar sesión para guardar un libro');
            return;
        }
        // Obtener la referencia a la lista de libros del usuario actual
        const userBooksRef = doc(db, 'users', user.uid);
        const userBooksSnapshot = await getDoc(userBooksRef);
        const userBooksData = userBooksSnapshot.data();
        // Agregar el nuevo libro a la lista de libros del usuario
        const updatedBooks = [...userBooksData.libros, { libroName, price, userDate }];
        await updateDoc(userBooksRef, { libros: updatedBooks });
        queryLibros();
        clearFields();
    };

    const clearFields = () => {
        setId('');
        setLibroName('');
        setPrice('');
        setUserDate('');
    };

    return (
        <>
            {showLogin && (
                <>
                    <h1>Iniciar sesión</h1>
                    <button onClick={handleLogin}>Iniciar sesión con Google</button>
                </>
            )}
            {user && (
                <>
                    <h1>Libros</h1>
                    <table style={{border: "2px solid black"}}>
                        <thead  style={{border: "2px solid black"}}>
                            <tr style={{border: "2px solid black"}}>
                                <th style={{border: "2px solid black"}}>ID</th>
                                <th style={{border: "2px solid black"}}>Nombre del Libro</th>
                                <th style={{border: "2px solid black"}}>Precio</th>
                                <th style={{border: "2px solid black"}}>Fecha</th>
                                <th style={{border: "2px solid black"}}>Acciones</th>
                            </tr>
                        </thead>
                        <tbody style={{border: "2px solid black"}} >
                            <tr style={{border: "2px solid black"}}>
                                <td >{id}</td>
                                <td>
                                    <input type="text" value={libroName} onChange={(e) => setLibroName(e.target.value)} />
                                </td>
                                <td>
                                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                                </td>
                                <td>
                                    <input type="date" value={userDate} onChange={(e) => setUserDate(e.target.value)} />
                                </td>
                                <td>
                                    <button onClick={handleSave}>Guardar</button>
                                </td>
                            </tr>
                            {libros.map((item, index) => (
                                <tr key={index} style={{border: "2px solid black"}}>
                                    <td style={{border: "2px solid black"}}>{index}</td>
                                    <td style={{border: "2px solid black"}}>{item.libroName}</td>
                                    <td style={{border: "2px solid black"}}>{item.price + "$"}</td>
                                    <td style={{border: "2px solid black"}}>{item.userDate}</td>
                                    <td style={{border: "2px solid black"}}>
                                        <button style={{width: "100%"}} onClick={() => handleUpdate(item)}>Editar</button>
                                        <button style={{width: "100%"}} onClick={() => handleDelete(item.id)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </>
            )}
        </>
    );
};

export default Libros;
