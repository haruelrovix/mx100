'use strict';

const Constants = require('../helpers/constants');
const UpdateRow = require('../helpers/updateRow');
const User = require('../models').User;
const JobPost = require('../models').JobPost;
const Proposal = require('../models').Proposal;
const ProposalStatus = require('../models').ProposalStatus;

// Exports all the functions to perform on the db
module.exports = {
  submit,
  editProposal
};

// POST /submit operationId
function submit(req, res) {
  const {
    jobId,
    proposal
  } = req.swagger.params;

  // Get all proposal for given User Id and status = 'Submitted'
  Proposal.findAll({
    where: {
      UserId: req.auth.userId,
      ProposalStatusId: Constants.Proposal.Status.Submitted.Id
    },
    include: [
      User,
      JobPost,
      ProposalStatus
    ]
  }).then(result => {
    const hasSubmitted = result.find(proposal => proposal.dataValues.JobPostId === jobId.value);

    // Freelancer can only submit one proposal to any published job
    if (hasSubmitted) {
      return res.status(403).send({
        message: 'You have submitted proposal for this Job.'
      });
    }

    const submittedProposal = result.length * Constants.Proposal.Point;

    // Rank B freelancer can only submit 10times max and rank A can submit 20times max
    if (submittedProposal >= req.auth.proposalSpace) {
      return res.status(403).send({
        message: `Insufficient points. You have submitted ${count} proposal.`
      });
    }

    Proposal.create({
      message: proposal.value.message,
      applyDate: Date(),
      UserId: req.auth.userId,
      JobPostId: jobId.value,
      ProposalStatusId: 1
    }).then(result => {
      const {
        id
      } = result.get({
        plain: true
      });

      res.json({
        message: "Proposal has been submitted successfully",
        id
      });
    });
  }).catch(err => {
    res.status(204).send(err);
  });
}

// PUT /proposal/{id} operationId
function editProposal(req, res) {
  const payload = {
    ProposalStatusId: req.swagger.params.proposalStatusId.value
  };

  return UpdateRow(req, res, 'Proposal', payload, 'ProposalStatusId');
}
