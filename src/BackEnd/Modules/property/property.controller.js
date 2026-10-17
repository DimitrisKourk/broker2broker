import * as propertyService from './property.service.js';
import { trimImagePaths } from '../../utils/trimImagePaths.js';

const uploadPropertyData=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            propertyData : req.body.propertyData,
            userId: req.user[0].id

        };
        //console.log("Property data received:",payload);
        
        let result = await propertyService.createProperty(payload);
        //let result={success:true,propertyId:2,message:"Property data uploaded successfully"}
        res.status(200).json(result);
        
    }
    catch (e) {
        let result={success:false,message:"Error uploading property data "}
        res.status(500).json(result);
        console.log(e)
    }
};

const uploadPropertyImages= async(req,res)=>{
    try{
        let imagePathsArray= req.files.map(file=>{return file.path}); //get paths
        imagePathsArray=  trimImagePaths(imagePathsArray,'properties') ; //trim paths
        
        let payload={ database : res.locals.database,
                propertyImageData : imagePathsArray,
                propertyId:parseInt(req.body.propertyId)
            };

        let result= await propertyService.createPropertyImageReferences(payload);
        console.log(result);

        res.status(200).json(result);}
    catch (e) {
        let result={success:false,message:"Error uploading property data "}
        res.status(500).json(result);
        console.log(e)
    }
}

const getPropertyDetails=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            propertyId : req.params.propertyId,
            requestorId: req.user[0].id
        };
        let result = await propertyService.getPropertyDetails(payload);
        res.status(200).json(result);
    }
    catch (e) {
        let result={success:false,message:"Error uploading property data "}
        res.status(500).json(result);
        console.log(e)
    }
};

const getPropertyImages=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            propertyId : req.params.propertyId,
            requestorId: req.user[0].id
        };
        let result = await propertyService.getPropertyImages(payload);
        res.status(200).json(result);        
    }
    catch (e) {
        let result={success:false,message:"Error uploading property data "}
        res.status(500).json(result);
        console.log(e)
    }
};

const getUserProperties=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            requestorId: req.user[0].id
        };
        let result = await propertyService.getUserProperties(payload);
                
        res.status(200).json(result);
        
    }
    catch (e) {
        let result={success:false,message:"Error uploading properties"}
        res.status(500).json(result);
        console.log(e)
    }
};

const getUserProfileProperties=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            userId: req.params.userId,
            association:res.locals.association
        };
        let result = await propertyService.getUserProfileProperties(payload);
        console.log(result)
        res.status(200).json(result);
    }
    catch (e) {
        let result={success:false,message:e};
        res.status(500).json(result);
    }
};

const getAssociatesProperties=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            requestorId: req.user[0].id
        };
        let result = await propertyService.getAssociatesProperties(payload);
                
        res.status(200).json(result);
        
    }
    catch (e) {
        let result={success:false,message:"Error getting properties"}
        res.status(500).json(result);
        console.log(e)
    }
};

const updatePropertyData=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            propertyData : req.body.propertyData,
            userId: req.user[0].id

        };
        console.log("Property data received:",payload.propertyData);
        
        let result = await propertyService.updateProperty(payload);
        //let result={success:true,propertyId:2,message:"Property data uploaded successfully"}
        res.status(200).json(result);

        
    }
    catch (e) {
        let result={success:false,message:"Error updating property data "}
        res.status(500).json(result);
        console.log(e)
    }
};

const getFavouriteStatus=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            propertyId : req.params.propertyId,
            userId: req.user[0].id
        };
        let result = await propertyService.getFavouriteStatus(payload);
        res.status(200).json(result);
        
    }
    catch (e) {
        let result={success:false,message:"Error uploading property data "}
        res.status(500).json(result);
        console.log(e)
    }
};

const addFavourite=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            propertyId : req.params.propertyId,
            userId: req.user[0].id
        };
        let result = await propertyService.addFavourite(payload);
        res.status(200).json(result);
        
    }
    catch (e) {
        let result={success:false,message:"Error adding favourite property"}
        res.status(500).json(result);
        console.log(e)
    }
};

const removeFavourite=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            propertyId : req.params.propertyId,
            userId: req.user[0].id
        };
        let result = await propertyService.removeFavourite(payload);
        res.status(200).json(result);
        
    }
    catch (e) {
        let result={success:false,message:"Error removing favourite property"}
        res.status(500).json(result);
        console.log(e)
    }
};

const getFavouriteProperties=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            userId: req.user[0].id
        };
        let result = await propertyService.getFavouriteProperties(payload);
                
        res.status(200).json(result);
        
    }
    catch (e) {
        let result={success:false,message:"Error getting favourite properties"}
        res.status(500).json(result);
        console.log(e)
    }
};

const getPropertiesCount=async (req,res)=>{
    try{
        let payload={ database : res.locals.database,
            userId: req.params.userId,
        };
        let result = await propertyService.getPropertiesCount(payload);
                
        res.status(200).json(result);
        
    }
    catch (e) {
        let result={success:false,message:"Error getting properties count"}
        res.status(500).json(result);
        console.log(e)
    }
};

export {uploadPropertyData,uploadPropertyImages,getPropertyDetails,getUserProperties,getPropertyImages,updatePropertyData,getAssociatesProperties,getFavouriteStatus,addFavourite,removeFavourite,getFavouriteProperties,getPropertiesCount,getUserProfileProperties};