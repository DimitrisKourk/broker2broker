import { useState,useContext, createContext } from "react";
import {useAuth} from "../../components/AuthContext/AuthContext";
const PropertyCardGridContext = createContext(null);

const PropertyCardGridProvider = ({ children }) => {
    const [propertiesList, setPropertiesList]=useState([]);
    //const [pageNumber,setPageNumber]=useState(1)//use later for pagination
    const auth=useAuth();

    const getProperties=()=>{
        fetch('http://localhost:3000/api/property/get-user-properties', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            })
            .then(response => response.json())
            .then(res => {
                if(res?.isAuthenticated===false){
                    auth.logOut();
                }
                else if(res.success===true){                    
                    setPropertiesList(res.properties);
                }
                else console.log("something is wrong")
            })
            .catch(e => {
                console.log(e)
            })
    };
    
   /* const nextPage = () => {
        setPageNumber(pageNumber + 1);
    };
    const prevPage = () => {
        setPageNumber(pageNumber-1);
    };*/

    return (
        <PropertyCardGridContext.Provider value={{propertiesList,getProperties}}>
            {children}
        </PropertyCardGridContext.Provider>
    );

}

export default PropertyCardGridProvider;

export const UsePropertyCardGrid=()=> {
    return useContext(PropertyCardGridContext);
}