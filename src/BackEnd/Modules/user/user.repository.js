
const USER_PUBLIC_COLUMNS = '`user_id`,`name`,`surname`,`business_name`,`AFM`,`area_of_operation`,`email`,`phone_landline`,`phone_mobile`,`role`,`username`,`profile_image`';

const getAllUsers= async (database)=>{
    const sql = `SELECT ${USER_PUBLIC_COLUMNS} FROM \`users\``;
    const [rows] = await database.query(sql);

    return rows;

}

const getUserByID= async (database,id)=>{
    const sql = 'SELECT * FROM `users` where `user_id`= ?';
    let values=[parseInt(id)];
    const [rows] = await database.execute(sql,values);
    if(rows.length===0){
        return {fountUser:false,message:"No users found matching the given id"};
    }
    return rows;

}

const getProfilePicture= async (database,userId)=>{
    const sql = 'SELECT profile_image FROM `users` where `user_id`= ?';
    let values=[userId];
    const [rows] = await database.execute(sql,values);
    if(rows.length===0){
        return {success:false,message:"Error getting profile picture"};
    }
    return {success:true,profileImage:rows[0].profile_image};

}

const createUser= async (database,userData)=>{
    const connection= await database.getConnection();
    let RegisterUserSuccess=false;
    let CreateRequestSuccess=false;

    const role= 0 // role_id of roles table referencing AprovalPendingUser
    const valuesUser= [userData.name,userData.surname,userData.business_name,userData.AFM,userData.area_of_operation,userData.email,userData.phone_mobile,userData.phone_landline,role,userData.username,userData.password];
    const sqlUser = 'INSERT INTO `users`(`name`,`surname`,`business_name`,`AFM`,`area_of_operation`,`email`,`phone_mobile`,`phone_landline`,`role`,`username`,`password`) VALUES (?,?,?,?,?,?,?,?,?,?,?)';

    const [result] = await connection.execute(sqlUser,valuesUser);

    //if the user inserted successfully, create the request
    if(result.affectedRows){
        RegisterUserSuccess=true;

        const id=result.insertId;
        const valuesRequest= [id];
        const sqlRequest = 'INSERT INTO `registrationrequests`(`request_date`,`status`,`user_id`) VALUES (NOW(),0,?)';

        const [result3] = await connection.execute(sqlRequest,valuesRequest);

        if(result3.affectedRows){
            CreateRequestSuccess=true;
        }
    }

    connection.release();
    return {registerUserSuccess:RegisterUserSuccess,createRequestSuccess:CreateRequestSuccess};

}



const checkUsernameExists= async (database,username)=>{
    const sql = 'SELECT user_id FROM `users` where `username`= ?';
    let values=[username];
    const [rows] = await database.execute(sql,values);
    if(rows.length===0){
        return {usernameExists:false,message:"username available"};
    }
    return {usernameExists:true,message:"username unavailable"};

}
const getUserByUsername= async (database,username)=>{
    const sql = `SELECT ${USER_PUBLIC_COLUMNS} FROM \`users\` where \`username\`= ?`;
    let values=[username];
    const [rows] = await database.execute(sql,values);
    if(rows.length===0){
        return {success:false,message:"No user found matching this username"};
    }
    return {success:true,user:rows[0]};

}

//keeps the password hash, unlike getUserByUsername above - only for internal use by the login strategy, never returned to a client
const getUserCredentials= async (database,username)=>{
    const sql = 'SELECT * FROM `users` where `username`= ?';
    let values=[username];
    const [rows] = await database.execute(sql,values);
    if(rows.length===0){
        return {success:false,message:"No user found matching this username"};
    }
    return {success:true,user:rows[0]};

}


const getUserPassport= async (database,id)=>{
    const sql = 'SELECT user_id as id,username,name,role FROM `users` where `user_id`= ?';
    let values=[parseInt(id)];
    const [rows] = await database.execute(sql,values);
    if(rows.length===0){
        return {message:"No users found matching the given id"};
    }
    return rows;

}



