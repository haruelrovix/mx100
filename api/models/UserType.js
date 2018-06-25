module.exports = function (sequelize, DataTypes) {
  const UserType = sequelize.define('UserType', {
    name: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'user_type',
    timestamps: false
  }, );

  UserType.associate = function (models) {
    UserType.hasMany(models.User);
  };

  return UserType;
};