const mongoDB = require("mongodb");
const mongoClient = mongoDB.MongoClient;

let _db;
const mongoConnect = (callback) => {
  console.log(
    "Connencting....."
  )
  mongoClient.connect(
    'mongodb+srv://shubhammahulkar2000:2BU10ziQ7SKKR0nC@cluster0.qrqxscz.mongodb.net/?retryWrites=true&w=majority'
  )
    .then(client => {
      console.log(">>>>>>>>>>CONNECTED")
      _db = client.db();
      callback()
    })
    .catch(err => {
      console.log(err,"Not CONNECTED")
      throw err
    })
}

const getDb = ()=>{
  if(_db){
    return _db
  }
  throw "No database found"
}
exports.mongoConnect = mongoConnect;
exports.getDb=getDb

