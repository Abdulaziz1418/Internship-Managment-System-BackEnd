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


    model.getOrganizationModel(req.params.id,(err, result)=>{
        if(err){
            res.json(err)
        }
        res.json(result)
    });
}
listAllOrganizationController = (req, res, next) =>{


    model.getOrganizationActiveModel((err, result)=>{
        if(err){
            res.json(err)
        }
        res.json(result)
    });
}
approveOrgsController = (req, res, next) => {

    model.approveOrgsModel(req.params.id, (err, result) => {
        if (err) {
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
    const name = req.body.name
    const password = req.body.password
    const saltRounds = 12
    if (!name || !password) {
        res.status(422).send({ error: 'you must provide name and password' })
    }
    bcrypt.hash(password, saltRounds)
        .then((hash) => {
            return model.postOrganizationModel(req.body, hash, (err, result) => {
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
console.log('NAMEEEEEE : ',req.body)
    model.loginModelCheckUser(req.body.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        if (result.name == null) {
            console.log('RRRRRRR ::',result.id)
            res.status(404).send("user not")

        }
        if (result.active == null) {
            res.status(404).send("Waite Training Committee approve")
        }
        compare = (password, passwordvalid) => {
            return bcrypt.compare(password, passwordvalid)
                .then((validPassword) => {
                    console.log("valid pass :", validPassword)

                    if (validPassword == true) {

                        user = {
                            tokent: tokenForUserLogin(req.body),
                            id: result.id,
                            name: req.body.name
                        }
                        console.log('UUUSSSSEEEERRR ::  ',user)
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

deleteOrgsController = (req, res, next) => {
    console.log(req.params)
    model.deleteOrgsModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}

module.exports = {
    listOrganizationController,
    signUpController,
    loginController,
    listAllOrganizationController,
    approveOrgsController,
    deleteOrgsController
}
