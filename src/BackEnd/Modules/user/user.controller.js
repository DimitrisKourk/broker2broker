import * as userService from './user.service.js';
import { trimImagePaths } from '../../utils/trimImagePaths.js';

const getAllUsers =  async (req, res) => {
    try{
        let payload={ database : res.locals.database
        };
        let users = await userService.getAllUsers(payload);
        res.status(200).json(users);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const getUserByUsername = async (req, res) => {
    try{
        let payload={ database : res.locals.database,
                  username : req.params.username
        };

        let user = await userService.getUserByUsername(payload);

        res.status(200).json(user);
    }
    catch (e) {
        res.status(500).json(e);
    }
};
const getProfilePicture = async (req, res) => {
    try{
        let payload={ database : res.locals.database,
                  userId : req.params.userId
        };

        let result = await userService.getProfilePicture(payload);

        res.status(200).json(result);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const getUserByBusinessName = async (req, res) => {
    try{
        let payload={ database : res.locals.database,
                  businessName : req.params.businessName
        };

        let users = await userService.getUserByBusinessName(payload);

        res.status(200).json(users);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const checkUsernameExists = async (req, res) => {
    try{
        let payload={ database : res.locals.database,
            username : req.body.username
        };

        let data = await userService.checkUsernameExists(payload);
        console.log(data);
        res.status(200).json(data);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const createUser = async (req, res) => {
    try{
        let payload1={ database : res.locals.database,
            username : req.body.username
        };
        let user =await userService.checkUsernameExists(payload1)

        let payload2={ database : res.locals.database,
            userData : req.body
        };
        if(!user.usernameExists){
            let resData = await userService.createUser(payload2);
            console.log(resData);
            let data = {registerUser: resData.registerUserSuccess, createRequest: resData.createRequestSuccess}
            res.status(200).json(data);
        }
        else res.status(500).json({registerUser: false, createRequest: false, message:user.message});
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const logoutUser = async (req, res) => {
    try{
        req.logout((err) => {
            if (err) {
                res.status(500).json(err);
            }
            req.session.destroy();
            res.clearCookie('connect.sid');
            res.status(200).json({loggedOut:true});
        });
    }
    catch (err) {
        res.status(500).json(err);
    }
}



const checkSubscription = async (req, res) => {
    try{

        let payload={ database : res.locals.database,
            id : req.user[0].id
        };
        let subPlan = await userService.checkSubscription(payload);

        res.status(200).json(subPlan);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const getPendingRegistrationRequests =  async (req, res) => {
    try{
        let payload={ database : res.locals.database
        };
        let requests = await userService.getPendingRegistrationRequests(payload);
        res.status(200).json({requests});
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const getApprovedRegistrationRequests =  async (req, res) => {
    try{
        let payload={ database : res.locals.database
        };
        let requests = await userService.getApprovedRegistrationRequests(payload);
        res.status(200).json({requests});
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const getDeclinedRegistrationRequests =  async (req, res) => {
    try{
        let payload={ database : res.locals.database
        };
        let requests = await userService.getDeclinedRegistrationRequests(payload);
        res.status(200).json({requests});
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const approveRegistrationRequest =  async (req, res) => {
    try{
        let payload={ database : res.locals.database,
            approver:req.user[0].id,
            requestorId:req.body.user_id,
            request:req.body.request_id

        };
        let requests = await userService.approveRegistrationRequest(payload);
        res.status(200).json(requests);
    }
    catch (e) {
        res.status(500).json(e);
    }
};
const declineRegistrationRequest =  async (req, res) => {
    try{
        let payload={ database : res.locals.database,
            approver:req.user[0].id,
            request:req.body.request_id
        };
        let requests = await userService.declineRegistrationRequest(payload);
        res.status(200).json(requests);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const createAssociationRequest =  async (req, res) => {
    try{
        let payload={ database : res.locals.database,
            requestorId:req.user[0].id,
            requesteeId:req.params.userId
        };
        let request= await userService.createAssociationRequest(payload);
        res.status(200).json(request);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const cancelAssociationRequest =  async (req, res) => {
    try{
        let payload={ database : res.locals.database,
            userId:req.user[0].id,
            requestId:req.params.requestId
        };
        let request = await userService.cancelAssociationRequest(payload);
        res.status(200).json(request);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const acceptAssociationRequest =  async (req, res) => {
    try{
        let payload={ database : res.locals.database,
            userId:req.user[0].id,
            requestId:req.params.requestId,
            senderId:req.params.userId
        };
        let request = await userService.acceptAssociationRequest(payload);
        res.status(200).json(request);
    }
    catch (e) {
        res.status(500).json(e);
    }
};
const deleteAssociation =  async (req, res) => {
    try{
        let payload={ database : res.locals.database,
            userA:req.user[0].id,
            userB:req.params.userId
        };
        let request = await userService.deleteAssociation(payload);
        res.status(200).json(request);
    }
    catch (e) {
        res.status(500).json(e);
    }
};
const declineAssociationRequest =  async (req, res) => {
    try{
        let payload={ database : res.locals.database,
            userId:req.user[0].id,
            requestId:req.params.requestId
        };
        let request = await userService.declineAssociationRequest(payload);
        res.status(200).json(request);
    }
    catch (e) {
        res.status(500).json(e);
    }
};

const getAssociationStatus=  async (req, res) => {
    try{
        let payload={ database : res.locals.database,
            userId1:req.user[0].id, // current session user
            userId2:req.params.userId // the user profile being viewed
        };
        let associationStatus = await userService.getAssociationStatus(payload);
       
        res.status(200).json({associationStatus});
    }
    catch (e) {
        console.log(e)
        res.status(500).json(e);
    }
};

const getAssociates =  async (req, res) => {
    try{
        let payload={ database : res.locals.database,
            userId:req.user[0].id,
        };
        let users = await userService.getAssociates(payload);
        res.status(200).json(users);
    }
    catch (e) {
        res.status(500).json(e);
    }
};
const uploadProfilePicture= async(req,res)=>{
    try{
        let imagePath= req.file.path;//get paths
        let imagePathsArray=  trimImagePaths([imagePath],'profiles') ; //trim paths
        let payload={ database : res.locals.database,
                profilePicture : imagePathsArray[0],
                userId:req.user[0].id
        };
        let result= await userService.uploadProfilePicture(payload);
        console.log(result);

        res.status(200).json(result)
    }
    catch (e) {
        let result={success:false,message:"Error uploading property data.   " +e}
        res.status(500).json(result);
    }
}

export {getProfilePicture,uploadProfilePicture,getUserByBusinessName,getAllUsers,getUserByUsername,createUser,logoutUser,checkUsernameExists,checkSubscription,getPendingRegistrationRequests,getApprovedRegistrationRequests,getDeclinedRegistrationRequests,approveRegistrationRequest,declineRegistrationRequest,createAssociationRequest,acceptAssociationRequest,declineAssociationRequest,getAssociationStatus,cancelAssociationRequest,deleteAssociation,getAssociates};