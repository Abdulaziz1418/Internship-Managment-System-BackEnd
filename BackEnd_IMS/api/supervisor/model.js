const { client } = require('../../config/db');

listSupervisorModel =(callback)=>{

    client.query('SELECT   name, email,id  FROM supervisor  ', function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        

        callback(null, result.rows);
    });
};
listSupervisorActiveModel =(callback)=>{

    client.query('SELECT   name, email,id  FROM supervisor  WHERE supervisor.active IS NULL', function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        

        callback(null, result.rows);
    });
};


postSupervisorModel=(body,hash,callback)=>{


    client.query("INSERT INTO organization( id , name  , email  ,password  ) values($1, $2,$3,$4,$5);",[body.id,body.name,body.email,hash], function (err, result){

        if (err) {
            console.log(err);
            callback(err);

        }
        newUser=[body.id,hash]
        console.log("newUser ::", newUser)
        callback(null, newUser);
    });

};


loginModelCheckUser=(id,callback)=>{

    client.query('SELECT id,password,active FROM supervisor WHERE supervisor.id=($1)',[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        callback(null, result.rows[0]);

    });
};



postSupervisorModel=(body,hash,callback)=>{


    client.query("INSERT INTO supervisor( id, password , name , email ) values($1, $2,$3,$4);",[body.id,hash,body.name,body.email], function (err, result){

        if (err) {
            console.log(err);
            callback(err);

        }
        newUser=[body.id,hash]
        console.log("newUser ::", newUser)
        callback(null, newUser);
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



deleteSupervisorModel=(id,callback)=>{


    client.query('DELETE FROM supervisor WHERE supervisor.id=($1) ',[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, result.rows[0]);
    });
};



getSupervisorModel=(id,callback)=>{


    client.query('SELECT  name , email ,id from supervisor where supervisor.id=($1)',[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, result.rows[0]);
    });
};

getStudentSupervisorModel=(id,callback)=>{


    client.query('SELECT  id,name from student where student.supervisor_id=($1)',[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, result.rows);
    });
};





patchStudentModel=(body,callback)=>{///supervisor_id , organization_id , cv ,vacancy_id  
   
client.query( 'UPDATE student SET organization_id=($2),  vacancy_id=($3) WHERE student.id=($1)', [body.id,body.organization_id,body.vacancy_id], function (err, result) {
        if (err) {
            console.log(err);
            callback(err);

        }

        callback(null, result.rows);
    });
}

approveSupModel=(body,callback)=>{
    console.log(body)
     client.query( 'UPDATE supervisor SET active=($2) WHERE supervisor.id=($1);', [body,1], function (err, result) {
             if (err) {
                 console.log(err);
                 callback(err);
     
             }
     
             callback(null, result.rows);
         });
     }








module.exports  = {
    listStudentModelNoOrgs:listStudentModelNoOrgs,
    listStudentModel:listStudentModel,
    getStudentModel:getStudentModel,
    deleteStudentModel:deleteStudentModel,
    patchStudentModel:patchStudentModel,
    postSupervisorModel:postSupervisorModel,
    listSupervisorModel:listSupervisorModel,
    getSupervisorModel:getSupervisorModel,
    loginModelCheckUser:loginModelCheckUser,
    getStudentSupervisorModel:getStudentSupervisorModel,
    listSupervisorActiveModel:listSupervisorActiveModel,
    approveSupModel:approveSupModel,
    deleteSupervisorModel:deleteSupervisorModel
}