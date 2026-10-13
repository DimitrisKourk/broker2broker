import multer from "multer";
import fs from 'fs'
import path from 'path'
import LocalDateTimeNow from "./currentDateTime.js";

const storageProperties = multer.diskStorage({
    destination: function (req, file, cb) {
        const currentPath=process.cwd();
        const destFolder=path.join(currentPath,'src/BackEnd/imageUploads/properties/',req.user[0].id+'_PropertyImages/',req.body.propertyId+'_Property' );
        fs.mkdirSync(destFolder, { recursive: true })
        cb(null, destFolder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = LocalDateTimeNow();
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
    fileFilter:function(req, file, cb){
        console.log('filtering'); //never reached when file is missing
        if (!file) {
            return cb(new Error('no file', false));
        }
        cb(null, true);
    }

});

const storageProfile = multer.diskStorage({
    destination: function (req, file, cb) {
        const currentPath=process.cwd();
        const destFolder=path.join(currentPath,'src/BackEnd/imageUploads/profiles/' );
        fs.mkdirSync(destFolder, { recursive: true })
        cb(null, destFolder);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = req.user[0].id+"-profile";
        cb(null, uniqueSuffix + '-' + file.originalname);
    },
    fileFilter:function(req, file, cb){
        console.log('filtering'); //never reached when file is missing
        if (!file) {
            return cb(new Error('no file', false));
        }
        cb(null, true);
    }

});

const uploadPropertyImages = multer({ storage: storageProperties, limits: { fileSize: '50mb' } });
const uploadProfilePicture = multer({ storage: storageProfile, limits: { fileSize: '10mb' } });


export  {uploadPropertyImages,uploadProfilePicture};