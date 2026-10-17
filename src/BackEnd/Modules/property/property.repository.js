import {convertPropertyJSONtoArray} from "../../utils/convertPropertyJSONtoArray.js";

//true if requestorId is in the owner's associates list
const isAssociateOf= async (database,ownerId,requestorId)=>{
    const sql = 'SELECT EXISTS (SELECT * FROM `associates` WHERE user_id=? and friend_id=? LIMIT 1) as `association_exists`';
    const [rows] = await database.query(sql,[ownerId,requestorId]);
    return !!rows[0].association_exists;
}

//owner always has access; otherwise access follows the property's visibility level
const canAccessProperty= async (database,property,requestorId)=>{
    if(requestorId==property.user_id){
        return true;
    }
    if(property.visibility==="Private"){
        return false;
    }
    if(property.visibility==="Associates"){
        return await isAssociateOf(database,property.user_id,requestorId);
    }
    return property.visibility==="Public";
}

const getPropertyDetails= async (database,propertyId,requestorId)=>{
    try {
        const sql = 'SELECT * FROM `properties` where `property_id`= ?';
        let values=[parseInt(propertyId)];
        const [rows] = await database.execute(sql,values);

        if(rows.length===0){
            return {success:false,message:"No property found matching the given id"};
        }

        if(!(await canAccessProperty(database,rows[0],requestorId))){
            return {success:false,message:"You do not have access to this property"};
        }
        return {success:true,property:rows[0]};


    } catch (err) {
        return err;
    }
}
const getPropertyImages= async (database,propertyId,requestorId)=>{
    try {
        const propertySql = 'SELECT `user_id`,`visibility` FROM `properties` where `property_id`= ?';
        const [propertyRows] = await database.execute(propertySql,[parseInt(propertyId)]);
        if(propertyRows.length===0){
            return {success:false,message:"No property found matching the given id"};
        }
        if(!(await canAccessProperty(database,propertyRows[0],requestorId))){
            return {success:false,message:"You do not have access to this property's images"};
        }

        const sql = 'SELECT * FROM `propertyimages` where `property_id`= ?';
        let values=[parseInt(propertyId)];
        const [rows] = await database.execute(sql,values);
        if(rows.length===0){
            return {success:false,message:"No images found matching the given property id"};
        }
        else{
            return {success:true,images:rows};
        }
    } catch (err) {
        return err;
    }
}
const getUserProperties= async (database,requestorId)=>{
    try {
        const values=[requestorId];
        const sql = 'SELECT user_id,property_id,beds,baths,square_meters,hero_image FROM `properties` WHERE `user_id`=? LIMIT 20';
        const [rows] = await database.execute(sql,values);
        console.log(rows);
        if(rows.length===0){
            return {success:false,message:"No property found"};
        }
        else{
            return {success:true,properties:rows};
        }
        
        

    } catch (err) {
        return err;
    }
}

const getUserProfileProperties= async (database,userId,association)=>{
    try {
        console.log(association,userId)
        const values=[userId];
        let sql = 'SELECT user_id,property_id,beds,baths,square_meters,hero_image FROM `properties` WHERE `user_id`=?';
        if(association==='myself'){
            sql+=' LIMIT 20'
        }
        else if(association==='associates'){
            sql+=' AND visibility!="Private" LIMIT 20'
        }
        else if(association==='not associated'){
            sql+=' AND visibility!="Private" AND visibility!="Associates" LIMIT 20'
        }
        
        
        const [rows] = await database.execute(sql,values);
        if(rows.length===0){
            console.log("NOT found user profile properties");
            return {success:false,message:"No property found"};
        }
        else{
            console.log("found user profile properties");
            return {success:true,properties:rows};
        }
    } 
    catch (err) {
        return err;
    }
}

const getAssociatesProperties= async (database,requestorId)=>{
    try {
        const values=[requestorId];
        const sql = 'SELECT property_id,square_meters,beds,baths,hero_image,username AS uploader_username,associates.friend_id AS user_id FROM (properties LEFT JOIN associates ON associates.friend_id = properties.user_id)JOIN users on users.user_id=associates.friend_id WHERE associates.user_id=? and properties.visibility!="Private"';
        const [rows] = await database.execute(sql,values);
        console.log(rows);

        if(rows.length===0){
            return {success:false,message:"No properties found"};
        }
        else{
            return {success:true,properties:rows};
        }

    } catch (err) {
        return err;
    }
}

const createProperty=async(database,propertyData,userId)=>{

        console.log(propertyData,userId);
        // take the custom json, convert to array with default values ready for Database and normalize bool to int.
        let values=convertPropertyJSONtoArray("create",propertyData,userId);

        console.log(values);
        console.log("length:",values.length);
        const sql=  'INSERT INTO `properties`(`property_type`,`rental`,`construction_date`,`kaek`,`country`,`region`,`regional_unit`,`municipality`,`city`,`neighborhood`,`property_address`,`last_update`,`upload_date`,`square_meters`,`price`,`floor`,`elevator`,`beds`,`baths`,`parking_space`,`property_state`,`balcony`,`balcony_square_meters`,`property_orientation`,`heating_type`,`heating_means`,`energy_class`,`description`,`visibility`,`user_id`,`property_owner_name`,`property_owner_phone`) VALUES (?,?,?,?,?,?,?,?,?,?,?,NOW(),NOW(),?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)';
        const [result]=await database.execute(sql,values);
        if(result.affectedRows){
            return {success:true,propertyId:result.insertId,message:"Property data uploaded successfully"};
        }
        else{
            return {success:false,propertyId:-1,message:"Property data uploaded failed uploading"};
        }
    
}

