'use strict';

const getRows = require('../helpers/getRows');

// Exports all the functions to perform on the db
module.exports = {
  getJobPostStatus
};

// GET /jobpoststatus operationId
function getJobPostStatus(req, res) {
  return getRows(res, 'JobPostStatus', 'jobPostStatus', 'description');
}
