const { client } = require('../../config/db');


postStudentVacancyModel=(body,callback)=>{
    
        client.query("INSERT INTO student_vacancies( student_id  , vacancy_id,status ) values($1, $2,$3);",[body.student_id,body.vacancy_id,"PENDING"], function (err, result){
    
            if (err) {
                console.log(err);
                callback(err);
    
            }
            
            callback(null, body);
        });
    
    };
    listStudentVacancyModel=(callback)=>{
console.log('STUDENTTTTTTTTT    ::: ')

        client.query('select organization.name as organization_name ,organization.id as organization_id,vacancies.job_title, student.name as student_name,student.id as student_id ,student_vacancies.status as status  from student_vacancies INNER JOIN  vacancies ON student_vacancies.vacancy_id=vacancies.id INNER JOIN organization ON vacancies.organization_id=organization.id INNER JOIN student ON student_vacancies.student_id = student.id ;',function (err, result) {
    
            if (err) {
                console.log(err);
                callback(err);
    
            }
            
            callback(null, result.rows);
        });
    }
    acceptStudentVacancyModel=(body,callback)=>{///supervisor_id , organization_id , cv ,vacancy_id  
         client.query( 'UPDATE student_vacancies SET status=($2) WHERE student_vacancies.student_id=($1);', [body.student_id,"Accepted"], function (err, result) {
                 if (err) {
                     console.log(err);
                     callback(err);
         
                 }
         
                 callback(null, result.rows);
             });
         }
        //  acceptStudentModel=(id,body,callback)=>{
        //      console.log('Body :: ',body)
        //      client.query( 'UPDATE student SET organization_id=($1),vacancy_id=($3) WHERE student.id=($2);', [id,body.student_id,body.vacancy_id], function (err, result) {
        //              if (err) {
        //                  console.log(err);
        //                  callback(err);
             
        //              }
             
        //              callback(null, result.rows);
        //          });
        //      }
         rejectStudentModel=(body,callback)=>{///supervisor_id , organization_id , cv ,vacancy_id  
            console.log(body)
             client.query( 'UPDATE student_vacancies SET status=($2) WHERE student_vacancies.student_id=($1);', [body,"Rejected"], function (err, result) {
                     if (err) {
                         console.log(err);
                         callback(err);
             
                     }
             
                     callback(null, result.rows);
                 });
             }
    

    getStudentVacancyModel=(id,callback)=>{


        client.query('select organization.name as organization_name ,organization.id as organization_id,vacancies.job_title,vacancies.id as vacancy_id ,student.name as student_name, student_vacancies.status as status  from student_vacancies INNER JOIN  vacancies ON student_vacancies.vacancy_id=vacancies.id INNER JOIN organization ON vacancies.organization_id=organization.id INNER JOIN student ON student_vacancies.student_id = student.id where student_vacancies.student_id=($1)',[id],function (err, result) {
    
            if (err) {
                console.log(err);
                callback(err);
    
            }
            
            callback(null, result.rows);
        });
    }
    getStudentVacancyModelOrg=(id,callback)=>{


        client.query('select organization.name as organization_name ,vacancies.job_title,vacancies.id as vacancy_id ,student.name as student_name, student.id as student_id, student_vacancies.status as status  from student_vacancies INNER JOIN  vacancies ON student_vacancies.vacancy_id=vacancies.id INNER JOIN organization ON vacancies.organization_id=organization.id INNER JOIN student ON student_vacancies.student_id = student.id where organization.id=($1) AND student_vacancies.status=($2)',[id,'PENDING'],function (err, result) {
    
            if (err) {
                console.log(err);
                callback(err);
    
            }
            
            callback(null, result.rows);
        });
    }
//select student_vacancies.status  , student.name,vacancies.job_title from student INNER JOIN student_vacancies on student.id=student_vacancies.student_id INNER JOIN vacancies on vacancies.id=student_vacancies.vacancy_id where student_vacancies.student_id=($1)',[id],function (err, result) {
    

module.exports  = {

    postStudentVacancyModel:postStudentVacancyModel,
    getStudentVacancyModel:getStudentVacancyModel,
    listStudentVacancyModel:listStudentVacancyModel,
    getStudentVacancyModelOrg:getStudentVacancyModelOrg,
    acceptStudentVacancyModel:acceptStudentVacancyModel,
    rejectStudentModel:rejectStudentModel,
    // acceptStudentModel:acceptStudentModel
}