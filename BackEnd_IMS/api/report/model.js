const { client } = require('../../config/db');

getReportInfo = (id,callback)=>{
console.log('WWWWWWWWWW,lkdfkjgdfkgnkdjfg')
    client.query("SELECT  report.id as id,student.name as name, student.email as email , report.student_id as student_id, report.name as Rname, encode(report, 'base64') FROM report,student WHERE report.student_id=student.id AND student.supervisor_id=($1)",[id] , function (err, result) {
        console.log('orgs')
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null, result.rows);
    });
};

getReport=(id,callback)=>{


    client.query("SELECT  student.supervisor_id as sup_id,report.id as id,student.name as name, student.email as email , report.student_id as student_id, report.name as Rname, encode(report, 'base64') FROM report,student,supervisor WHERE report.student_id=student.id AND student.supervisor_id=supervisor.id AND report.id=($1)",[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, result.rows[0]);
    });
};

postReportInfo = (req,callback)=>{

    client.query('INSERT INTO report (id, name ,report,student_id)values (uuid_generate_v4(),$1,pg_read_binary_file($2)::bytea,$3)',[req.name,`/Users/azizsuliman/Desktop/backend/StudentReports/${req.report}`,req.student_id], function (err, result) {
        console.log('orgs')
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null, result.rows);
    });
};


module.exports  = {
    getReportInfo: getReportInfo,
    postReportInfo:postReportInfo,
    getReport:getReport
}