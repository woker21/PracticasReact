import { useState, useEffect } from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { Chats } from '../styles/chat';


const Chat = () => {
    const [user, setUser] = useState(null);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [showRegister, setShowRegister] = useState(false);
    const [showLogin, setShowLogin] = useState(false);


    
    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
            if (user) {
                loadMessages(user.uid);
            } else {
                setMessages([]);
            }
        });
        return () => unsubscribe();
    }, []);

    const loadMessages = async () => {
        const db = getFirestore();
        const messagesRef = collection(db, 'messages');
        const q = query(messagesRef, orderBy('timestamp'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newMessages = [];
            querySnapshot.forEach((doc) => {
                newMessages.push({ id: doc.id, ...doc.data() });
            });
            setMessages(newMessages);
        });

        return unsubscribe;
    };

    const sendMessage = async () => {
        if (!message.trim()) return;
        const db = getFirestore();
        const newMessage = { userId: user.uid, username: user.displayName, text: message, timestamp: new Date() };
        await addDoc(collection(db, 'messages'), newMessage);
        setMessage('');
    };

    const handleLogout = async () => {
        const auth = getAuth();
        try {
            await signOut(auth);
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    const handleSignUp = async () => {
        const auth = getAuth();
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, pass);
            setUser(user);
        } catch (error) {
            console.error('Error al registrarse:', error);
        }
    };

    const handleLoginWithEmail = async () => {
        const auth = getAuth();
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, pass);
            setUser(user);
        } catch (error) {
            console.error('Error al iniciar sesión:', error);
        }
    };

    const handleLoginWithGoogle = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();
        try {
            const { user } = await signInWithPopup(auth, provider);
            setUser(user);
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error);
        }
    };

    return (
        <div>
            <Chats>
                {user ? (
                    <>
                        <h2>Bienvenido, <br /> {user?.displayName}</h2>
                        <h3>Chat:</h3>
                        <ul>
                            {messages.map((msg) => (
                                <li key={msg.id} style={{ textAlign: msg.userId === user?.uid ? 'right' : 'left'}}>
                                    <span style={{ backgroundColor: msg.userId === user?.uid ? 'red' : 'blue'}}>{msg.username} </span>
                                    <br />
                                    <br />
                                    
                                    {msg.text}
                                </li>
                            ))}
                        </ul>

                        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
                        <button onClick={sendMessage}>Enviar</button>
                        <button onClick={handleLogout}>Cerrar sesión</button>
                    </>
                ) : (
                    <>
                        <h2>Iniciar sesión o registrarse</h2>
                        {showRegister ? (
                            <>
                                <input type="text" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} />
                                <button onClick={handleSignUp}>Registrarse</button>
                            </>
                        ) : (
                            <button onClick={() => { setShowRegister(true); setShowLogin(false); }}>Registrarse</button>
                        )}
                        {showLogin ? (
                            <>
                                <input type="text" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} />
                                <input type="password" placeholder="Contraseña" value={pass} onChange={(e) => setPass(e.target.value)} />
                                <button onClick={handleLoginWithEmail}>Iniciar sesión con Email</button>
                                <button onClick={handleLoginWithGoogle}>Iniciar sesión con Google</button>
                            </>
                        ) : (
                            <button onClick={() => { setShowLogin(true); setShowRegister(false); }}>Iniciar sesión</button>
                        )}
                    </>
                )}
            </Chats>
        </div>
    );
}

export default Chat;
