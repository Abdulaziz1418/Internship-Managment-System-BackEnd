const { client } = require('../../config/db');



listStudentModel=(callback)=>{

    client.query('SELECT  id,name,gpa,email FROM student ', function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        

        callback(null, result.rows);
    });
};

listStudentModelNoOrgs=(callback)=>{

    client.query('SELECT    id, name, gpa   FROM student  WHERE supervisor_id IS NULL AND organization_id IS NULL AND vacancy_id IS NULL', function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        

        callback(null, result.rows);
    });
};



deleteStudentModel=(id,callback)=>{


    client.query('DELETE FROM student WHERE student.id=($1) ',[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, result.rows[0]);
    });
};


getStudentModel=(id,callback)=>{


    client.query("SELECT  student.supervisor_id as sup_id, student.name as name, student.gpa as gpa ,student.email as email , student.id as id,encode(cv ,'base64') FROM student   WHERE student.id=($1)",[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, result.rows[0]);
    });
};
getStudentRecordModel=(id,callback)=>{


    client.query("SELECT  encode(academic_record,'base64') FROM student   WHERE student.id=($1)",[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, result.rows[0]);
    });
};

getStudentInfo=(id,callback)=>{
    client.query("SELECT   student.name as name, student.id as id, student.email as email, student.gpa as gpa , encode(cv, 'base64')  FROM student ",function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, result.rows);
    });
}
getDataModel=(callback)=>{
    client.query('SELECT pg_typeof("cv") from student',function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        console.log("",result.row)
        callback(null, result.rows);
    });
}
loginModelCheckUser=(id,callback)=>{

    client.query('SELECT id,password,active FROM student WHERE student.id=($1)',[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        callback(null, result.rows[0]);

    });
};

postStudentModel=(body,hash,callback)=>{

console.log('CVVVVV : ',body.cv)
    client.query("INSERT INTO student( id, password , name , email  , gpa ,cv,academic_record) values($1, $2,$3,$4,$5,pg_read_binary_file($6)::bytea,pg_read_binary_file($7)::bytea) ;",[body.id,hash,body.name,body.email,body.gpa,`/Users/azizsuliman/Desktop/backend/uploads/${body.cv}`,`/Users/azizsuliman/Desktop/backend/uploads/${body.academicRecord}`], function (err, result){

        if (err) {
            console.log(err);
            callback(err);

        }
        newUser=[body.id,hash]
        console.log("newUser ::", newUser)
        callback(null, newUser);
    });

};

postSupervisorToStudentModel=(req,callback)=>{


    client.query("UPDATE student SET supervisor_id=($1) WHERE  id=($2);",[req.body.supervisor_id,req.params.id], function (err, result){

        if (err) {
            console.log(err);
            callback(err);

        }

        callback(null, result);
    });

};
approveOrgsModel=(id,body,callback)=>{
console.log(body)

    client.query("UPDATE student SET organization_id=($1),vacancy_id=($2) WHERE  id=($3);",[body.organization_id,body.vacancy_id,id], function (err, result){

        if (err) {
            console.log(err);
            callback(err);

        }

        callback(null, result);
    });

};
approveStudentVacancyModel=(id,body,callback)=>{///supervisor_id , organization_id , cv ,vacancy_id  
    client.query( 'UPDATE student_vacancies SET status=($3) WHERE student_vacancies.student_id=($1) AND student_vacancies.vacancy_id=($2);', [id,body.vacancy_id,"Approved"], function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
    
            }
    
            callback(null, result.rows);
        });
    }

// patchStudentModel=(body,callback)=>{///supervisor_id , organization_id , cv ,vacancy_id  
   
// client.query( 'UPDATE student SET organization_id=($2),  vacancy_id=($3) WHERE student.id=($1)', [body.id,body.organization_id,body.vacancy_id], function (err, result) {
//         if (err) {
//             console.log(err);
//             callback(err);

//         }

//         callback(null, result.rows);
//     });
// }

patchStudentModel=(body,callback)=>{///supervisor_id , organization_id , cv ,vacancy_id  
   
    client.query( 'ALTER TABLE student ADD COLUMN academic_record bytea', function (err, result) {
            if (err) {
                console.log(err);
                callback(err);
    
            }
    
            callback(null, result.rows);
        });
    }





    approveStudentModel=(body,callback)=>{///supervisor_id , organization_id , cv ,vacancy_id  
        console.log(body)
         client.query( 'UPDATE student SET active=($2) WHERE student.id=($1);', [body,1], function (err, result) {
                 if (err) {
                     console.log(err);
                     callback(err);
         
                 }
         
                 callback(null, result.rows);
             });
         }
         deleteStudentFromOrgsModel=(body,callback)=>{  
            console.log(body)
             client.query( 'UPDATE student SET organization_id = NULL,vacancy_id = NULL WHERE student.id=($1);', [body], function (err, result) {
                     if (err) {
                         console.log(err);
                         callback(err);
             
                     }
             
                     callback(null, result.rows);
                 });
             }
             deleteStudentFromVacancyModel=(body,callback)=>{  
                console.log(body)
                 client.query( 'DELETE FROM student_vacancies WHERE student_vacancies.student_id=($1)', [body], function (err, result) {
                         if (err) {
                             console.log(err);
                             callback(err);
                 
                         }
                 
                         callback(null, result.rows);
                     });
                 }
         
         studentApproveModel=(callback)=>{

            client.query('SELECT    id, name, gpa,email   FROM student  WHERE student.active IS NULL', function (err, result) {
        
                if (err) {
                    console.log(err);
                    callback(err);
        
                }
                
        
                callback(null, result.rows);
            });
        };
        



module.exports  = {
    listStudentModelNoOrgs:listStudentModelNoOrgs,
    listStudentModel:listStudentModel,
    getStudentModel:getStudentModel,
    postStudentModel:postStudentModel,
    deleteStudentModel:deleteStudentModel,
    patchStudentModel:patchStudentModel,
    loginModelCheckUser:loginModelCheckUser,
    getStudentInfo:getStudentInfo,
    getDataModel:getDataModel,
    approveStudentModel:approveStudentModel,
    studentApproveModel:studentApproveModel,
    postSupervisorToStudentModel:postSupervisorToStudentModel,
    deleteStudentFromOrgsModel:deleteStudentFromOrgsModel,
    deleteStudentFromVacancyModel:deleteStudentFromVacancyModel,
    approveOrgsModel:approveOrgsModel,
    approveStudentVacancyModel:approveStudentVacancyModel,
    getStudentRecordModel:getStudentRecordModel
    
}