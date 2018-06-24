module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'user_account',
    timestamps: false
  });

  return User;
};
