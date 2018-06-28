module.exports = function (sequelize, DataTypes) {
  const FreelancerRank = sequelize.define('FreelancerRank', {
    UserId: {
      type: DataTypes.INTEGER,
      field: 'user_account_id'
    },
    RankId: {
      type: DataTypes.CHAR,
      field: 'rank_id'
    }
  }, {
    tableName: 'freelancer_rank',
    timestamps: false
  }, );

  FreelancerRank.associate = function (models) {
    FreelancerRank.belongsTo(models.User);
    FreelancerRank.belongsTo(models.Rank);
  };

  return FreelancerRank;
};
