const model = require('./model')




postStudentVacancyController = (req, res, next) => {
    model.postStudentVacancyModel(req.body, (err, result) => {
        if (err) {
            res.status(400).json({ errorMessage: err.detail })
        }
        res.json(result)
    })

}


acceptStudentController = (req, res, next) => {
    model.acceptStudentVacancyModel(req.body, (err, result) => {
        if (err) {
            res.json(err)
        }
            res.json(result)

    });
    // model.acceptStudentModel(req.params.id, req.body,(err, result) => {
    //     if (err) {
    //         res.json(err)
    //     }
    //     res.json(result)
    // });
}
rejectStudentController = (req, res, next) => {

    model.rejectStudentModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    });
}

listStudentVacancyController = (req, res, next) => {


    model.listStudentVacancyModel((err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    });
}


getStudentVacancyController = (req, res, next) => {
    if (req.query.type == 'student') {
        model.getStudentVacancyModel(req.params.id, (err, result) => {
            if (err) {
                res.json(err)
            }
            res.json(result)
        })
    }
   else if (req.query.type == 'organization') {
        model.getStudentVacancyModelOrg(req.params.id, (err, result) => {
            if (err) {
                res.json(err)
            }
            res.json(result)
        })
    }

}

// listOrganizationController = (req, res, next) =>{


//     model.getOrganizationModel((err, result)=>{
//         if(err){
//             res.json(err)
//         }
//         res.json(result)
//     });
// }



module.exports = {
    postStudentVacancyController,
    getStudentVacancyController,
    listStudentVacancyController,
    acceptStudentController,
    rejectStudentController

}