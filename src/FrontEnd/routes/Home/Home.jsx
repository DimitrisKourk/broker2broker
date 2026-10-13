import {useAuth} from "../../components/AuthContext/AuthContext";
import NavBarHome from "../../components/NavBarHome/NavBarHome";

const FirstPage= ({role, plan})=>{

    if(role===0){
        return (<div>request pending...</div>);
    }
    else if(role===-1){
        return (<div> purchase a subscription plan</div>);
    }
    else return null;
}


const Home = () => {
    const auth=useAuth()

    return (
        <>
            <NavBarHome/>
            <main className="main">Home Protected Route
                <div className="container">
                    <div>
                        <h1>Welcome! {auth.user?.name}</h1>
                        <h2>Authenticated: {auth.isAuthenticated}</h2>
                        <h2>Plan: {auth.subscription}</h2>
                        
                        <div>
                            <FirstPage role={auth.user?.role} plan={auth.subscription}/>
                        </div>
                    </div>
                </div>

            </main>
        </>
    )
}
export default Home