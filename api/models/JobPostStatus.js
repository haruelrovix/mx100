module.exports = function (sequelize, DataTypes) {
  const JobPostStatus = sequelize.define('JobPostStatus', {
      description: {
        type: DataTypes.STRING
      }
    }, {
      tableName: 'job_post_status',
      timestamps: false
    },
  );

  JobPostStatus.associate = function (models) {
    JobPostStatus.hasMany(models.JobPost);
  };

  return JobPostStatus;
};
