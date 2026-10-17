
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

//mirrors the frontend's PrivateRoute: blocks pending(0), declined(-3), restricted(-2) and no-active-plan(-1) roles
//from member-only functionality, not just unauthenticated requests
const isActiveMember = (req,res,next) => {

    try{
        if (req.isAuthenticated()) {
            const user=req.user[0];
            if (user.role>=1) {
                next()
            }
            else{
                res.status(403).json({message:"Your account does not have access to this feature",isActiveMember:false});
            }
        }
        else{
            res.status(401).json({message:"User is NOT logged in",isAuthenticated:false});
        }
    }
    catch(e){
        res.status(401).json({message:"Error during Authorization",isAuthenticated:false});
    }
}

export {isAuthenticated, isActiveMember};