import { useState,useContext, createContext } from "react";
import { apiFetch } from "../../utils/apiClient";
const PropertyCardGridContext = createContext(null);

const PropertyCardGridProvider = ({ children }) => {
    const [propertiesList, setPropertiesList]=useState([]);
    //const [pageNumber,setPageNumber]=useState(1)//use later for pagination

    const getProperties=()=>{
        apiFetch('/api/property/get-user-properties')
            .then(res => {
                if(res.success===true){
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