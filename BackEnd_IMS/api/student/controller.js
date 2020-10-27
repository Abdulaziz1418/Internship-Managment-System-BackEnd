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







signUpController = (req, res, next) => {
    const id = req.body.id
    const password = req.body.password
    const saltRounds = 12
    if (!id || !password) {
        res.status(422).send({ error: 'you must provide id and password' })
    }
    bcrypt.hash(password, saltRounds)
        .then((hash) => {
            return model.postStudentModel(req.body, hash, (err, result) => {
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

approveStudentController = (req, res, next) => {

    model.approveStudentModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    });
}
deleteStudentFromOrgsController = (req, res, next) => {

    model.deleteStudentFromOrgsModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
    });
    model.deleteStudentFromVacancyModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    });
}
approveOrgsController= (req, res, next) => {
    model.approveStudentVacancyModel(req.params.id,req.body, (err, result) => {
        if (err) {
            res.json(err)
        }
    });
    model.approveOrgsModel(req.params.id, req.body,(err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    });
}

listStudentController = (req, res, next) => {
    console.log('req', req.query.haveOrgs)
    if (req.query.haveOrgs == 'all') {
        model.listStudentModel((err, result) => {
            if (err) {
                res.json(err)
            }
            console.log("result", result)
            res.json(result)
        });
    }
    else if (req.query.haveOrgs == 'noOrgs') {
        model.listStudentModelNoOrgs((err, result) => {
            if (err) {
                res.json(err)
            }
            res.json(result)
        });
    }
    else if (req.query.haveOrgs == 'approve') {
        model.studentApproveModel((err, result) => {
            if (err) {
                res.json(err)
            }
            res.json(result)
        });
    }
    
    else{
        console.log('ELSEEEEEEE')
    }



}
postSupervisorToStudentController = (req, res, next) => {
    console.log("reqqq")
    model.postSupervisorToStudentModel(req, (err, result) => {
        if (err) {
            res.status(400).json({ errorMessage: err.detail })
        }
        res.json(result)
    })

}

getStuedntController = (req, res, next) => {
    model.getStudentModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}
getStuedntRecordController = (req, res, next) => {
    model.getStudentRecordModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}


deleteStudentController = (req, res, next) => {
    model.deleteStudentModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}


patchStudentController = (req, res, next) => {

    model.patchStudentModel(req.body, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    });
}
getStuedntController2 = (req, res, next) => {
    model.getStudentInfo(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}
getdataController = (req, res, next) => {
    model.getDataModel((err, result) => {

        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}



module.exports = {
    listStudentController,
    patchStudentController,
    getStuedntController,
    // postStudentController,
    deleteStudentController,
    signUpController,
    loginController,
    getStuedntController2,
    getdataController,
    approveStudentController,
    postSupervisorToStudentController,
    deleteStudentFromOrgsController,
    approveOrgsController,
    getStuedntRecordController
}

