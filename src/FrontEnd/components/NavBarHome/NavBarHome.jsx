import { Link, useMatch, useResolvedPath } from "react-router"
import './NavBarHome.css'
import NotificationsComponent from "../NotificationsComponent/NotificationsComponent"
import ProfileIconComponent from "../ProfileIconComponent/ProfileIconComponent"
import PropertyStepFormProvider from "../PropertyStepFormContext/PropertyStepFormContext"
import PropertyButtonModal from "../PropertyButtonModal/PropertyButtonModal"


function NavBarHome() {

        return (

                <nav className="home-nav">
                    <Link to="/" className="site-title">
                        PropertiesB2B
                    </Link>
                    <ul>
                        <li>
                            <PropertyStepFormProvider>
                                <PropertyButtonModal mode='upload'/>
                            </PropertyStepFormProvider>
                        </li>
                        <li>
                            <NotificationsComponent/>
                        </li>
                        <CustomLink to="/home">Home</CustomLink>
                        <li>
                            <ProfileIconComponent/>
                        </li>
                    </ul>
                </nav>

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
export default NavBarHome
