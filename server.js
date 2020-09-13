const express = require('express');
const Sequelize = require('sequelize');

const app = express();
const port = 8001;

const connection = new Sequelize("testSequelizeDB", "root", "", {
    dialect: 'mysql'
})

const User = connection.define("User", {
    uuid: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4
    },
    name: Sequelize.STRING,
    bio: Sequelize.TEXT
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