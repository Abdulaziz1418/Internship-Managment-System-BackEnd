var express = require('express');
var router = express.Router();
const controller = require('./controller');
const auth = require('../auth')

//router.get('/:id',controller.getSupervisorController)

router.post('/login',controller.loginController)



router.post('/sign-up',controller.signUpController)
router.delete ('/:id',controller.deleteSupervisorController)


router.patch('/:id',controller.patchSupervisorController)//supervisor_id , organization_id , cv ,vacancy_id  assign Supervisor to vacancy and organization and supervisor 

router.get('/active',controller.listSupervisorActiveController)

router.post('',controller.postSupervisorController)
router.get('/:id',controller.getSupervisorController)
router.get('/student/:id',controller.getStudentSupervisorController)

router.get('',controller.listSupervisorController)

router.put('/approve/:id',controller.approveSupController)
router.delete('/:id',controller.deleteSupervisorController)

//router.get('/', controller.listSupervisor)// api/Supervisor


module.exports = router;