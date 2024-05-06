import { useState, useEffect } from 'react';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, db, collection, doc, addDoc, getDocs } from '../App/services/firebase.js';



const Task = () => {
    const [user, setUser] = useState(null); // Estado para almacenar el usuario actual
    const [taskName, setTaskName] = useState(''); // Estado para el nombre de la tarea
    const [tasks, setTasks] = useState([]); // Estado para almacenar las tareas del usuario actual
    const [create, setCreate] = useState(false);
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const [allTask, setAllTask] = useState([]);




    useEffect(() => {
        // Listener para detectar cambios en la autenticación del usuario
        const unsubscribe = auth.onAuthStateChanged(user => {
            setUser(user); // Actualizar el estado del usuario
            if (user) {
                // Si hay un usuario autenticado, cargar sus tareas
                loadTasks(user.uid);
            } else {
                // Si no hay un usuario autenticado, reiniciar las tareas
                setTasks([]);
            }
        });
        return () => unsubscribe(); // Limpiar el listener al desmontar el componente
    }, []);



    // Función para cargar las tareas del usuario actual desde Firestore
    const loadTasks = async (userId) => {
        const tasksRef = collection(db, 'tasks'); // Referencia a la colección de tareas

        const r = await getDocs(tasksRef); // Obtener todas las tareas

        //setAllTask(querySnapshot.doc.data());

        const userTasks = []; // Lista para almacenar las tareas del usuario actual
        r.forEach(doc => {
            const task = doc.data(); // Datos de la tarea
            if (task.userId === userId) {
                userTasks.push({ id: doc.id, ...task }); // Agregar la tarea a la lista si pertenece al usuario
            }
        });
        setTasks(userTasks); // Actualizar el estado de las tareas

        setAllTask(r.docs)

    };





    // Función para crear una nueva tarea
    const createTask = async () => {
        if (!taskName.trim()) return; // Si el nombre de la tarea está vacío, salir
        const newTask = { userId: user.uid, name: taskName }; // Datos de la nueva tarea
        const docRef = await addDoc(collection(db, 'tasks'), newTask); // Añadir la tarea a Firestore
        setTasks([...tasks, { id: docRef.id, ...newTask }]); // Actualizar el estado de las tareas
        setTaskName(''); // Limpiar el nombre de la tarea
    };

    // Función para cerrar sesión
    const handleLogout = async () => {
        try {
            await signOut(auth); // Cerrar sesión con Firebase Auth
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    // Función para registrar un nuevo usuario
    const handleSignUp = async (email, password) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password); // Crear usuario con Firebase Auth
            setUser(user); // Actualizar el estado del usuario
        } catch (error) {
            console.error('Error al registrarse:', error);
        }
    };

    // Función para iniciar sesión
    const handleLogin = async () => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, pass); // Iniciar sesión con Firebase Auth
            console.log('1111111111111111', user)
            setUser(user); // Actualizar el estado del usuario
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    return (


        <div>
            {user ? (
                // Si hay un usuario autenticado, mostrar las tareas y botón de cierre de sesión
                <>
                    <h2>Bienvenido, {user?.email}</h2>
                    <h3>Mis tareas:</h3>
                    <ul>
                        {allTask.map(task => (
                            <li key={task.data().id}>{task.data().name}</li>
                        ))}
                        
                    </ul>

                    <input type="text" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    <button onClick={createTask}>Enviar mensaje</button>
                    <button onClick={handleLogout}>Cerrar sesión</button>
                </>
            ) : (
                // Si no hay un usuario autenticado, mostrar los campos de registro/inicio de sesión
                <>
                    <h2>Iniciar sesión o registrarse</h2>

                    {
                        showRegister ? <>
                            <input type="text" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Contraseña" onChange={(e) => setPass(e.target.value)} />

                            <button onClick={() => handleSignUp(email, pass)}>Enviar</button>

                        </> : <button onClick={() => { setShowRegister(true), setShowLogin(false) }}>Registrarse</button>
                    }


                    {
                        showLogin ? <>
                            <input type="text" placeholder="Correo" onChange={(e) => setEmail(e.target.value)} />
                            <input type="password" placeholder="Contraseña" onChange={(e) => setPass(e.target.value)} />
                            <button onClick={() => handleLogin(email, pass)}>Entrar</button>

                        </> : <button onClick={() => { setShowLogin(true), setShowRegister(false) }}>Iniciar sesión</button>
                    }

                </>
            )}

        </div>
    );
};

export default Task;