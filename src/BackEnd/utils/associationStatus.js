import {getAssociationStatus} from "../Modules/user/user.repository.js";

const associationStatus = async(req,res,next) => {

    try{
        let sessionUserId= req.user[0].id;
        if(sessionUserId===parseInt(req.params.userId)){
            //when you view your own profile set it like you are your own associate
            res.locals.association='myself';
            next();
        }

        let status= await getAssociationStatus(res.locals.database,req.user[0].id,req.params.userId);
        if(status.associates){
             res.locals.association='associates';
             console.log(res.locals.association);
             next();
        }
        else{
            res.locals.association="not associated";
            next();
        }
        
    }
    catch(e){
        res.status(500).json({success:false,message:"Error during retrieving association status"});
    }
}
export {associationStatus};