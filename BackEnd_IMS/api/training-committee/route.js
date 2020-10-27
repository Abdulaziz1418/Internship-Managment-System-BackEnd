const express = require('express');
const router = express.Router();
const controller = require('./controller');


router.post('/login',controller.loginController)

router.post('/sign-up',controller.signUpController)

router.get('', controller.listTrainingCommittee)// api/student
router.use('/:id',controller.listTrainingCommittee)


module.exports = router;


