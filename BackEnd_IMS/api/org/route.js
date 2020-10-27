var express = require('express');
var router = express.Router();
const controller = require('./controller');
const auth = require('../auth')



router.post('/login',controller.loginController)

router.post('/sign-up',controller.signUpController)

// router.get('', controller.listOrganizationController)// api/orginzation
router.get('/active',controller.listAllOrganizationController)
router.put('/approve/:id',controller.approveOrgsController)

router.get('/:id',controller.listOrganizationController)
router.delete('/:id',controller.deleteOrgsController)

module.exports = router;