import { Link, useMatch, useResolvedPath } from "react-router"
import './NavBarProperties.css'
import { useAuth } from "../AuthContext/AuthContext"
import ProfilePicture from "../ProfilePicture/ProfilePicture";


function NavBarProperties() {
        const auth=useAuth();
        const profileImage=import.meta.env.VITE_PROFILE_IMAGE_API_URL;
        return (
            <div className="properties-nav-container">
                <nav className="properties-nav">
                    <ProfilePicture userId={auth.user.user_id}/>
                    <ul>
                        <CustomLink to="/my-properties">My Properties</CustomLink>  
                        <CustomLink to="/my-properties/associates-properties">Associates' Properties</CustomLink>  
                        <CustomLink to="/my-properties/favourites">Favourites</CustomLink>  
                        <CustomLink to="/my-properties/property-alert">Property Alert</CustomLink>  
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
export default NavBarProperties
