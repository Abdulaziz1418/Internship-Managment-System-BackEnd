//student:"CREATE TABLE student (id INT PRIMARY KEY , name TEXT ,supervisor_id INT REFERENCES supervisor(id),organization_id INT REFERENCES organization(id),email TEXT , vacancy_id INT REFERENCES vacancies(id) , gpa INT , cv TEXT)",
//id,name,supervisor,org,,email,vacancy,gpa,cv


const student=[
    [6,"hamad",9,2,"fahad@",21,3.47],
    [7,"sami",5,3,"abdul@",20,3.47],
 


]




exports.student=student