const checkSubscription= async (database,id)=>{
    const sql = 'SELECT * FROM `subscriptions` where `user_id`= ?';
    let values=[parseInt(id)];
    const [rows] = await database.execute(sql,values);
    if(rows.length===0){
        return {plan:"none"};
    }
    return {plan:rows[0].sub_plan};

}

const getPendingRegistrationRequests= async (database)=>{
    const sql = 'SELECT * FROM `registrationrequests` where `status`= 0';
    const [rows] = await database.query(sql);

    return rows;

}
const getApprovedRegistrationRequests= async (database)=>{
    const sql = 'SELECT * FROM `registrationrequests` where `status`= 1';
    const [rows] = await database.query(sql);

    return rows;

}
const getDeclinedRegistrationRequests= async (database)=>{
    const sql = 'SELECT * FROM `registrationrequests` where `status`= 2';
    const [rows] = await database.query(sql);

    return rows;

}


const approveRegistrationRequest= async (database,approver,request)=>{

    const values=[approver,request];
    const sql = 'update registrationrequests set status=1, approver_id=? where request_id=?';
    const [result] = await database.execute(sql,values);
    if(result.affectedRows){
        return {message:"Request approved successfully",success:true};
    }
    else{
        return {message:"Error during approve request",success:false};
    }
}
const declineRegistrationRequest= async (database,approver,request)=>{

    const values=[approver,request];
    const sql = 'update registrationrequests set status=2, approver_id=? where request_id=?';
    const [result] = await database.execute(sql,values);
    if(result.affectedRows){
        return {message:"Request declined successfully",success:true};
    }
    else{
        return {message:"Error during decline request",success:false};
    }

}

const getUserByBusinessName= async (database,businessName)=>{
    const name="%"+businessName+"%"
    const values=[name]
    console.log(values)
    const sql = `SELECT ${USER_PUBLIC_COLUMNS} FROM users where business_name LIKE ?`;
    const [rows] = await database.query(sql,values);
    if(rows.length===0){
        return {success:false,message:"No users found matching the given business name"};
    }
    return {success:true,users:rows};

}

const createAssociationRequest= async (database,requestorId,requesteeId)=>{

    const values= [requestorId,requesteeId];
    const sql = 'INSERT INTO `associationrequests`(`requestor_id`,`requestee_id`,`date_sent`) VALUES (?,?,NOW())';

    const [result] = await database.query(sql,values);

    if(result.affectedRows===0){
        return {success:false,message:"Failed to Send association request..."};
    }
        
    return {success:true,message:"Association request sent successfuly..."};
        

}

const cancelAssociationRequest= async (database,userId,requestId)=>{

    const values=[userId,requestId];
    const sql = 'update associationrequests set request_status=-1, date_answered=NOW() where requestor_id=? AND id=?';
    const [result] = await database.query(sql,values);
    if(result.affectedRows===0){
        return {message:"Error during approve request",success:false};        
    }
        
    return {message:"Request canceled successfully",success:true}; 

}

const acceptAssociationRequest= async (database,userId,requestId)=>{

    const values=[userId,requestId];
    const sql = 'update associationrequests set request_status=1, date_answered=NOW() where requestee_id=? AND id=?';
    const [result] = await database.query(sql,values);
        
    if(result.affectedRows===0){
        return {message:"Error during approve request",success:false};        
    }
        
    return {message:"Request approved successfully",success:true}; 

}

const declineAssociationRequest= async (database,userId,requestId)=>{

    const values=[userId,requestId];
    const sql = 'update associationrequests set request_status=2, date_answered=NOW() where requestee_id=? AND id=?';
    const [result] = await database.query(sql,values);
        
    if(result.affectedRows===0){
        return {message:"Error during decline request",success:false};

    }
    return {message:"Request declined successfully",success:true};

        
}

