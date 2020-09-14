const express = require('express');
const Sequelize = require('sequelize');

const Data = require('./data');

const app = express();
const port = 8001;

const connection = new Sequelize("testSequelizeDB", "root", "", {
    dialect: 'mysql'
})

const User = connection.define("Users", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "dayo"
    },
    email: {
        validate: {
            isEmail: true
        },
        type: Sequelize.STRING
    }
    password: Sequelize.STRING,
    address: Sequelize.STRING
},
{
    hooks: {
        beforeValidate: (User, options)=>{
            User.address =  "happy";
        },
        afterValidate: (User, options)=>{
            User.address = "tony";
        }
    }
    
})

const Post = connection.define("Posts", {
    title: Sequelize.STRING,
    description: Sequelize.STRING
})

// User.hasOne(Post);   //1:1 relationship
User.hasMany(Post); //1:many relationship

// const User = require('./models/User')(connection);
// const Post = require('./models/Post')(connection);

connection.authenticate()
    .then(() => {
        console.log("Connection to the database have been established successfully.");
    }).catch(err => {
        console.error("unable to connect to the database:", err);
    })

connection.sync({
    logging: console.log,
    force: true
}).then(()=>{
    console.log("Connection to the database have been established successfully.");
    app.listen(port, ()=>{
        console.log("running server on port "+port)
    })
}).then(()=>{
    User.bulkCreate(Data)
    
}).then(()=>{
    Post.create({
        UserId: 1,
        title: "fdgfhn",
        description: "fsdgfhgjhnghfgdfdz"
    })
}).catch(err=>{
    console.error("unable to connect to the database:", err);
})