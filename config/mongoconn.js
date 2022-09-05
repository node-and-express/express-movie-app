const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const dbName = 'employee';

let db,collection;

MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
  if (err) throw err;

  // Storing a reference to the database so you can use it later
  db = client.db(dbName);
  collection = db.collection('detail');

  console.log(`Connected MongoDB: ${url}`)
  console.log(`Database: ${dbName}`)
});


//use async and await while using database queries, it mean it will excecute after connection build and ready

//get all employees
const getAll=async (req,res)=>{
    const result=await collection.find({}).toArray();
    res.json(result);
};

//get employee by name
const getByName=async (req,res)=>{
  let empName=req.body.name;
  const result=await collection.find({name:empName}).toArray();
  res.json(result);
};

//create employee record
const createEmp=async (req,res)=>{
  let empName=req.body.name;
  let empCity=req.body.city;
  let empAddress=req.body.address;

  if(empName == '' || empCity == '' || empAddress == '') res.json({status:false,error:'Some of field is null'});

  const result=await collection.insertMany([{name:empName ,city:empCity , address:empAddress}]);
  res.json(result);
};

//update employee by name
const updateByName=async (req,res)=>{
  let searchName=req.params.name;
  let updateName=req.body.name;
  const result=await collection.updateOne({name:searchName},{$set:{name:updateName}});
  res.json(result);
};

//delete employee by name
const deleteByName=async (req,res)=>{
  let deleteName=req.body.name;
  const result=await collection.deleteOne({name:deleteName});

  //Remove the more than one document where the field a is equal to 3.
  //const result=await collection.deleteMany({name:deleteName});

  res.json(result);
};



module.exports={
    getAll,
    getByName,
    createEmp,
    updateByName,
    deleteByName,
};