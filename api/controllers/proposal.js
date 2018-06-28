'use strict';

const Constants = require('../helpers/constants');
const User = require('../models').User;
const JobPost = require('../models').JobPost;
const Proposal = require('../models').Proposal;
const ProposalStatus = require('../models').ProposalStatus;

// Exports all the functions to perform on the db
module.exports = {
  submit
};

// POST /submit operationId
function submit(req, res) {
  const {
    proposal,
    jobId
  } = req.swagger.params;

  Proposal.count({
    where: {
      UserId: req.auth.userId,
      JobPostId: jobId.value,
      ProposalStatusId: Constants.Proposal.Status.Submitted.Id
    },
    include: [
      User,
      JobPost,
      ProposalStatus
    ]
  }).then(count => {
    const submittedProposal = count * Constants.Proposal.Point;

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
    console.log({
      err
    });

    res.status(204).send(err);
  });
}
