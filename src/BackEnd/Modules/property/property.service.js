import * as propertyRepository from './property.repository.js';

const createProperty= async (payload)=>{
    return await propertyRepository.createProperty(payload.database,payload.propertyData,payload.userId);
}

const createPropertyImageReferences= async (payload)=>{
    let imageReferences= await propertyRepository.createPropertyImageReferences(payload.database,payload.propertyImageData,payload.propertyId);
    let heroImage = await propertyRepository.createPropertyHeroImageReference(payload.database,payload.propertyImageData[0],payload.propertyId);
    let result={...imageReferences,...heroImage};

    return result;
}

const getPropertyDetails=async(payload)=>{
        
    let result = await propertyRepository.getPropertyDetails(payload.database,payload.propertyId,payload.requestorId);
        
    //when the requestor is the original property uploader give all data
    if(result.success===false){
        return result;
    }
    if( result.property.user_id===payload.requestorId){
        return result;
    }

    // if user is not the original property uploader show limited view of the property data
    //Hide Sensitive Data
    delete result.property.visibility;
    delete result.property.property_owner_name;
    delete result.property.property_owner_phone;
    delete result.property.property_address;
    return result;
        
}

const getUserProperties=async(payload)=>{
    return await propertyRepository.getUserProperties(payload.database,payload.requestorId);
}
const getUserProfileProperties=async(payload)=>{
    return await propertyRepository.getUserProfileProperties(payload.database,payload.userId,payload.association);
}

const getFavouriteStatus=async(payload)=>{
    return await propertyRepository.getFavouriteStatus(payload.database,payload.propertyId,payload.userId);
}

const getAssociatesProperties=async(payload)=>{
    return await propertyRepository.getAssociatesProperties(payload.database,payload.requestorId);
}
const getPropertyImages=async(payload)=>{
    return await propertyRepository.getPropertyImages(payload.database,payload.propertyId,payload.requestorId);
}

const updateProperty= async (payload)=>{
    return await propertyRepository.updateProperty(payload.database,payload.propertyData,payload.userId);
}

const addFavourite= async (payload)=>{
    return await propertyRepository.addFavourite(payload.database,payload.propertyId,payload.userId);
}
const removeFavourite= async (payload)=>{
    return await propertyRepository.removeFavourite(payload.database,payload.propertyId,payload.userId);
}

const getFavouriteProperties=async(payload)=>{
    return await propertyRepository.getFavouriteProperties(payload.database,payload.userId);
}

const getPropertiesCount=async(payload)=>{
    return await propertyRepository.getPropertiesCount(payload.database,payload.userId);
}
export {createProperty,createPropertyImageReferences,getPropertyDetails,getUserProperties,getPropertyImages,updateProperty,getAssociatesProperties,getFavouriteStatus,addFavourite,removeFavourite,getFavouriteProperties,getPropertiesCount,getUserProfileProperties}