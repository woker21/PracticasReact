import { createItem, deleteItem, getItems } from "../App/services/api";
import { useEffect, useState } from 'react'

function Personas() {
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [show, setShow] = useState([])
    useEffect(() => {
        query()
    }, [])

    const query = () => {
        getItems().then(setShow)
    }

    return (
        <>
            <input type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
            <input type="password" placeholder="Password" value={userPassword} onChange={(e) => setUserPassword(e.target.value)} />

            <button onClick={async (e) => {
                e.preventDefault()
                await createItem({ userName, userPassword })
                query();
                setUserName('');
                setUserPassword('');
            }}>Save</button>

            <button onClick={async () => {
                await deleteItem(userName)
                query();
                setUserName('');
                setUserPassword('');
            }
            } >Borrar</button>
            {/* <button onClick={()=> getItems().then(setShow)}>Show</button> */}

            <ul>
                {show.map((item, i) => <li key={i}>{item.id}--{item.userName}</li>)}
                {show.map((item, i) => <li key={i}>{item.id}--{item.userPassword}</li>)}
            </ul>
            
        </>
    )
}

export default Personas