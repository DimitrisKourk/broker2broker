import * as propertyRepository from './property.repository.js';

const createProperty= async (payload)=>{
    try {
        return await propertyRepository.createProperty(payload.database,payload.propertyData,payload.userId);
    }
    catch (e) {
        return e;
    }
}

const createPropertyImageReferences= async (payload)=>{
    try {
        let imageReferences= await propertyRepository.createPropertyImageReferences(payload.database,payload.propertyImageData,payload.propertyId);
        let heroImage = await propertyRepository.createPropertyHeroImageReference(payload.database,payload.propertyImageData[0],payload.propertyId);
        let result={...imageReferences,...heroImage};

        return result;
    }
    catch (e) {
        return e;
    }
}

const getPropertyDetails=async(payload)=>{
    try {
        
        let result = await propertyRepository.getPropertyDetails(payload.database,payload.propertyId,payload.requestorId);
        
        //when the requestor is the original property uploader give all data
        if(result.success===false){
            return result;
        }
        if( result.property.user_id===payload.requestorId){
            return result;
        }

        if( result.property.user_id!==payload.requestorId){
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
    catch (e) {
        return e;
    }
}

const getUserProperties=async(payload)=>{
    try {
        return await propertyRepository.getUserProperties(payload.database,payload.requestorId);
    }
    catch (e) {
        return e;
    }
}
const getUserProfileProperties=async(payload)=>{
    try {
        return await propertyRepository.getUserProfileProperties(payload.database,payload.userId,payload.association);
    }
    catch (e) {
        return e;
    }
}

const getFavouriteStatus=async(payload)=>{
    try {
        return await propertyRepository.getFavouriteStatus(payload.database,payload.propertyId,payload.userId);
    }
    catch (e) {
        return e;
    }
}

const getAssociatesProperties=async(payload)=>{
    try {
        return await propertyRepository.getAssociatesProperties(payload.database,payload.requestorId);
    }
    catch (e) {
        return e;
    }
}
const getPropertyImages=async(payload)=>{
    try {
        return await propertyRepository.getPropertyImages(payload.database,payload.propertyId);
    }
    catch (e) {
        return e;
    }
}

const updateProperty= async (payload)=>{
    try {
        return await propertyRepository.updateProperty(payload.database,payload.propertyData,payload.userId);
    }
    catch (e) {
        return e;
    }
}

const addFavourite= async (payload)=>{
    try {
        return await propertyRepository.addFavourite(payload.database,payload.propertyId,payload.userId);
    }
    catch (e) {
        return e;
    }
}
const removeFavourite= async (payload)=>{
    try {
        return await propertyRepository.removeFavourite(payload.database,payload.propertyId,payload.userId);
    }
    catch (e) {
        return e;
    }
}

const getFavouriteProperties=async(payload)=>{
    try {
        return await propertyRepository.getFavouriteProperties(payload.database,payload.userId);
    }
    catch (e) {
        return e;
    }
}

const getPropertiesCount=async(payload)=>{
    try {
        return await propertyRepository.getPropertiesCount(payload.database,payload.userId);
    }
    catch (e) {
        return e;
    }
}
export {createProperty,createPropertyImageReferences,getPropertyDetails,getUserProperties,getPropertyImages,updateProperty,getAssociatesProperties,getFavouriteStatus,addFavourite,removeFavourite,getFavouriteProperties,getPropertiesCount,getUserProfileProperties}