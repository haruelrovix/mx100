'use strict';

const Constants = require('../helpers/constants');
const JobPost = require('../models').JobPost;
const JobPostStatus = require('../models').JobPostStatus;
const Proposal = require('../models').Proposal;
const ProposalStatus = require('../models').ProposalStatus;
const User = require('../models').User;

// Exports all the functions to perform on the db
module.exports = {
  getAll,
  save,
  edit,
  get
};

function isFreelancer(role) {
  return role === Constants.Role.Freelancer;
}

function getProposal(proposal, {
  role,
  userId
}) {
  // Freelancer should not allowed to see other freelancer proposal
  const result = isFreelancer(role) ?
    proposal.filter(item => item.UserId === userId) :
    proposal;

  return result.map(({
    id,
    message,
    applyDate,
    ProposalStatus: {
      status
    },
    User
  }) => ({
    id,
    freelancer: User.email,
    message,
    applyDate,
    status
  }))
}

// GET /jobs operationId
function getAll(req, res) {
  const {
    role
  } = req.auth;

  JobPost.findAll({
    where: isFreelancer(role) ? {
      '$JobPostStatus.description$': Constants.JobPostStatus.Published
    } : {},
    include: [
      JobPostStatus,
      {
        model: Proposal,
        include: [
          ProposalStatus,
          User
        ]
      }
    ]
  }).then(result => {
    const jobs = result.map(node => {
      const {
        id,
        title,
        description,
        JobPostStatus: {
          description: status
        },
        Proposals
      } = node.get({
        plain: true
      });

      return {
        id,
        title,
        description,
        status,
        proposal: getProposal(Proposals, req.auth)
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
      JobPostStatus,
      {
        model: Proposal,
        include: [
          ProposalStatus,
          User
        ]
      }
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
      },
      Proposals
    } = result.get({
      plain: true
    });

    res.json({
      job: {
        id,
        title,
        description,
        status,
        proposal: getProposal(Proposals, req.auth)
      }
    });
  }).catch(err => {
    res.status(204).send(err);
  });
}
