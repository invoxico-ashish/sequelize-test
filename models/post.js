module.exports = (sequelize, DataTypes) => {
    const Posts = sequelize.define("posts", {
        name: DataTypes.STRING,
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        user_id: DataTypes.INTEGER,
    }, {
        createAt: "created_at",
        updatedAt: "modified_at"
    })
    return Posts;
}