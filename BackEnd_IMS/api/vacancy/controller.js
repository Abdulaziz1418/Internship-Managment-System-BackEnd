const model = require('./model');



listVacancyController = (req, res, next) =>{


    model.listVacancyModel((err, result)=>{
        if(err){
            res.json(err)
        }
        res.json(result)
    });
}


postVacancyController = (req, res, next) => {
    model.postVcacancyModel(req.params.id,req.body, (err, result) => {
        if (err) {
            res.status(400).json({ errorMessage: err.detail })
        }
        res.json(result)
    })

}
deleteVacancyController = (req, res, next) => {
    console.log(req.params)
    model.deleteVacancyModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}

module.exports = {
    listVacancyController,
    postVacancyController,
    deleteVacancyController
}