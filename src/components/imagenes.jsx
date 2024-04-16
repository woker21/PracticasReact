import img1 from '../assets/arakiri.png';
import img2 from '../assets/batman.png';
import img3 from '../assets/rocky.png';






const images = [

    {
        "title": "title 1",
        "img": img1
    },
    {
        "title": "title 2",
        "img": img2
    },
    {
        "title": "title 3",
        "img": img3
    }
]
export const Mostrar = () => {


    return (
        <>
            {images.map((obj) => (

                <div key={obj.title}>
                    {obj.title}
                    <img src={obj.img}/>
                    
                </div>
            ))}
        </>
    );
}

