import express from 'express';
import * as propertyController from './property.controller.js';
import {isAuthenticated} from "../../utils/userAuthorization.js";
import {uploadPropertyImages} from '../../utils/multerConfig.js';
import { associationStatus } from '../../utils/associationStatus.js';



export default function propertyRouter(data) {
    let router = express.Router();

    router.post("/upload-property-data",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.uploadPropertyData(req, res);
        }
    );

    router.post("/upload-property-images",isAuthenticated,uploadPropertyImages.array("files",10) ,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.uploadPropertyImages(req, res);
        }
    );
    
    router.get("/get-user-properties",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getUserProperties(req, res);
        }
    );

    router.get("/get-user-profile-properties/:userId",isAuthenticated,(req,res,next)=>{res.locals.database = data.db; next();},associationStatus ,async (req, res) => {
        await propertyController.getUserProfileProperties(req, res);
        }
    );
    router.get("/get-property-details/:propertyId",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getPropertyDetails(req, res);
        }
    );
    router.get("/get-property-images/:propertyId",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getPropertyImages(req, res);
        }
    );
    router.put("/update-property-data",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.updatePropertyData(req, res);
        }
    );
    router.get("/get-associates-properties",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getAssociatesProperties(req, res);
        }
    );
    router.get("/favourite-status/:propertyId",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getFavouriteStatus(req, res);
        }
    );
    router.post("/add-favourite/:propertyId",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.addFavourite(req, res);
        }
    );
    router.delete("/remove-favourite/:propertyId",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.removeFavourite(req, res);
        }
    );
    router.get("/get-favourite-properties",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getFavouriteProperties(req, res);
        }
    );

    router.get("/get-properties-count/:userId",isAuthenticated,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getPropertiesCount(req, res);
        }
    );

    return router;
}
