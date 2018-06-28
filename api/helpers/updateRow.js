'use strict;'

const { Sequelize } = require('../helpers/constants');
const models = require('../models');

function sendStatus(res, message, id) {
  return res.status(404).send({
    message: `${message} not found`,
    id
  });
}

module.exports = function (req, res, model, payload, attribute) {
  const {
    id
  } = req.swagger.params;

  return models[model].update(payload, {
    where: {
      id: id.value
    }
  }).then(result => {
    if (result[0] === 0) {
      return sendStatus(model, id.value);
    }

    res.status(204).send();
  }).catch(err => {
    if (err.name === Sequelize.FKConstraintError) {
      return sendStatus(res, attribute, payload[attribute]);
    }

    res.status(204).send(err);
  });
}
