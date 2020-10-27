const tabels ={
    supervisor: "CREATE TABLE supervisor (id INT PRIMARY KEY , name TEXT , email TEXT)",
    organization:"CREATE TABLE organization (id INT PRIMARY KEY , name TEXT , email TEXT , information TEXT)",
    trainingCommittee:"CREATE TABLE training_committee  (id INT PRIMARY KEY , name TEXT , email TEXT)",
    vacancies:"CREATE TABLE vacancies (id INT PRIMARY KEY , job_title TEXT , job_description TEXT ,organization_id INT REFERENCES organization(id))",
    report:"CREATE TABLE report  (id INT PRIMARY KEY , name TEXT , report TEXT , student_id INT REFERENCES student(id))",
    document:"CREATE TABLE document  (id INT PRIMARY KEY , report TEXT , training_committee_id INT REFERENCES training_committee(id))",
    studentUsers: "CREATE TABLE studentUsers  (id uuid_generate_v4() PRIMARY KEY , username TEXT,first_name TEXT , last_name TEXT ,email TEXT, passowrd TEXT)",
    supervisorUsers: "CREATE TABLE Users  (id uuid_generate_v4() PRIMARY KEY , username TEXT,first_name TEXT , last_name TEXT ,email TEXT, passowrd TEXT)",
    trainingCommitteUsers: "CREATE TABLE Users  (id uuid_generate_v4() PRIMARY KEY , username TEXT,first_name TEXT , last_name TEXT ,email TEXT, passowrd TEXT)",
    
}



exports.tabels=tabels