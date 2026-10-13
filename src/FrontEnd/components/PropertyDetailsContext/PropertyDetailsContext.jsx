import { useState,useContext, createContext } from "react";
import {useAuth} from "../../components/AuthContext/AuthContext";
const PropertyDetailsContext = createContext(null);

function PropertyDetailsProvider({ children }) {

    const [property, setProperty]=useState({});
    const [propertyImages,setPropertyImages]=useState([])
    const auth=useAuth();
    const [modalOpen, setModalOpen] = useState(false);
    
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const getPropertyImages=(propertyId)=>{
        
        fetch('http://localhost:3000/api/property/get-property-images/'+propertyId, {
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
                    setPropertyImages(res.images);
                    console.log(res.images)
                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }
    const getPropertyDetails=(propertyId)=>{
        
        fetch('http://localhost:3000/api/property/get-property-details/'+propertyId, {
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
                    setProperty(res.property);
                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    return (
        <PropertyDetailsContext.Provider value={{property,propertyImages,modalOpen,handleModalClose,handleModalOpen,getPropertyDetails,getPropertyImages}}>
            {children}
        </PropertyDetailsContext.Provider>
    );
};



export default PropertyDetailsProvider;

export const UsePropertyDetails=()=> {
    return useContext(PropertyDetailsContext);
}