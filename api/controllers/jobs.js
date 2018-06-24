'use strict';

const JobPost = require('../models').JobPost;
const JobPostStatus = require('../models').JobPostStatus;

// Exports all the functions to perform on the db
module.exports = {
  getAll,
  save
};

// GET /jobs operationId
function getAll(req, res, next) {
  JobPost.findAll({
    include: [
      JobPostStatus
    ],
  }).then((result) => {
    const jobs = result.map((node) => {
      const {
        id,
        title,
        JobPostStatus: {
          description: status
        }
      } = node.get({
        plain: true
      });

      return {
        id,
        title,
        status
      };
    });

    res.json({
      jobs
    });
  }).catch(function (err) {
    res.status(204).send(err);
  });
}

// POST /jobs operationId
function save(req, res, next) {
  res.json({
    success: 1, // db.save(req.body),
    description: "Job added successfully"
  });
}
