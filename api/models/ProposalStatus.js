module.exports = function (sequelize, DataTypes) {
  const ProposalStatus = sequelize.define('ProposalStatus', {
    status: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'proposal_status',
    timestamps: false
  });

  ProposalStatus.associate = function (models) {
    ProposalStatus.hasMany(models.Proposal);
  };

  return ProposalStatus;
};
