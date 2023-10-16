const mongoose = require("mongoose")

const Schema = mongoose.Schema

const userScherma = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    cart: {
        items: [
            {
                productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
                quantity: { type: Number, required: true }
            }
        ]
    }
})

module.exports = mongoose.model("User", userScherma)

// const getDb = require("../util/database").getDb;
// const mongoDB = require("mongodb")
// const ObjectId = mongoDB.ObjectId
// class User {
//   constructor(name, email, cart, id) {
//     this.name = name;
//     this.email = email
//     this.cart = cart
//     this._id = id
//   }
//   save() {
//     const db = getDb()
//     return db.collection("Users").inserOne(this)
//       .then(user => {
//         console.log(">>>>>>>>>user Inserted")
//       })
//       .catch(err => {
//         console.log(err, "insert user err")
//       })
//   }

//   static findById(userId) {
//     const db = getDb()
//     return db.collection("Users").findOne({ _id: new ObjectId(userId) })
//       .then(user => {
//         console.log(user);
//         return user
//       })
//       .catch(err => {
//         console.log(err)
//       })
//   }

//   addToCart(product) {
//     const cartProductIndex = this.cart.items.findIndex(cp => {
//       return cp.productId.toString() === product._id.toString()
//     })
//     let newQuantity = 1
//     const updatedCartItems = [...this.cart.items];

//     if (cartProductIndex >= 0) {
//       newQuantity = this.cart.items[cartProductIndex].quantity + 1
//       updatedCartItems[cartProductIndex].quantity = newQuantity
//     } else {
//       updatedCartItems.push({
//         productId: new ObjectId(product._id),
//         quantity: newQuantity
//       })
//     }
//     const updateCart = { items: updatedCartItems }
//     const db = getDb()
//     return db.collection("Users").updateOne(
//       { _id: new ObjectId(this._id) },
//       { $set: { cart: updateCart } }
//     )

//   }

//   getCart() {
//     const db = getDb()
//     const productIds = this.cart.items.map(i => {
//       return i.productId
//     })
//     return db
//       .collection("Products")
//       .find({ _id: { $in: productIds } })
//       .toArray()
//       .then(product => {
//         return product.map(p => {
//           return {
//             ...p,
//             quantity: this.cart.items.find(i => {
//               return i.productId.toString() === p._id.toString();
//             }).quantity
//           }
//         })
//       })
//   }

//   deleteItemFromCart(productId) {
//     const updatedCartItems = this.cart.items.filter(i => {
//       return i.productId.toString() !== productId.toString()
//     })
//     console.log(updatedCartItems, "updateCart")
//     const db = getDb()
//     return db.collection("Users").updateOne(
//       { _id: new ObjectId(this._id) },
//       { $set: { cart: { items: updatedCartItems } } })
//   }

//   addOders() {
//     const db = getDb()
//     return this.getCart().then(product => {
//       const order = {
//         items: product,
//         user: {
//           _id: new ObjectId(this._id),
//           name: this.name
//         }
//       }
//       return db.collection("Oders").insertOne(order)
//     })
//       .then(result => {
//         this.cart = { items: [] }
//         return db.collection('Users')
//           .updateOne(
//             { _id: new ObjectId(this._id) },
//             { $set: { cart: { items: [] } } }
//           )
//       })
//   }

//   getOders() {
//     const db = getDb()
//     return db.collection("Oders")
//     .find({"user._id":new ObjectId(this._id)})
//     .toArray()
//   }

// }



// module.exports = User;
