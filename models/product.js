const getDb = require("../util/database").getDb;
const mongodb = require("mongodb")


class Product {
  constructor(title, price, description, imageUrl, id, userID ) {
    this.title = title;
    this.price = price;
    this.description = description;
    this.imageUrl = imageUrl;
    this._id = id;
    this.userID = userID;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("Products")
        .updateOne({ _id: new mongodb.ObjectId(this._id) }, { $set: this })
    }
    else {
      dbOp = db.collection("Products").insertOne(this)
    }
    return dbOp
      .then(result => {
        console.log(result, ">>>>>>>>>>product")
      })
      .catch(err => {
        console.log(err, "from product")
      })
  }

  static fetchAll() {
    const db = getDb();
    return db.collection("Products").find().toArray()
      .then(product => {
        console.log("FetchAll")
        return product
      })
      .catch(err => {
        console.log(err, "fetchall err")
      })
  }

  static findById(prodId) {
    const db = getDb();
    return db.collection("Products").find({ _id: new mongodb.ObjectId(prodId) }).next()
      .then(product => {
        console.log("findById")
        return product
      })
      .catch(err => {
        console.log(err, "findById err")
      })
  }

  static deleteProduct(prodId) {
    const db = getDb()
    return db.collection("Products").deleteOne({ _id: new mongodb.ObjectId(prodId) })
      .then(result => {
        console.log(result, "Deleted")
      })
      .catch(err => {
        console.log(err, "delete err")
      })
  }
}

module.exports = Product;
