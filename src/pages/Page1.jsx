import { useState, useEffect } from 'react';

const Page2 = () => {
    const [names, setNames] = useState([]);

    useEffect(() => {
        fetch('https://rickandmortyapi.com/api/character ')
            .then(res => res.json())
            .then(res => setNames(res.results));
    }, []);


    return (
        <>
            {names.map((character) => (
                <div key={character.id}>
                    <p>{character.name}</p>
                    <img src={character.image}/>
                    <p>{character.species}</p>
                    <br />
                    <br />
                    <br />
                </div>
            ))}
        </>
    );
};

export default Page2;
