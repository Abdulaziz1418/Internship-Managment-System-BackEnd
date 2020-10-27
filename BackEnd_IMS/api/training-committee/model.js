const { client } = require('../../config/db');

getTrainingCommittee = (id,callback)=>{

    client.query('SELECT * FROM training_committee WHERE training_committee.id=($1)',[id],function (err, result) {
        console.log('orgs')
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null, result.rows[0]);
    });
};


postTrainingCommitteeModel=(body,hash,callback)=>{


    client.query("INSERT INTO training_committee( id , name  , email  ,password  ) values($1, $2,$3,$4);",[body.id,body.name,body.email,hash], function (err, result){

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
    client.query('SELECT id,password FROM training_committee WHERE training_committee.id=($1)',[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        callback(null, result.rows[0]);

    });
};




module.exports  = {
    getTrainingCommittee: getTrainingCommittee,
    postTrainingCommitteeModel:postTrainingCommitteeModel,
    loginModelCheckUser:loginModelCheckUser
}