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
        description,
        JobPostStatus: {
          description: status
        }
      } = node.get({
        plain: true
      });

      return {
        id,
        title,
        description,
        status
      };
    });

    res.json({
      jobs
    });
  }).catch((err) => {
    res.status(204).send(err);
  });
}

// POST /jobs operationId
function save(req, res, next) {
  const { title, description, status } = req.body;

  JobPost.create({
    title,
    description,
    JobPostStatusId: status
  }).then(result => {
    const job = result.get({
      plain: true
    });

    res.json({
      message: "Job added successfully",
      id: job.id
    });
  }).catch((err) => {
    res.status(204).send(err);
  });
}
