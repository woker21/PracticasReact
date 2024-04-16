import espacio from '../img/espacio.jpg';
import home from '../img/home.jpg';
import monstruo from '../img/monstruo.jpg';
import nave from '../img/nave.jpg';

export default [
    {
        "title": "espacio",
        "back": espacio,
        "txt": "Una vez, hace mucho tiempo estaba yo flotando por el hiperespacio, y comencé a plantearme si irme a una misteriosa nave espacial o regresar a la confortabilidad de mi casa a jugar a videojuegos",
        "doors": [
            {
                "x": 15,
                "y": 0,
                "width": 48,
                "height": 55,
                "target": "nave"
            },
            {
                "x": 60,
                "y": 40,
                "width": 40,
                "height": 60,
                "target": "home"
            }

        ]
    },
    {
        "title": "home",
        "back": home,
        "txt": "Hogar, dulce hogar. Otro día salvaré el planeta. Hoy jugare al Tomb Raider.",
        "doors": [

        ]
    },
    {
        "title": "monstruo",
        "back": monstruo,
        "txt": "aaaaaaaaaaa",
        "doors": [
        ]
    },
    {
        "title": "nave",
        "back": nave,
        "txt": "Al llegar a la nave espacial, sentí que algo me olía a chamusquina. Podía atravesar una puerta en la que se ocultaba el jefe de la nave o refresar a la tierra",
        "doors": [
            {
                "x": 17,
                "y": 25,
                "width": 25,
                "height": 57,
                "target": "monstruo"
            },
            {
                "x": 55,
                "y": 25,
                "width": 25,
                "height": 57,
                "target": "home"
            },
        ]
    }
];