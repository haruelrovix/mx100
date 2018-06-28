module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    email: {
      type: DataTypes.STRING,
      field: 'email'
    },
    password: {
      type: DataTypes.STRING
    },
    UserTypeId: {
      type: DataTypes.INTEGER,
      field: 'user_type_id'
    }
  }, {
    tableName: 'user_account',
    timestamps: false
  });

  User.associate = function (models) {
    User.belongsTo(models.UserType);
    User.hasMany(models.Proposal);
  }

  return User;
};
