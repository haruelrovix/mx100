module.exports = function (sequelize, DataTypes) {
  const Proposal = sequelize.define('Proposal', {
    message: {
      type: DataTypes.STRING,
      field: 'message'
    },
    applyDate: {
      type: DataTypes.DATE,
      field: 'apply_date'
    },
    UserId: {
      type: DataTypes.INTEGER,
      field: 'user_account_id'
    },
    JobPostId: {
      type: DataTypes.INTEGER,
      field: 'job_post_id'
    },
    ProposalStatusId: {
      type: DataTypes.INTEGER,
      field: 'proposal_status_id'
    }
  }, {
    tableName: 'proposal',
    timestamps: false
  });

  Proposal.associate = function (models) {
    Proposal.belongsTo(models.User);
    Proposal.belongsTo(models.JobPost);
    Proposal.belongsTo(models.ProposalStatus);
  }

  return Proposal;
};
