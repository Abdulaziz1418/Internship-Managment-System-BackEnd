var express = require('express');
var router = express.Router();
const controller = require('./controller');



router.delete('/:id',controller.deleteVacancyController)
router.post('/:id',controller.postVacancyController)
router.get('',controller.listVacancyController)

module.exports = router;


