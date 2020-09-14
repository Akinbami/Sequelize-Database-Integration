function User(conection){
    const UserSchema = connection.define("Users", {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.STRING,
        address: Sequelize.STRING
    })
}

module.exports = User;