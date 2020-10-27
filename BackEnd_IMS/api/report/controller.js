const model = require('./model');

listReport = (req, res, next) =>{


    model.getReportInfo(req.params.id,(err, result)=>{
        if(err){
            res.json(err)
        }
        res.json(result)
    });
}

PostReportController = (req, res, next) =>{


    model.postReportInfo(req.body,(err, result)=>{
        if(err){
            res.json(err)
        }
        res.json(result)
    });
}
getStuedntReportController = (req, res, next) => {
    model.getReport(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}

module.exports = {
    listReport,
    PostReportController,
    getStuedntReportController
}