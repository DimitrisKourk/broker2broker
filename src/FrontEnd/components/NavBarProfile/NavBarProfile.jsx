import { Link, useMatch, useResolvedPath } from "react-router"
import './NavBarProfile.css'
import { useAuth } from "../AuthContext/AuthContext"
import ProfilePicture from "../ProfilePicture/ProfilePicture";
function NavBarProfile() {
        const auth=useAuth();
        return (
            <div className="profile-nav-container">
                <nav className="profile-nav">
                    <ProfilePicture userId={auth.user.user_id}/>
                    <ul>
                        <CustomLink to={"/my-profile/"+auth.user.username}>My Profile</CustomLink>  
                        <CustomLink to={"/my-profile/"+auth.user.username+"/dashboard"}>Dashboard</CustomLink>  
                        <CustomLink to={"/my-profile/"+auth.user.username+"/associates"}>Associates</CustomLink>  
                        <CustomLink to={"/my-profile/"+auth.user.username+"/subscription"}>Subscription</CustomLink>  
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
export default NavBarProfile
