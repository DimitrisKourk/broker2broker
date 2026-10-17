import express from 'express';
import * as propertyController from './property.controller.js';
import {isActiveMember} from "../../utils/userAuthorization.js";
import {uploadPropertyImages, handleUploadError} from '../../utils/multerConfig.js';
import { associationStatus } from '../../utils/associationStatus.js';



export default function propertyRouter(data) {
    let router = express.Router();

    router.post("/upload-property-data",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.uploadPropertyData(req, res);
        }
    );

    router.post("/upload-property-images",isActiveMember,uploadPropertyImages.array("files",10),handleUploadError,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.uploadPropertyImages(req, res);
        }
    );

    router.get("/get-user-properties",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getUserProperties(req, res);
        }
    );

    router.get("/get-user-profile-properties/:userId",isActiveMember,(req,res,next)=>{res.locals.database = data.db; next();},associationStatus ,async (req, res) => {
        await propertyController.getUserProfileProperties(req, res);
        }
    );
    router.get("/get-property-details/:propertyId",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getPropertyDetails(req, res);
        }
    );
    router.get("/get-property-images/:propertyId",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getPropertyImages(req, res);
        }
    );
    router.put("/update-property-data",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.updatePropertyData(req, res);
        }
    );
    router.get("/get-associates-properties",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getAssociatesProperties(req, res);
        }
    );
    router.get("/favourite-status/:propertyId",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getFavouriteStatus(req, res);
        }
    );
    router.post("/add-favourite/:propertyId",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.addFavourite(req, res);
        }
    );
    router.delete("/remove-favourite/:propertyId",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.removeFavourite(req, res);
        }
    );
    router.get("/get-favourite-properties",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getFavouriteProperties(req, res);
        }
    );

    router.get("/get-properties-count/:userId",isActiveMember,async (req, res) => {
        res.locals.database = data.db;
        await propertyController.getPropertiesCount(req, res);
        }
    );

    return router;
}
