import Strategy from "passport-local";
const LocalStrategy = Strategy;
import passport from "passport";
import bcrypt from "bcrypt";
import * as userService from '../Modules/user/user.service.js';

export  const passportConfig = (database) => {
    passport.use(
        new LocalStrategy(
            { usernameField: "username", passwordField: "password"},
            async (username, password, done) => {
                try{
                    const result = await userService.getUserCredentials({database: database, username: username});
                    const user=result.user;
                    
                    if (!user) {
                        return done(null, false,{message:"Invalid Username",isAuthenticated:false});
                    }
                    if (!bcrypt.compareSync(password, user.password)) {
                        return done(null, false, {message: "Invalid password",isAuthenticated:false});
                    }
                    return done(null, user,);
                }
                catch (e) {
                    return done(null,e,{message:"Error during authentication",isAuthenticated:false});
                }
            }
        )
    );

    //initializes a session with user_id
    passport.serializeUser((user, done) => {
        done(null, {id:user.user_id,role:user.role});
    });

    passport.deserializeUser(async (userData, done) => {
        const error = { message: "Error during deserialization", isAuthenticated: false};
        console.log(userData);
        const user = await userService.getUserPassport({ database: database, id: userData.id });
        if (!user) {
            return done(error, false);
        }
        done(null, user);
    });
};