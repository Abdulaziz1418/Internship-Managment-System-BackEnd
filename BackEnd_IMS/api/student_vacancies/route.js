var express = require('express');
var router = express.Router();
const controller = require('./controller');


router.get('/:id',controller.getStudentVacancyController)

router.patch('/:id',controller.acceptStudentController)
router.post('',controller.postStudentVacancyController)
router.get('',controller.listStudentVacancyController)
router.put('/accept/:id',controller.acceptStudentController)
router.put('/reject/:id',controller.rejectStudentController)


module.exports = router;

