module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      defaultValue: 'test@gmail.com',
      unique: true,
      allowNull: false
    },
    gender: {
      type: DataTypes.STRING,
      validate: {
        isIn: [["male", "female"]]
      }
    },
  })
  return Users;
};
