import { Link } from 'react-router-dom'
import { Cont, Menu } from '../../styles/menu';

const Layout = ({ children }) => {
    return (
        <div>
            <nav>
                <Menu>
                <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/page2">Page1</Link></li>
                        <li><Link to="/ajksdfkjhasdk">Error en la url</Link></li>
                        <li><Link to="/src/pages/Products/1">Productos</Link></li>
                </ul>
                </Menu>
            </nav>
            <Cont>

            <main>{children}</main>
            </Cont>
        </div>
    )
}


export default Layout;