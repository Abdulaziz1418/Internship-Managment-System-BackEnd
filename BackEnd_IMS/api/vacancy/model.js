const { client } = require('../../config/db');

listVacancyModel = (callback)=>{

    client.query('SELECT vacancies.job_title as job_title, vacancies.job_description as job_description , organization.name as organization_name ,organization.id as id , vacancies.id as vacancy_id  FROM vacancies,organization WHERE vacancies.organization_id=organization.id ', function (err, result) {
        if (err) {
            console.log(err);
            callback(err);
        }
        callback(null, result.rows);
    });
};

postVcacancyModel=(id,body,callback)=>{
console.log('postVcacancyModel body :',body)

    client.query("INSERT INTO vacancies(  job_title , job_description ,organization_id ,id  ) values($1, $2,$3,uuid_generate_v4());",[body.job_title,body.job_description,id], function (err, result){

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, body);
    });

};

deleteVacancyModel=(id,callback)=>{


    client.query('DELETE FROM vacancies WHERE id=($1) ',[id],function (err, result) {

        if (err) {
            console.log(err);
            callback(err);

        }
        
        callback(null, result.rows[0]);
    });
};



module.exports  = {
    listVacancyModel: listVacancyModel,
    postVcacancyModel:postVcacancyModel,
    deleteVacancyModel:deleteVacancyModel
}