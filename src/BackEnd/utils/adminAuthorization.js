
const isAdmin = (req,res,next) => {
    //check if the user is logged in and then check for admin privileges.
    try{
        if (req.isAuthenticated()) {//custom passport method to check if user is logged in and check if client is who he says he is
            const user=req.user[0]; //asking db for user data based on session credentials
            if (user.role===10 || user.role===69) {//check if user is admin(10) or SupperAdmin(69)
                next()
            }
            else{
                res.status(401).json({message:"You DO NOT have Administration privileges",isAdmin:false});
            }
        }
        else{
            res.status(401).json({message:"User is NOT logged in",isAuthenticated:false});
        }

    }
    catch(e){
        res.status(401).json({message:"Error during admin Authorization",isAdmin:false,isAuthenticated:false});
    }
}
export {isAdmin};