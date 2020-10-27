
const express = require('express');
const router = express.Router();
const passport=require('passport')
const authenticateJWT=require('../auth')

const controller = require('./controller');
router.put('/approve/:id',controller.approveStudentController)
router.put('/deleteFromOrg/:id',controller.deleteStudentFromOrgsController)
router.put('/:id',controller.approveOrgsController)


router.post('/login',controller.loginController)
router.delete('/:id',controller.deleteStudentController)// api/student/


router.post('/sign-up',controller.signUpController)
router.post('/:id',controller.postSupervisorToStudentController)

router.get('/:id',controller.getStuedntController)
router.get('/record/:id',controller.getStuedntRecordController)




router.patch('',controller.patchStudentController)//supervisor_id , organization_id , cv ,vacancy_id  assign student to vacancy and organization and supervisor 


//router.post('',controller.postStudentController)//id , name , email  , gpa  || creating new student 


router.get('',controller.listStudentController)

// router.get('',controller.getdataController)

module.exports = router;


