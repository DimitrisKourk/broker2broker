

import express from 'express';
import * as userController from './user.controller.js';
import passport from "passport";
import {isAuthenticated} from "../../utils/userAuthorization.js";
import {isAdmin} from "../../utils/adminAuthorization.js";
import { uploadProfilePicture } from '../../utils/multerConfig.js';

export default function userRouter(data) {
    let router = express.Router();

    router.get("/all", async (req,res)=> {
            res.locals.database = data.db;
            await userController.getAllUsers(req, res)
    });

    router.get("/get-user/:username",isAuthenticated, async (req,res)=> {
            res.locals.database = data.db;
            await userController.getUserByUsername(req, res);
    });

    router.get("/get-profile-picture/:userId",isAuthenticated, async (req,res)=> {
            res.locals.database = data.db;
            await userController.getProfilePicture(req, res);
    });

    router.post("/profile/upload-profile-picture",isAuthenticated,uploadProfilePicture.single("file") ,async (req, res) => {
        res.locals.database = data.db;
        await userController.uploadProfilePicture(req, res);
        }
    );
    
    router.get("/search-user/business-name/:businessName",isAuthenticated, async (req,res)=> {
            res.locals.database = data.db;
            await userController.getUserByBusinessName(req, res);
    });
    router.get("/get-associates/",isAuthenticated, async (req,res)=> {
            res.locals.database = data.db;
            console.log("getting associates")
            await userController.getAssociates(req, res);
    });

    router.post("/auth/register/submit-user-info",async (req,res)=> {
        res.locals.database = data.db;
        await userController.createUser(req, res);
    });

    router.post("/auth/login/submit-user-info",
        passport.authenticate('local', {successRedirect: '/api/user/auth/login-success', failureRedirect: '/api/user/auth/login-fail'}));

    router.get('/auth/login-fail', (req, res) => {
        res.status(401).json({message: "Wrong username or password", isAuthenticated: false});
    });

    router.get('/auth/login-success', (req, res) => {
        let user=req.user[0];
        res.status(200).json({user:{user_id:user.id,username:user.username,name:user.name,role:user.role},message: "User is logged in", isAuthenticated: true});
    });

    router.post("/auth/logout",async (req,res)=> {
        res.locals.database = data.db;
        await userController.logoutUser(req, res);
    });

    router.post("/auth/register/check-username",async (req,res)=> {
        res.locals.database = data.db;
        await userController.checkUsernameExists(req, res);
    });

    router.get("/auth/login/check-subscription",isAuthenticated, async (req,res)=> {
        res.locals.database = data.db;
        await userController.checkSubscription(req, res)
    });

    router.get("/admin/pending-registration-requests",isAdmin,async (req,res)=>{
        res.locals.database=data.db;
        console.log("getting pending requests")

        await userController.getPendingRegistrationRequests(req, res)

    });

    router.get("/admin/approved-registration-requests",isAdmin,async (req,res)=>{
        res.locals.database=data.db;
        console.log("getting approved requests")

        await userController.getApprovedRegistrationRequests(req, res)

    });

    router.get("/admin/declined-registration-requests",isAdmin,async (req,res)=>{
        res.locals.database=data.db;
        console.log("getting declined requests")
        await userController.getDeclinedRegistrationRequests(req, res)

    });

    router.put("/admin/approve-registration",isAdmin,async (req,res)=>{
        res.locals.database=data.db;
        await userController.approveRegistrationRequest(req, res)
    })

    router.put("/admin/decline-registration",isAdmin,async (req,res)=>{
        res.locals.database=data.db;
        await userController.declineRegistrationRequest(req, res)
    })

    router.get("/association-status/:userId",isAuthenticated,async (req,res)=>{
        res.locals.database=data.db;
        await userController.getAssociationStatus(req, res)
    })

    router.post("/association-request/create/:userId",isAuthenticated,async (req,res)=>{
        res.locals.database=data.db;
        await userController.createAssociationRequest(req, res)
    })
    router.put("/association-request/cancel/:requestId",isAuthenticated,async (req,res)=>{
        res.locals.database=data.db;
        await userController.cancelAssociationRequest(req, res)
    })

    router.put("/association-request/accept/:requestId/from/:userId",isAuthenticated,async (req,res)=>{
        res.locals.database=data.db;
        await userController.acceptAssociationRequest(req, res)
    })
    router.put("/association-request/decline/:requestId",isAuthenticated,async (req,res)=>{
        res.locals.database=data.db;
        await userController.declineAssociationRequest(req, res)
    })
    router.delete("/association/delete/:userId",isAuthenticated,async (req,res)=>{
        res.locals.database=data.db;
        await userController.deleteAssociation(req, res)
    })

    return router;
}