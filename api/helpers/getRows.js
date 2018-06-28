'use strict;'

const models = require('../models');

module.exports = function (res, model, object, attribute) {
  return models[model].findAll()
    .then(result => {
      const obj = result.map(node => {
        const val = node.get({
          plain: true
        });

        return {
          id: val.id,
          [attribute]: val[attribute],
        };
      });

      res.json({
        [object]: obj
      });
    })
    .catch(err => {
      res.status(204).send(err);
    });
}
