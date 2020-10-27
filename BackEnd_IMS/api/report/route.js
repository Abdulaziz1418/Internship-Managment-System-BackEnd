var express = require('express');
var router = express.Router();
const controller = require('./controller');


router.get('/sup/:id', controller.listReport)// api/student

router.post('',controller.PostReportController)

router.use('/:id',controller.getStuedntReportController)




module.exports = router;