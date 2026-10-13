import { useState,useEffect,useContext, createContext } from "react";
import {useAuth} from "../AuthContext/AuthContext";
const PropertyStepFormContext = createContext(null);

const PropertyStepFormProvider = ({ children }) => {
    const [step, setStep] = useState(parseInt(localStorage.getItem("FormStep")) || 1);
    const [property, setProperty]=useState(JSON.parse(localStorage.getItem("PropertyData")) || {});
    //file object cannot be stored in local storage cause it not stringifiable
    const [imageFiles,setImageFiles]=useState([]);
    const [imageNumber,setImageNumber]=useState(0)
    const formpages=10;
    const auth=useAuth();

    const [modalOpen, setModalOpen] = useState(false);
    
    const handleModalClose = () => {
        setModalOpen(false);
    };
    const handleModalOpen = () => {
        setModalOpen(true);
    };

    // known bug: for some reason this fires after we hit the next step button 
    useEffect(() => {
        localStorage.setItem("PropertyData",JSON.stringify(property));
    }, [JSON.stringify(property)]);

    useEffect(()=>{
        localStorage.setItem("FormStep",JSON.stringify(step));
    },[step]);

   
    const dictionaryRemoveDuplicates=(newImageFiles) => {
        const reducedArray = []
        const dictionary = {}

        newImageFiles.forEach(object => {
            if(dictionary[object.name]) return
            dictionary[object.name] = true
            reducedArray.push(object)
        })

        return reducedArray
    }
    const cacheImages=(files)=>{
        let newImageFiles=imageFiles.concat(files);
        let uniqueImageFiles=dictionaryRemoveDuplicates(newImageFiles);
        setImageFiles(uniqueImageFiles);
        setImageNumber(uniqueImageFiles.length);
    };
    
    const nextStep = () => {
        if(step<formpages) setStep(step + 1);
    };
    const prevStep = () => {
        if(step>1) setStep(step - 1);
    };

    const goToStep = (newStep) => {
        if(step>0 && step <formpages ) setStep(newStep);
    };

    const clearStorage=()=>{
        setProperty({});
        setStep(1)
        localStorage.removeItem("FormStep");
        localStorage.removeItem("PropertyData");
    };

    const uploadImages=(propertyId)=>{
        const PropertyFormImages=new FormData();
        PropertyFormImages.append(`propertyId`,propertyId)
        imageFiles.forEach((file)=>{
            PropertyFormImages.append(`files`,file);
        });
        fetch('http://localhost:3000/api/property/upload-property-images', {
                method: "POST",
                credentials: "include",
                body: PropertyFormImages,
            })
            .then(response => response.json())
            .then(res => {
                if(res.heroImageSuccess && res.imagesSuccess) {
                    nextStep();
                }
                else if(res.imagesSuccess===false) alert(res.imagesMessage)
                else if(res.heroImageSuccess===false) alert(res.hereImageMessage);
                
            })
            .catch(e => {
                console.log(e)
            })
        
    }

    const uploadData=()=>{
        
        fetch('http://localhost:3000/api/property/upload-property-data', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({"propertyData":property}),
            })
            .then(response => response.json())
            .then(res => {
                if(res?.isAuthenticated===false){
                    auth.logOut();
                }
                else if(res.success===true && imageNumber>0){
                    console.log(res.propertyId)
                    uploadImages(res.propertyId);
                }
                else if(res.success===true && imageNumber===0){
                    nextStep();
                }
                else if(res.success==false){
                    console.log(res.message);
                }
            })
            .catch(e => {
                console.log(e)
            })
    }

    const uploadProperty= ()=> {
        uploadData();
    }

    const updateProperty=()=>{
        console.log('Updating...')
        fetch('http://localhost:3000/api/property/update-property-data', {
                method: "Put",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({"propertyData":property}),
            })
            .then(response => response.json())
            .then(res => {
                if(res?.isAuthenticated===false){
                    auth.logOut();
                }
                else if(res.success===true){
                    console.log(res.message)
                    nextStep();
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
                    console.log(res.property)
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
        <PropertyStepFormContext.Provider value={{step,property,setProperty,cacheImages,imageFiles,imageNumber, nextStep, prevStep,goToStep,clearStorage,uploadProperty,updateProperty,getPropertyDetails,modalOpen,handleModalClose,handleModalOpen}}>
            {children}
        </PropertyStepFormContext.Provider>
    );

};

export default PropertyStepFormProvider;

export const UsePropertyStepForm=()=> {
    return useContext(PropertyStepFormContext);
}