const getAssociationStatus= async (database,userId1,userId2)=>{
    // if users are associated returns true else returns false
    const values=[userId1,userId2]
    const sql = 'SELECT EXISTS (SELECT * FROM associates WHERE user_id=? and friend_id=? LIMIT 1) as `association_exists`';
    const [rows] = await database.query(sql,values);
         
    if(rows[0].association_exists){
     return {associates:true};
    }

    return {associates:false};

}

const getAssociationRequest= async (database,userId1,userId2)=>{
    // get request if not declined
    const values=[userId1,userId2,userId2,userId1]
    const sql = 'SELECT * FROM `associationrequests` where ((requestor_id=? AND requestee_id=?) OR (requestor_id=? AND requestee_id=?)) AND request_status=0';
    const [rows] = await database.query(sql,values);
         
    if(rows.length===0){
     return {found:false};
    }    
    return {found:true,data:rows[0]};

}

const createAssociation= async (database,requesteeId,requestorId)=>{

    const values= [requestorId,requesteeId,requesteeId,requestorId];
    const sql = 'INSERT INTO `associates`(`user_id`,`friend_id`,`association_date`) VALUES (?,?,NOW()),(?,?,NOW())';

    const [result] = await database.query(sql,values);
    console.log(result);
    if(result.affectedRows===0){
        return {success:false,message:"Failed to create association..."};
    }
        
    return {success:true,message:"Association created successfuly..."};
        

}

const deleteAssociation= async (database,userA,userB)=>{

    const values= [userA,userB,userB,userA];
    const sql = 'DELETE FROM `associates`WHERE ((user_id=? AND friend_id=?)OR(user_id=? AND friend_id=?))';

    const [result] = await database.query(sql,values);
    if(result.affectedRows===0){
        return {success:false,message:"Failed to delete association..."};
    }
        
    return {success:true,message:"Association deleted successfuly..."};
        

}


const getAssociates= async (database,userId)=>{
    try {
        const sql = 'SELECT friend_id AS user_id,name,surname,business_name,username,area_of_operation FROM associates JOIN users ON associates.friend_id=users.user_id WHERE associates.user_id= ?';
        let values=[userId];
        console.log(userId)
        const [rows] = await database.execute(sql,values);
        if(rows.length===0){
            return {success:false,message:"No Associates Found"};
        }
        return {success:true,users:rows};

    } catch (err) {
        console.log(err)

        throw err;
    }
}

const uploadProfilePicture=async(database,profilePicture,userId)=>{

    try{
        let values=[profilePicture,userId];
        
        let sql=  'UPDATE `users` SET profile_image=? WHERE user_id=?';
        
        const [result]=await database.execute(sql,values);
        if(result.affectedRows){
            return {success:true,message:"User Profile Picture uploaded successfully"};
        }

        return {success:false,message:"Error when uploading Profile Picture"};

    }
    catch(e){
        console.log(e);
        throw e;
    }
}

const updateUserRole=async(database,userId,role)=>{

    try{
        let values=[role,userId];
        
        let sql=  'UPDATE `users` SET role=? WHERE user_id=?';
        
        const [result]=await database.execute(sql,values);
        if(result.affectedRows){
            return {success:true,message:"User Role Updated successfully"};
        }
        return {success:false,message:"Error when updating user role"};

    }
    catch(e){
        console.log(e);
        throw e;
    }
}

export {getProfilePicture,getUserByBusinessName,getUserByID,getAllUsers,createUser,getUserByUsername,getUserCredentials,getUserPassport,checkUsernameExists,checkSubscription,getPendingRegistrationRequests,getApprovedRegistrationRequests,getDeclinedRegistrationRequests,approveRegistrationRequest,declineRegistrationRequest,createAssociationRequest,acceptAssociationRequest,declineAssociationRequest,getAssociationStatus,getAssociationRequest,cancelAssociationRequest,createAssociation,deleteAssociation,getAssociates,uploadProfilePicture,updateUserRole};