import { Link} from "react-router"
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
                        <PropertyStepFormProvider>
                            <PropertyButtonModal mode='upload'/>
                        </PropertyStepFormProvider>
                        <NotificationsComponent/>
                        <Link to="/home">Home</Link>  
                        <ProfileIconComponent/>
                    </ul>
                </nav>

        )
    }
export default NavBarHome