const createPropertyImageReferences=async(database,propertyImageData,propertyId)=>{

    try{
        let values=[];
        //Boooleans to int for saving in db
        for (let image of propertyImageData ){
            values.push(propertyId,image);        
        }
        let sql=  'INSERT INTO `propertyimages`(`property_id`,`image_path`) VALUES ';
        const imageNumber=propertyImageData.length-1;
        for(let i=0;i<=imageNumber;i++){
            if(i===imageNumber){
                sql+='(?,?)';
            }
            else{
                sql+='(?,?),';
            }
        }
        const [result]=await database.execute(sql,values);
        if(result.affectedRows){
            return {imagesSuccess:true,imagesMessage:"Property image references uploaded successfully"};
        }

    }
    catch(e){
        return {imagesSuccess:false,imagesMessage:e};
    }
}
const createPropertyHeroImageReference=async(database,propertyHeroImage,propertyId)=>{

    try{
        let values=[propertyHeroImage,propertyId];
        
        let sql=  'UPDATE `properties` SET hero_image=? WHERE property_id=?';
        
        const [result]=await database.execute(sql,values);
        if(result.affectedRows){
            return {heroImageSuccess:true,heroImageMessage:"Property hero image uploaded successfully"};
        }

    }
    catch(e){
        console.log(e);
        return {heroImageSuccess:false,heroImageMessage:e};
    }
}

const updateProperty=async(database,propertyData,userId)=>{

    
        console.log(propertyData,userId,propertyData.property_id);
        // take the custom json, convert to array with default values ready for Database and normalize bool to int.
        let values=convertPropertyJSONtoArray("update",propertyData,userId);
        console.log(values);
        if('property_id' in propertyData)(values.push(propertyData.property_id));
        values.push(userId)
        const sql=  'UPDATE `properties` SET `property_type`=?,`rental`=?,`construction_date`=?,`kaek`=?,`country`=?,`region`=?,`regional_unit`=?,`municipality`=?,`city`=?,`neighborhood`=?,`property_address`=?,`last_update`=NOW(),`square_meters`=?,`price`=?,`floor`=?,`elevator`=?,`beds`=?,`baths`=?,`parking_space`=?,`property_state`=?,`balcony`=?,`balcony_square_meters`=?,`property_orientation`=?,`heating_type`=?,`heating_means`=?,`energy_class`=?,`description`=?,`visibility`=?,`property_owner_name`=?,`property_owner_phone`=? WHERE property_id=? AND user_id=?';
        console.log(values);

        const [result]=await database.execute(sql,values);
        console.log(result.affectedRows)
        if(result.affectedRows){
            return {success:true,message:"Property data updated successfully"};
        }
        else{
            return {success:false,message:"Property data update failed"};
        }
}

const getFavouriteStatus= async (database,propertyId,userId)=>{
    try {

        let values=[propertyId,userId];
        const sql = 'SELECT EXISTS (SELECT * FROM `favourites` WHERE `property_id`= ? and user_id=? LIMIT 1) as `favourite_status`';
        const [rows] = await database.execute(sql,values);
        console.log("favourite status:" +rows[0].favourite_status )
        if(rows[0].favourite_status){
            return {success:true,favourite:true};
        }
        return {success:true,favourite:false};
        

    } catch (err) {
        return {success:false,message:err};
    }
}

const addFavourite= async (database,propertyId,userId)=>{
    try {

        let values=[propertyId,userId];
        const sql = 'INSERT INTO `favourites`  (property_id,user_id,date) VALUES (?,?,NOW())';
        const [rows] = await database.execute(sql,values);
        if(rows.affectedRows){
            return {success:true};
        }
        
        return {success:false,message:"Error Adding property to favourites"};
        

    } catch (err) {
        return {success:false,message:err};
    }
}

const removeFavourite= async (database,propertyId,userId)=>{
    try {

        let values=[propertyId,userId];
        const sql = 'DELETE FROM `favourites` WHERE `property_id`= ? and user_id=?';
        const [rows] = await database.execute(sql,values);
        if(rows.affectedRows){
            return {success:true};
        }
        
        return {success:false,message:"Error removing property from favourites"};
        

    } catch (err) {
        return {success:false,message:err};
    }
}

const getFavouriteProperties= async (database,userId)=>{
    try {
        const values=[userId];
        const sql = 'SELECT properties.property_id,square_meters,beds,baths,hero_image,username AS uploader_username,properties.user_id AS user_id FROM (properties LEFT JOIN favourites ON favourites.property_id = properties.property_id)JOIN users on users.user_id=properties.user_id WHERE favourites.user_id=? and properties.visibility!="Private"';
        const [rows] = await database.execute(sql,values);
        console.log(rows);
        if(rows.length===0){
            return {success:false,message:"No properties found"};
        }
        else{
            return {success:true,properties:rows};
        }
        
        

    } catch (err) {
        return err;
    }
}

const getPropertiesCount= async (database,userId)=>{
    try {
        const values=[userId];
        const sql = 'select count(*) total_properties, sum(rental=0 ) sale_properties, sum(rental=1 ) rental_properties from properties where user_id=?';
        const [rows] = await database.execute(sql,values);
        console.log(rows);
        if(rows.length===0){
            return {success:false,message:"No properties found"};
        }
        else{
            return {success:true,...rows[0]};
        }
        
    } catch (e) {
        return e;
    }
}


export {createProperty,createPropertyImageReferences,createPropertyHeroImageReference,getPropertyDetails,getUserProperties,getPropertyImages,updateProperty,getAssociatesProperties,getFavouriteStatus,addFavourite,removeFavourite,getFavouriteProperties,getPropertiesCount,getUserProfileProperties}