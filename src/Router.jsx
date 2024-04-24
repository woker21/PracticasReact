import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Page2 from './pages/Page1';
import Layout from './components/Layaout/Layaout';
import Products from './pages/Products';
import Falacias from './pages/Falacias';
import Personas from './components/Personas';
import Crud from './components/Crud';


const Router = () => (
    <BrowserRouter>
<Layout>
        <Routes>   
            <Route path='/' element={<Home/>} />
            <Route path="/page2" element={<Page2/>} />
            <Route path='/products/:id' element={<Products/>}/>
            <Route path='/falacias' element={<Falacias/>}/>
            <Route path='/personas' element={<Personas/>}/>
            <Route path='/crud' element={<Crud/>}/>
            <Route path="*" element={<div>404</div> } />
        </Routes>
</Layout>
    </BrowserRouter>
);

export default Router;