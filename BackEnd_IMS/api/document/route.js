var express = require('express');
var router = express.Router();
const controller = require('./controller');

router.get('/studentDoc', controller.listStudentDocument)// api/student

router.use('/:id',controller.getStuedntDocController)

router.get('', controller.listDocument)// api/student
// router.post('', controller.listDocument)// api/student

router.post('',controller.PostDocumentController)

module.exports = router;


