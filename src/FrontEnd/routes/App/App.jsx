import {BrowserRouter, Route, Routes, useLocation} from 'react-router';
import B2BMain from "../B2BMain/B2BMain.jsx";
import About from "../About/About.jsx";
import UserLogin from "../UserLogin/UserLogin";
import NavBarLandingPage from '../../components/NavBarLandingPage/NavBarLandingPage.jsx';
import Pricing from "../Pricing/Pricing.jsx";
import AuthProvider from "../../components/AuthContext/AuthContext";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";
import Home from "../Home/Home";
import './App.css'
import UserRegister from "../UserRegister/UserRegister";
import AdminRoute from "../../components/AdminRoute/AdminRoute";
import RegistrationRequests from "../../components/RegistrationRequests/RegistrationRequests";
import UnauthorizedArea from "../../components/UnauthorizedArea/UnauthorizedArea";
import {MyProfile,UserProfile} from '../Profile/Profile.jsx';
import Properties from "../Properties/Properties.jsx" 
import MyProperties from '../Properties/MyProperties/MyProperties.jsx';
import Associates from '../Profile/Associates/Associates.jsx';
import {ProfilePage, MyProfilePage } from '../Profile/ProfilePage/ProfilePage.jsx'
import AssociatesProperties from '../Properties/AssociatesProperties/AssociatesProperties.jsx';
import FavouriteProperties from '../Properties/FavouriteProperties/FavouriteProperties.jsx';
import { ApprovalPending, NoActivePlan, RegistrationRequestDeclined, Restricted } from '../../components/RoleBasedRoutes/RoleBasedRoutes.jsx';
import AuthPortal from '../AuthPortal/AuthPortal.jsx';

// App Component
function App() {
    return <BrowserRouter>
        <AuthProvider>
            <CustomRouter/>
        </AuthProvider>
     </BrowserRouter>;
}

export default App

function CustomRouter() {
    let location=useLocation();

    return(
        <div className='grid'>
            {(location.pathname === "/" || location.pathname === "/about" || location.pathname === "/pricing" || location.pathname === "/pricing"|| location.pathname === "/auth" || location.pathname === "/auth/login" || location.pathname === "/auth/register") &&
                <NavBarLandingPage/>}
            <Routes>
                <Route path="/" element={<B2BMain/>}/>
                <Route path="/pricing" element={<Pricing/>}/>
                <Route path="/about" element={<About/>}/>
                <Route path="/auth">
                    <Route index element={<AuthPortal/>}/>
                    <Route path="login" element={<UserLogin redirectionURL='/home'/>}/>
                    <Route path="register" element={<UserRegister/>}/>
                </Route>
                
                <Route path="/unauthorized" element={<UnauthorizedArea/>}/>
                <Route element={<NoActivePlan />}>
                        <Route path="/no-active-plan" element={<div>No ActivePlan</div>}/>
                </Route>
                <Route element={<ApprovalPending />}>
                        <Route path="/approval-pending" element={<div>Approval Pending</div>}/>
                </Route>
                <Route element={<Restricted />}>
                        <Route path="/restricted" element={<div> You are restricted</div>}/>
                </Route>
                <Route element={<RegistrationRequestDeclined />}>
                        <Route path="/registration-declined" element={<div> Your request has been declined by an administrator. Please contact us for further information</div>}/>
                </Route>

                <Route element={<PrivateRoute />}>
                    <Route path="/home" element={<Home />} />
                    <Route path="/my-properties" element={<Properties/>}>
                        <Route index element={<MyProperties/>}/>
                        <Route path="associates-properties" element={<AssociatesProperties/>}/>
                        <Route path="favourites" element={<FavouriteProperties/>}/>
                        <Route path="property-alert" element={<div>property alert</div>}/>
                    </Route>
                    
                    <Route path="/my-profile/:user" element={<MyProfile />}>
                        <Route index element={<MyProfilePage/>}/>
                        <Route path="dashboard" element={<div>Dashboard</div>}/>
                        <Route path="associates" element={<Associates/>}/>
                        <Route path="subscription" element={<div>subscription</div>}/>
                        
                    </Route> 
                    <Route path="/profile/:user" element={<UserProfile />}>
                        <Route index element={<ProfilePage/>}/>
                    </Route> 
                </Route>
                <Route element={<AdminRoute />}>
                    <Route path="/admin/home" element={<div> ADMIN HOME</div>} />
                    <Route path="/admin/registration-requests" element={<RegistrationRequests />} />
                </Route>
            </Routes>
        </div>
    )
}