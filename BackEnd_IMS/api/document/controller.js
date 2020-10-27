const model = require('./model');



listDocument = (req, res, next) =>{


    model.getDocumentsInfo((err, result)=>{
        if(err){
            res.json(err)
        }
        res.json(result)
    });
}

PostDocumentController = (req, res, next) =>{


    model.postDocumentInfo(req.body,(err, result)=>{
        if(err){
            res.json(err)
        }
        res.json(result)
    });
}
listStudentDocument = (req, res, next) =>{


    model.getStudentDocumentsInfo((err, result)=>{
        if(err){
            res.json(err)
        }
        res.json(result)
    });
}
getStuedntDocController = (req, res, next) => {
    model.getStudentDocModel(req.params.id, (err, result) => {
        if (err) {
            res.json(err)
        }
        res.json(result)
    })

}


module.exports = {
    listDocument,
    PostDocumentController,
    listStudentDocument,
    getStuedntDocController
}