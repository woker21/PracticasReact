import { useParams } from 'react-router-dom';


const Products = () => {

    const { id } = useParams();
    
    return (
        <>
        <h1>Productos</h1>
        <div>{id}</div>
        </>
    );
}



export default Products;