function Post(connection){
    const PostSchema = connection.define("Posts", {
        title: Sequelize.STRING,
        description: Sequelize.STRING
    });
}

module.exports = Post;