const { Sequelize, DataTypes } = require("sequelize");

let database = process.env.DB;
let user = process.env.USER;
let password = process.env.PASSWORD;
let dialect = process.env.DIALECT;
let host = process.env.HOST;
let max = parseInt(process.env.MAX, 10);
let Min = parseInt(process.env.Min, 10);
let acquire = process.env.ACQUIRE;
let idle = process.env.IDLE;
const sequelize = new Sequelize(database, user, password, {
	host: host,
	dialect: dialect,
	// logging:false,
	pool: { max: max, min: Min, acquire: acquire, idle: idle }
});
sequelize.authenticate()
	.then(() => {
		console.log("connected");
	})
	.catch(err => {
		console.log(err);
	});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.sequelize.sync({ force: false }).then(() => console.log('yes re-sync done!'));
db.users = require("./users")(sequelize, DataTypes);
db.post = require("./post")(sequelize, DataTypes);
db.tags = require("./tag")(sequelize, DataTypes);
db.post_tag = require("./post_tag")(sequelize, DataTypes)

// ----------One To One----------------
// db.users.hasOne(db.post, { foreignKey: "user_id", as: "postDetails" });

// ----------------One To Many------------------
db.users.hasMany(db.post, { foreignKey: "user_id", as: "postDetails" })   //if the name of foreign key is diffrent then we have to define it in optional parameters
db.post.belongsTo(db.users, { foreignKey: "user_id", });

// ------------------Many To Many-------------------
db.post.belongsToMany(db.tags, { through: "post_tag" });
db.tags.belongsToMany(db.post, { through: "post_tag" })

module.exports = db;
