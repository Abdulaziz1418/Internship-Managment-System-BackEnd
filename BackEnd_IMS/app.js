const express = require('express');
const { client } = require('./config/db');
var app = express();
const { tabels } = require('./models/tabels');
const { supervisors } = require('./queries/supervisor'); 
const { organizationss } = require('./queries/organizations');
const { vacancies } = require('./queries/vacancies');
const { student } = require('./queries/students');
const bodyParser = require('body-Parser')
var boolParser = require('express-query-boolean');
const cors = require('cors');
const bearerToken = require('express-bearer-token');
app.use(bearerToken());
var multer = require('multer');
var path = require('path');
var pathh = require('path');

var port = 4000;
const fs = require('fs');
const pdf = require('express-pdf');



app.set('port', process.env.PORT || 4000);

app.use(boolParser());

app.use(bodyParser.json());

console.log('approve from appp')

app.use('/api', require('./api/api.js'));

// specify the folder
app.use(express.static(path.join(__dirname, 'uploads')));
// headers and content type
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var storage = multer.diskStorage({

    // destination
    destination: function (req, file, cb) {
      cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });
  var upload = multer({ storage: storage });
  app.post("/upload", upload.array("uploads[]", 12), function (req, res) {
    console.log('files', req.files);
    console.log('PATHHHHH : ',req.files[0].path)
    res.send(req.files);
  });

  app.use(express.static(pathh.join(__dirname, 'StudentReports')));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  var storage = multer.diskStorage({

    // destination
    destination: function (req, file, cb) {
      cb(null, './StudentReports/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  var StudentReport = multer({ storage: storage });
  app.post("/StudentReport", StudentReport.array("StudentReports[]", 12), function (req, res) {
    console.log('files', req.files);
    console.log('PATHHHHH : ',req.files[0].path)
    res.send(req.files);
  });
  //TC Documents
  app.use(express.static(pathh.join(__dirname, 'TC_documents')));
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
  
  var storage = multer.diskStorage({

    // destination
    destination: function (req, file, cb) {
      cb(null, './TC_documents/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    }
  });

  var TC_documents = multer({ storage: storage });
  app.post("/TC_documents", TC_documents.array("TC_documents[]", 12), function (req, res) {
    console.log('files', req.files);
    console.log('PATHHHHH : ',req.files[0].path)
    res.send(req.files);
  });

app.listen(4000, function () {
    console.log('Server is running.. on Port 4000');
});

