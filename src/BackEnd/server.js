import 'dotenv/config'; // loads .env before anything else reads process.env
import express from 'express';
const app = express();
import cors from 'cors';
import path from 'path';

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['POST', 'PUT', 'GET','DELETE', 'OPTIONS', 'HEAD'],
    credentials: true
}));

//we need to implement auth system later for files
app.use('/property-images',express.static(path.join(import.meta.dirname,'/imageUploads/properties'))); 
app.use('/profile-images',express.static(path.join(import.meta.dirname,'/imageUploads/profiles'))); 


import bodyParser from 'body-parser';
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ extended: true,limit:'50mb' }));
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({ extended: true,limit:'50mb' }));
import {connection} from './dbconfig.js';


import userRouter from './Modules/user/user.routes.js';
import propertyRouter from './Modules/property/property.routes.js';

import passport from 'passport';
import session from 'express-session';

import {valkeyClient} from './valkeyClient.js';
import { RedisStore } from 'connect-redis';     

const redisStore=new RedisStore({ client: valkeyClient,prefix: "sess:" })

app.use(
    session({
        store: redisStore,
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === 'production', // only transmit cookie over https in production
            httpOnly: true, // prevent client side JS from reading the cookie
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' requires secure:true, needed if frontend/backend end up on different domains in production
            maxAge: 1000 * 60 * 10, // session max age in milliseconds
        },
    })
);
app.use(passport.initialize());
app.use(passport.session());
import {passportConfig} from  './utils/passportAuthStrategy.js';
passportConfig(connection);


app.use("/api/user",userRouter({db:connection,redisStore:redisStore}));
app.use("/api/property",propertyRouter({db:connection}));



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});