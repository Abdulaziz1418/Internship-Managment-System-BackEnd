const { client } = require('../../config/db');

getDocumentsInfo = (callback)=>{

    client.query('SELECT student_id FROM document', function (err, result) {
        console.log('orgs')
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null, result.rows);
    });
};
getStudentDocumentsInfo= (callback)=>{

    client.query("SELECT  document.id as id,student.name as name, student.email as email , document.student_id as student_id, document.message as message, encode(document, 'base64') FROM document,student WHERE document.student_id=student.id ", function (err, result) {
        console.log('orgs')
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null, result.rows);
    });
};
getStudentDocModel=(id,callback)=>{


    client.query("SELECT document.id ,student.name as name, student.email as email , student.id as id, document.message as message,encode(document, 'base64') FROM document,student   WHERE document.student_id=student.id AND document.id=($1)",[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, result.rows[0]);
    });
};

postDocumentInfo = (req,callback)=>{

    client.query('INSERT INTO document (id, message ,document,student_id,training_committee_id) values(uuid_generate_v4(),$1,pg_read_binary_file($2)::bytea,$3,$4)',[req.message,`/Users/azizsuliman/Desktop/backend/TC_documents/${req.document}`,req.student_id,555555555], function (err, result) {
        console.log('orgs')
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null, result.rows);
    });
};


module.exports  = {
    getDocumentsInfo: getDocumentsInfo,
    postDocumentInfo:postDocumentInfo,
    getStudentDocumentsInfo:getStudentDocumentsInfo,
    getStudentDocModel:getStudentDocModel
}