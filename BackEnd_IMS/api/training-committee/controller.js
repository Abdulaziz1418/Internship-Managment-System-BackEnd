const model = require('./model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const express = require('express');
var app = express();


listOrganizationController = (req, res, next) =>{


    model.getOrganizationModel((err, result)=>{
        if(err){
            res.json(err)
        }
        res.json(result)
    });
}
const tokenForUserLogin = (user) => {
    const timestamp = new Date().getTime()
    const secret = 'pigjrfe'

    return jwt.sign({ sub: user.id, iat: timestamp, exp: 1000 * 60 * 60 }, secret)


}







signUpController = (req, res, next) => {
    const id = req.body.id
    const password = req.body.password
    const saltRounds = 12
    if (!id || !password) {
        res.status(422).send({ error: 'you must provide id and password' })
    }
    bcrypt.hash(password, saltRounds)
        .then((hash) => {
            return model.postTrainingCommitteeModel(req.body, hash, (err, result) => {
                if (err) {
                    res.status(400).json({ errorMessage: err.detail })
                }
                res.status(200)

            })
        }).catch((err) => {
            return next(err)
        })


}
loginController = (req, res, next) => {

    model.loginModelCheckUser(req.body.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        if (result.id == null) {
            res.status(404).send("user not")

        }
        compare = (password, passwordvalid) => {
            return bcrypt.compare(password, passwordvalid)
                .then((validPassword) => {
                    console.log("valid pass :", validPassword)

                    if (validPassword == true) {

                        user = {
                            tokent: tokenForUserLogin(req.body),
                            id: req.body.id
                        }
                        res.send(user)
                    }
                    else {
                        res.status(404).send("invalid password or id")
                    }
                })
        }

        compare(req.body.password, result.password)






    })






}


listTrainingCommittee = (req, res, next) =>{


    model.getTrainingCommittee(req.params.id,(err, result)=>{
        if(err){
            res.json(err)
        }
        res.json(result)
    });
}


module.exports = {
    listTrainingCommittee,
    signUpController,
    loginController
}