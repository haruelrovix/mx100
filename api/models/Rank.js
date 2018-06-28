module.exports = function (sequelize, DataTypes) {
  const Rank = sequelize.define('Rank', {
    proposalSpace: {
      type: DataTypes.INTEGER,
      field: 'proposal_space'
    }
  }, {
    tableName: 'rank',
    timestamps: false
  });

  Rank.associate = function (models) {
    Rank.hasMany(models.FreelancerRank);
  };

  return Rank;
};
