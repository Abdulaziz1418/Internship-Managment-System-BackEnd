const model = require('./model');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt
const passport = require('passport')
const express = require('express');
var app = express();


const tokenForUserLogin = (user) => {
    const timestamp = new Date().getTime()
    const secret = 'pigjrfe'

    return jwt.sign({ sub: user.id, iat: timestamp, exp: 1000 * 60 * 60 }, secret)


}


listSupervisorController = (req, res, next) => {
    
        model.listSupervisorModel((err, result) => {
            if (err) {
                res.json(err)
            }
            res.json(result)
        })
    }
    listSupervisorActiveController = (req, res, next) => {
    
        model.listSupervisorActiveModel((err, result) => {
            if (err) {
                res.json(err)
            }
            res.json(result)
        })
    }
    
    approveSupController = (req, res, next) => {

        model.approveSupModel(req.params.id, (err, result) => {
            if (err) {
                res.json(err)
            }
            res.json(result)
        });
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
            return model.postSupervisorModel(req.body, hash, (err, result) => {
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









getSupervisorController = (req, res, next) => {
    model.getSupervisorModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}
getStudentSupervisorController = (req, res, next) => {
    model.getStudentSupervisorModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}


deleteSupervisorController = (req, res, next) => {
    console.log(req.params)
    model.deleteSupervisorModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}




patchSupervisorController = (req, res, next) => {

    model.patchSupervisorModel(req.body, (err, result) => {
        console.log('hot')
        if (err) {
            res.json(err)
        }
        res.json(result)
    });
}


postSupervisorController = (req, res, next) => {
    model.postSupervisorModel(req.body, (err, result) => {
        if (err) {
            res.status(400).json({ errorMessage: err.detail })
        }
        res.json(result)
    })

}


module.exports = {
    listSupervisorController,
    patchSupervisorController,
    getSupervisorController,
    postSupervisorController,
    deleteSupervisorController,
    loginController,
    signUpController,
    getStudentSupervisorController,
    listSupervisorActiveController,
    approveSupController
}