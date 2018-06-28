'use strict';

const Constants = require('../helpers/constants');
const JobPost = require('../models').JobPost;
const JobPostStatus = require('../models').JobPostStatus;

// Exports all the functions to perform on the db
module.exports = {
  getAll,
  save,
  edit,
  get
};

// GET /jobs operationId
function getAll(req, res) {
  JobPost.findAll({
    where: req.auth.role === Constants.Role.Freelancer ? {
      '$JobPostStatus.description$': Constants.JobPostStatus.Published
    } : {},
    include: [
      JobPostStatus
    ]
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
  }).catch(err => {
    res.status(204).send(err);
  });
}

// POST /jobs operationId
function save(req, res) {
  const {
    title,
    description,
    status
  } = req.body;

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
  }).catch(err => {
    res.status(204).send(err);
  });
}

// PUT /jobs/{id} operationId
function edit(req, res) {
  const {
    value: id
  } = req.swagger.params.id;

  const {
    title,
    description,
    status
  } = req.body;

  JobPost.update({
    title,
    description,
    JobPostStatusId: status
  }, {
    where: {
      id
    }
  }).then(result => {
    if (result[0] === 0) {
      return res.status(404).send({
        message: "Job not found",
        id
      });
    }

    res.status(204).send();
  }).catch(err => {
    res.status(204).send(err);
  });
}

// GET /jobs/{id} operationId
function get(req, res) {
  const {
    value: id
  } = req.swagger.params.id;

  JobPost.findOne({
    where: {
      id
    },
    include: [
      JobPostStatus
    ]
  }).then(result => {
    if (!result) {
      return res.status(404).send({
        message: "Job not found",
        id: req.swagger.params.id.value
      });
    }

    const {
      id,
      title,
      description,
      JobPostStatus: {
        description: status
      }
    } = result.get({
      plain: true
    });

    res.json({
      job: {
        id,
        title,
        description,
        status
      }
    });
  }).catch(err => {
    console.log(err);
    res.status(204).send(err);
  });
}
