import { Link } from "react-router";
import {useAuth} from "../../components/AuthContext/AuthContext";
import NavBarHome from "../../components/NavBarHome/NavBarHome";
import "./Home.css";

const AccountStatusBanner = ({role})=>{
    if(role===0){
        return (
            <div className="account-status-banner">
                Your registration is pending admin approval. You'll get full access once it's reviewed.
            </div>
        );
    }
    else if(role===-1){
        return (
            <div className="account-status-banner">
                You don't have an active subscription plan yet. Visit Pricing to pick one.
            </div>
        );
    }
    else return null;
}

const quickActions = [
    {
        to: "/my-properties",
        title: "My Properties",
        description: "View, edit, and manage your listings",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                <path d="M4 2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3 0a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zM4 5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM7.5 5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zM4.5 8a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5zm2.5.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5zm3.5-.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5z"/>
                <path d="M2 1a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1zm11 0H3v14h3v-2.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 .5.5V15h3z"/>
            </svg>
        ),
    },
    {
        to: "/my-properties/favourites",
        title: "Favourites",
        description: "Properties you've saved for later",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314"/>
            </svg>
        ),
    },
    {
        to: "/my-properties/associates-properties",
        title: "Associates' Properties",
        description: "Listings shared by your network",
        icon: (
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
            </svg>
        ),
    },
]

const Home = () => {
    const auth=useAuth()

    return (
        <>
            <NavBarHome/>
            <main className="main home-dashboard">
                <AccountStatusBanner role={auth.user?.role}/>
                <div className="home-welcome">
                    <h1>Welcome back, {auth.user?.name}</h1>
                    <p className="home-welcome-subtitle">Here's a quick way back into your account.</p>
                </div>

                <div className="home-quick-actions">
                    {quickActions.map(action => (
                        <Link to={action.to} className="home-quick-action-card" key={action.title}>
                            <div className="home-quick-action-icon">{action.icon}</div>
                            <h3>{action.title}</h3>
                            <p>{action.description}</p>
                        </Link>
                    ))}
                </div>
            </main>
        </>
    )
}
export default Home