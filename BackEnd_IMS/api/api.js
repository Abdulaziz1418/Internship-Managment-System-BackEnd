
const express = require('express')
var api = express.Router()

console.log('approve from api')

api.use('/organization', require('./org/route'));
api.use('/student', require('./student/route'));
api.use('/supervisor', require('./supervisor/route'));
api.use('/trainingcommittee', require('./training-committee/route'));
api.use('/vacancy', require('./vacancy/route'));
api.use('/document', require('./document/route'));
api.use('/report', require('./report/route'));
api.use('/student-vacancies', require('./student_vacancies/route'));

const readMultipleFiles = require('read-multiple-files');


module.exports = api