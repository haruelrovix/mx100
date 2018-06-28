module.exports = function (sequelize, DataTypes) {
  const JobPost = sequelize.define('JobPost', {
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    JobPostStatusId: {
      type: DataTypes.INTEGER,
      field: 'job_post_status_id',
    }
  }, {
    tableName: 'job_post',
    timestamps: false
  });

  JobPost.associate = function (models) {
    JobPost.belongsTo(models.JobPostStatus);
    JobPost.hasMany(models.Proposal);
  };

  return JobPost;
};
