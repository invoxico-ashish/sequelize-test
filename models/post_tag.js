module.exports = (sequelize, DataTypes) => {
    const Post_Tag = sequelize.define("post_tag", {
        postId: DataTypes.INTEGER,
        tagId: DataTypes.INTEGER,
    }, { timestaps: false });
    return Post_Tag;
}