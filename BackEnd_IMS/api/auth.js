const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const cookieParser = require('cookie-parser')
const express = require('express');

const accessTokenSecret = 'pigjrfe'

authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    
    console.log('AUTHHH :: ',req.params.id)
    if (authHeader) {
        const token = authHeader.split(' ')[1];
        console.log(token)
        
        jwt.verify(token, accessTokenSecret, (err, user) => {
            
            if (err) {
                console.log("if")
                return res.sendStatus(err);
            }
            if(req.params.id!=user.sub){
               req.params.id=user.sub
            }
            req.user = user;
            console.log(user)
            next();
        });
    } else {
        console.log("user")
        res.sendStatus(401);
    }
};



localOption = {
    idField: 'id',
}
const LoginController = new LocalStrategy(localOption, (password, passwordvalid, done) => {

            bcrypt.compare(password,passwordvalid)
                .then((validPassword) => {
                    if (validPassword) {
                        return done(null, validUser)
                    }
                    return done(null, false)
                })
                .catch(err => done(err, false))
        })
        passport.use(LoginController)

        module.exports = {authenticateJWT}