const JwtStrategy=require('passport-jwt').Strategy;
const ExtractJwt=require('passport-jwt').ExtractJwt;
const User=require('../model/user');
const Config =require('../config/database');


module.exports=function(passport){
    
let opts={};
opts.jwtFromRequest=ExtractJwt.fromAuthHeader();
opts.secretOrKey=Config.secret;
passport.use(new JwtStrategy(opts,(jwt_payload,done)=>{
    console.log(jwt_payload);
    User.getUserByID(jwt_payload._doc._id,(err,user)=>{
        if(err){
            return done(err,false);
        }
        if(user){
            return done(user,true);
        }
        else
        {
            return done(null,false);
        }
    })
}))
}
