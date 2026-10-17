import { useState,useContext, createContext } from "react";
import { apiFetch } from "../../utils/apiClient";
const PropertyDetailsContext = createContext(null);

function PropertyDetailsProvider({ children }) {

    const [property, setProperty]=useState({});
    const [propertyImages,setPropertyImages]=useState([])
    const [modalOpen, setModalOpen] = useState(false);

    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleModalOpen = () => {
        setModalOpen(true);
    };

    const getPropertyImages=(propertyId)=>{
        apiFetch('/api/property/get-property-images/'+propertyId)
            .then(res => {
                if(res.success===true){
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
        apiFetch('/api/property/get-property-details/'+propertyId)
            .then(res => {
                if(res.success===true){
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