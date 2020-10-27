// vacancies (id , job_title  , job_description  ,organization_id INT REFERENCES organization(id))

/*const organizations ={
    mozon:"INSERT INTO organization(id ,name,email,information) values($1, $2,$3,$4);",
    mozonData: ["1","mozon","mozon@","data science "] ,
    elm:"INSERT INTO organization(id ,name,email,information) values($1, $2,$3,$4);",
    elmData: ["2","elm","elm@"," IT organization"] ,
    stc:"INSERT INTO organization(id ,name,email,information) values($1, $2,$3,$4);",
    stcData: ["3","stc","stc@","telecom company"] ,
}*/
const vacancies =[
    ["21","securety ","securety","2"] ,
     ["22","business sloution","business sloution","3"] ,
    ["23","system analysis","system analysis","2"]

     
]


exports.vacancies=vacancies



