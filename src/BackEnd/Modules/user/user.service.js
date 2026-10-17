//const repository=require('./user.repository');
//const bcrypt = require("bcrypt");
import * as userRepository from './user.repository.js';

import bcrypt from 'bcrypt';

const getAllUsers= async (payload)=>{
    return await userRepository.getAllUsers(payload.database);
}

const getUserByUsername= async (payload)=>{
    return await userRepository.getUserByUsername(payload.database,payload.username);
}
const getProfilePicture= async (payload)=>{
    return await userRepository.getProfilePicture(payload.database,payload.userId);
}
const getUserByBusinessName= async (payload)=>{
        
    return await userRepository.getUserByBusinessName(payload.database,payload.businessName);
}

const getAssociates= async (payload)=>{
    return await userRepository.getAssociates(payload.database,payload.userId);
}

//returning user to passport.deserializeUser
const getUserPassport= async (payload)=>{
    return await userRepository.getUserPassport(payload.database,payload.id);
}

const createUser= async (payload)=>{

    const password  = payload.userData.password;

    //generate hash salt for password
    const salt = await bcrypt.genSalt(12);

    //generate the hashed version of the user's Password

    payload.userData.password=await bcrypt.hash(password, salt);
        
    return await userRepository.createUser(payload.database,payload.userData);
}

const getUserCredentials= async (payload)=>{
    return await userRepository.getUserCredentials(payload.database,payload.username);
}

const checkUsernameExists= async (payload)=>{
    return await userRepository.checkUsernameExists(payload.database,payload.username);
}

const checkSubscription= async (payload)=>{
    return await userRepository.checkSubscription(payload.database,payload.id);
}



const getPendingRegistrationRequests= async (payload)=>{
    return await userRepository.getPendingRegistrationRequests(payload.database);
}
const getApprovedRegistrationRequests= async (payload)=>{
    return await userRepository.getApprovedRegistrationRequests(payload.database);
}
const getDeclinedRegistrationRequests= async (payload)=>{
    return await userRepository.getDeclinedRegistrationRequests(payload.database);
}

const approveRegistrationRequest= async (payload)=>{
    let requestResult= await userRepository.approveRegistrationRequest(payload.database,payload.approver,payload.request);
    if(requestResult.success===false){
        return requestResult;
    }
    const role=-1 //role set as no active plan on registration approval
    return await userRepository.updateUserRole(payload.database,payload.requestorId,role)
}
const declineRegistrationRequest= async (payload)=>{
    return await userRepository.declineRegistrationRequest(payload.database,payload.approver,payload.request);
}

const createAssociationRequest= async (payload)=>{
    return await userRepository.createAssociationRequest(payload.database,payload.requestorId,payload.requesteeId);
}
const cancelAssociationRequest= async (payload)=>{
    return await userRepository.cancelAssociationRequest(payload.database,payload.userId,payload.requestId);
}
const acceptAssociationRequest= async (payload)=>{
    const request= await userRepository.acceptAssociationRequest(payload.database,payload.userId,payload.requestId);
    if(request.success===false){
        return request;
    }
    console.log(request)
    const associationStatus= await userRepository.createAssociation(payload.database,payload.userId,payload.senderId);
    console.log(associationStatus)
    if(associationStatus.success===false){
        return associationStatus;
    }
    return associationStatus;
}
const declineAssociationRequest= async (payload)=>{
    return await userRepository.declineAssociationRequest(payload.database,payload.userId,payload.requestId);
}
const getAssociationStatus= async (payload)=>{
        
    //check if users are already associates
    let status= await userRepository.getAssociationStatus(payload.database,payload.userId1,payload.userId2);
    console.log(status);
    if(status.associates){
        return {associates:true}
    }
        

    //if userts not associates check for association request
    let request= await userRepository.getAssociationRequest(payload.database,payload.userId1,payload.userId2);
    console.log(request);
    if(request.found===false){
        return {associates:false,associationRequest:false};
    } 
        
    if(request.data.requestor_id===payload.userId1){
        //if this session user has send the association request
        return {associates:false,associationRequest:true,userIs:'sender',requestId:request.data.id};
    }
    //if this session user has recieved the association request
    return {associates:false,associationRequest:true,userIs:'receiver',requestId:request.data.id}
    
}

const deleteAssociation= async (payload)=>{
        
    //check if users are already associates
    return await userRepository.deleteAssociation(payload.database,payload.userA,payload.userB);    
}
const uploadProfilePicture= async (payload)=>{
    return await userRepository.uploadProfilePicture(payload.database,payload.profilePicture,payload.userId);
        
}


export {getProfilePicture,getUserByBusinessName,getUserByUsername,
                getAllUsers, createUser,getUserCredentials,getUserPassport,checkUsernameExists,checkSubscription,getPendingRegistrationRequests,getApprovedRegistrationRequests,getDeclinedRegistrationRequests,approveRegistrationRequest,declineRegistrationRequest,createAssociationRequest,acceptAssociationRequest,declineAssociationRequest,getAssociationStatus,cancelAssociationRequest,deleteAssociation,getAssociates,uploadProfilePicture};