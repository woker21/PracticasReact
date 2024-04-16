import { useState, useEffect } from 'react';
import scenes from '../assets/data/scenes';
import { Scene, Txt, Door } from '../styles/historia';

const Historia = () => {

    const getSceneByName = name => scenes.find(obj => obj.title == name)
    const [currentScene, setCurrentScene] = useState(getSceneByName('espacio'));
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    const calculateSceneDimensions = () => {
        const w = window.innerWidth;
        const h = window.innerHeight;
        const a = 16;
        const b = 9;
        const proportion = a / b;
        const proportion2 = w / h;

        if (proportion > proportion2) {
            setWidth(w);
            setHeight(w * b / a);
        } else {
            setHeight(h);
            setWidth(h * a / b);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', calculateSceneDimensions);
        calculateSceneDimensions();
    }, []);

    return (

        <Scene back={currentScene.back} width={width} height={height}>
            
            <Txt>{currentScene.title}</Txt>
            <Txt>{currentScene.txt}</Txt>
            {
                currentScene.doors.map((door, i) => <Door key={i} data={door} onClick={() => setCurrentScene(getSceneByName(door.target))} />
                )
            }
        </Scene >
    );
};

export default Historia;