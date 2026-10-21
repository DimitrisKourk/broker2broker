import { Link, useMatch, useResolvedPath } from "react-router"
import './NavBarAdmin.css'
function NavBarAdmin() {
        return (
            <div className="admin-nav-container">
                <nav className="admin-nav">
                    <ul>
                        <CustomLink to="/admin/home">Dashboard</CustomLink>
                        <CustomLink to="/admin/registration-requests">Registration Requests</CustomLink>
                    </ul>
                </nav>
            </div>
        )
    }

    function CustomLink({ to, children, ...props }) {
        const resolvedPath = useResolvedPath(to)
        const isActive = useMatch({ path: resolvedPath.pathname, end: true })

        return (
            <li className={isActive ? "active" : ""}>
                <Link to={to} {...props}>
                    {children}
                </Link>
            </li>
        )
    }
export default NavBarAdmin
