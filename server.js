const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 8001;

const connection = new Sequelize("testSequelizeDB", "root", "", {
    dialect: 'mysql'
})

const User = connection.define("Users", {
    uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: Sequelize.STRING,
    bio: Sequelize.TEXT
})

const Post = connection.define("Posts", {
    title: Sequelize.STRING,
    description: Sequelize.STRING
})

User.hasOne(Post);   //1:1 relationship

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
}).catch(err=>{
    console.error("unable to connect to the database:", err);
})