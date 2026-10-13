
const isAuthenticated = (req,res,next) => {

    try{
        if (req.isAuthenticated()) {//custom passport method to check if user is logged in and check if client is who he says he is
            next()
        }
        else{
            res.status(401).json({message:"User is NOT logged in",isAuthenticated:false});
        }
    }
    catch(e){
        res.status(401).json({message:"Error during Authorization",isAuthenticated:false});
    }
}

export {isAuthenticated};