'use strict';

const getRows = require('../helpers/getRows');

// Exports all the functions to perform on the db
module.exports = {
  getProposalStatus
};

// GET /proposalstatus operationId
function getProposalStatus(req, res) {
  return getRows(res, 'ProposalStatus', 'proposalStatus', 'status');
}
