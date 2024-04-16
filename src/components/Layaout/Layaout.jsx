import { Link } from 'react-router-dom'

const Layout = ({ children }) => {
    return (
        <div>
            <nav>
                <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/page2">Page1</Link></li>
                        <li><Link to="/ajksdfkjhasdk">Error en la url</Link></li>
                        <li><Link to="/src/pages/Products/1">Productos</Link></li>
                </ul>
            </nav>
            <main>{children}</main>
        </div>
    )
}


export default Layout;