//const repository=require('./user.repository');
//const bcrypt = require("bcrypt");
import * as userRepository from './user.repository.js';

import bcrypt from 'bcrypt';

const getAllUsers= async (payload)=>{
    try {
        return await userRepository.getAllUsers(payload.database);
    }
    catch (e) {
        return e;
    }
}

const getUserByUsername= async (payload)=>{
    try {
        return await userRepository.getUserByUsername(payload.database,payload.username);
    }
    catch (e) {
        return e;
    }
}
const getProfilePicture= async (payload)=>{
    try {
        return await userRepository.getProfilePicture(payload.database,payload.userId);
    }
    catch (e) {
        return e;
    }
}
const getUserByBusinessName= async (payload)=>{
    try {
        
        return await userRepository.getUserByBusinessName(payload.database,payload.businessName);
    }
    catch (e) {
        return e;
    }
}

const getAssociates= async (payload)=>{
    try {
        return await userRepository.getAssociates(payload.database,payload.userId);
    }
    catch (e) {
        return e;
    }
}

//returning user to passport.deserializeUser
const getUserPassport= async (payload)=>{
    try {
        return await userRepository.getUserPassport(payload.database,payload.id);
    }
    catch (e) {
        return e;
    }
}

const createUser= async (payload)=>{
    try {

        const password  = payload.userData.password;

        //generate hash salt for password
        const salt = await bcrypt.genSalt(12);

        //generate the hashed version of the user's Password

        payload.userData.password=await bcrypt.hash(password, salt);
        
        return await userRepository.createUser(payload.database,payload.userData);
    }
    catch (e) {
        return e;
    }
}

const getUserCredentials= async (payload)=>{
    try {
        return await userRepository.getUserCredentials(payload.database,payload.username);
    }
    catch (e) {
        return e;
    }
}

const checkUsernameExists= async (payload)=>{
    try {
        return await userRepository.checkUsernameExists(payload.database,payload.username);
    }
    catch (e) {
        return e;
    }
}

const checkSubscription= async (payload)=>{
    try {
        return await userRepository.checkSubscription(payload.database,payload.id);
    }
    catch (e) {
        return e;
    }
}



const getPendingRegistrationRequests= async (payload)=>{
    try {
        return await userRepository.getPendingRegistrationRequests(payload.database);
    }
    catch (e) {
        return e;
    }
}
const getApprovedRegistrationRequests= async (payload)=>{
    try {
        return await userRepository.getApprovedRegistrationRequests(payload.database);
    }
    catch (e) {
        return e;
    }
}
const getDeclinedRegistrationRequests= async (payload)=>{
    try {
        return await userRepository.getDeclinedRegistrationRequests(payload.database);
    }
    catch (e) {
        return e;
    }
}

const approveRegistrationRequest= async (payload)=>{
    try {
        let requestResult= await userRepository.approveRegistrationRequest(payload.database,payload.approver,payload.request);
        if(requestResult.success===false){
            return requestResult;
        }
        const role=-1 //role set as no active plan on registration approval
        return await userRepository.updateUserRole(payload.database,payload.requestorId,role)
    }
    catch (e) {
        return e;
    }
}
const declineRegistrationRequest= async (payload)=>{
    try {
        return await userRepository.declineRegistrationRequest(payload.database,payload.approver,payload.request);
    }
    catch (e) {
        return e;
    }
}

const createAssociationRequest= async (payload)=>{
    try {
        return await userRepository.createAssociationRequest(payload.database,payload.requestorId,payload.requesteeId);
    }
    catch (e) {
        return e;
    }
}
const cancelAssociationRequest= async (payload)=>{
    try {
        return await userRepository.cancelAssociationRequest(payload.database,payload.userId,payload.requestId);
    }
    catch (e) {
        return e;
    }
}
const acceptAssociationRequest= async (payload)=>{
    try {
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
    catch (e) {
        return e;
    }
}
const declineAssociationRequest= async (payload)=>{
    try {
        return await userRepository.declineAssociationRequest(payload.database,payload.userId,payload.requestId);
    }
    catch (e) {
        return e;
    }
}
const getAssociationStatus= async (payload)=>{
    try {
        
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
    catch (e) {
        return e;
    }
}

const deleteAssociation= async (payload)=>{
    try {
        
        //check if users are already associates
        return await userRepository.deleteAssociation(payload.database,payload.userA,payload.userB);    
    }   
    catch (e) {
        return e;
    }
}
const uploadProfilePicture= async (payload)=>{
    try {
        return await userRepository.uploadProfilePicture(payload.database,payload.profilePicture,payload.userId);
        
    }
    catch (e) {
        return e;
    }
}


export {getProfilePicture,getUserByBusinessName,getUserByUsername,
                getAllUsers, createUser,getUserCredentials,getUserPassport,checkUsernameExists,checkSubscription,getPendingRegistrationRequests,getApprovedRegistrationRequests,getDeclinedRegistrationRequests,approveRegistrationRequest,declineRegistrationRequest,createAssociationRequest,acceptAssociationRequest,declineAssociationRequest,getAssociationStatus,cancelAssociationRequest,deleteAssociation,getAssociates,uploadProfilePicture};