const getDb = require("../util/database").getDb;
const ObjectId = require("mongodb").ObjectId

class User {
  constructor(name, email,) {
    this.name = name;
    this.email = email
  }
  save() {
    const db = getDb()
    return db.collection("Users").inserOne(this)
      .then(user => {
        console.log(user, ">>>>>>>>>user Inserted")
      })
      .catch(err => {
        console.log(err, "insert user err")
      })
  }

  static findById(userId) {
    const db = getDb()
    return db.collection("Users").findOne({ _id: new ObjectId(userId) })
    .then(user=>{
      console.log(user);
      return user
    })
    .catch(err=>{
      console.log(err)
    })
  }

}



module.exports = User;
