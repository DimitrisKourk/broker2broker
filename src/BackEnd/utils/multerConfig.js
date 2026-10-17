import multer from "multer";
import fs from 'fs'
import path from 'path'
import LocalDateTimeNow from "./currentDateTime.js";
import {connection} from "../dbconfig.js";

const ALLOWED_IMAGE_MIMETYPES=['image/jpeg','image/png','image/webp','image/gif'];

//shared by both upload configs below - rejects anything that isn't an allowlisted image type
const imageFileFilter=(req,file,cb)=>{
    if(!ALLOWED_IMAGE_MIMETYPES.includes(file.mimetype)){
        return cb(new Error('Only image uploads (jpeg, png, webp, gif) are allowed'));
    }
    cb(null, true);
}


const storageProperties = multer.diskStorage({
    destination: async function (req, file, cb) {
        try{
            const propertyId=parseInt(req.body.propertyId);
            if(!Number.isInteger(propertyId) || propertyId<=0){
                return cb(new Error('Invalid propertyId'));
            }

            //only the property's owner may upload images for it
            const [rows]=await connection.execute('SELECT `user_id` FROM `properties` WHERE `property_id`=?',[propertyId]);
            if(rows.length===0 || rows[0].user_id!=req.user[0].id){
                return cb(new Error('You do not own this property'));
            }

            const currentPath=process.cwd();
            const destFolder=path.join(currentPath,'src/BackEnd/imageUploads/properties/',req.user[0].id+'_PropertyImages/',propertyId+'_Property' );
            fs.mkdirSync(destFolder, { recursive: true })
            cb(null, destFolder);
        }
        catch(e){
            cb(e);
        }
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = LocalDateTimeNow();
        cb(null, uniqueSuffix + '-' + path.basename(file.originalname));
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
        cb(null, uniqueSuffix + '-' + path.basename(file.originalname));
    }
});

const uploadPropertyImages = multer({ storage: storageProperties, limits: { fileSize: 50*1024*1024 }, fileFilter: imageFileFilter });
const uploadProfilePicture = multer({ storage: storageProfile, limits: { fileSize: 10*1024*1024 }, fileFilter: imageFileFilter });


export  {uploadPropertyImages,uploadProfilePicture};