import { BrowserRouter, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import Page2 from './pages/Page1';
import Layout from './components/Layaout/Layaout';
import Products from './pages/Products';

const Router = () => (
    <BrowserRouter>
<Layout>
        <Routes>   
            <Route path='/' element={<Home/>} />
            <Route path="/page2" element={<Page2/>} />
            <Route path='/src/pages/Products/:id' element={<Products/>}/>
            <Route path="*" element={<div>404</div> } />
        </Routes>
</Layout>
    </BrowserRouter>
);

export default Router;