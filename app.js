const path = require('path');
const mongoose = require("mongoose")
const User = require("./models/user")
const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/error');


const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
  User.findById("652d292c58710430545ebf49")
    .then(user => {
      req.user = user;
      next();
    })
    .catch(err => console.log(err));

});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

console.log("Connecting>>>>>>")
mongoose.connect('mongodb+srv://shubhammahulkar2000:2BU10ziQ7SKKR0nC@cluster0.qrqxscz.mongodb.net/Shop?retryWrites=true&w=majority')
  .then(result => {
    User.findOne().then(user => {
      if (!user) {
        const user = new User({
          name: "Shubham Mahulkar",
          email: "shubhammahulkar2000@gmail.com",
          cart: { items: [] }
        })
        user.save()
      }
    })
    app.listen(3000)
    console.log("<<<<<<<<<<<<Connected")
  })
  .catch(err => {
    console.log(err)
  })


