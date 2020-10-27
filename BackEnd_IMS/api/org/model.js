const { client } = require('../../config/db');



postOrganizationModel=(body,hash,callback)=>{


    client.query("INSERT INTO organization( name  , email  ,  information , password ,id ) values($1,$2,$3,$4,uuid_generate_v4());",[body.name,body.email,body.information,hash], function (err, result){

        if (err) {
            console.log(err);
            callback(err);

        }
        newUser=[body.name,hash]
        console.log("newUser ::", newUser)
        callback(null, newUser);
    });

};

getOrganizationModel =(id,callback)=>{

    client.query('SELECT organization.id as id,organization.name as name, organization.email as email, organization.information as information FROM organization  WHERE organization.id=($1)',[id],function (err, result) {
        if (err) {
            console.log(err);

            callback(err);
        }

        callback(null,result.rows[0]);
    });
};

getOrganizationActiveModel =(callback)=>{

    client.query('SELECT organization.id as id,organization.name as name, organization.email as email, organization.information as information FROM organization  WHERE organization.active IS NULL',function (err, result) {
        if (err) {
            console.log(err);

            callback(err);
        }

        callback(null,result.rows);
    });
};

loginModelCheckUser=(id,callback)=>{

    client.query('SELECT name,password,id,active FROM organization WHERE organization.name=($1)',[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        console.log(result.rows)
        callback(null, result.rows[0]);

    });
};


approveOrgsModel=(body,callback)=>{
    console.log(body)
     client.query( 'UPDATE organization SET active=($2) WHERE organization.id=($1);', [body,1], function (err, result) {
             if (err) {
                 console.log(err);
                 callback(err);
     
             }
     
             callback(null, result.rows);
         });
     }
     deleteOrgsModel=(id,callback)=>{


        client.query('DELETE FROM organization WHERE organization.id=($1) ',[id],function (err, result) {
    
            if (err) {
                console.log(err);
                callback(err);
    
            }
            
            callback(null, result.rows[0]);
        });
    };


module.exports  = {
    getOrganizationModel: getOrganizationModel,
    postOrganizationModel:postOrganizationModel,
    loginModelCheckUser:loginModelCheckUser,
    getOrganizationActiveModel:getOrganizationActiveModel,
    approveOrgsModel:approveOrgsModel,
    deleteOrgsModel:deleteOrgsModel
}