const ModelClient = require("../models/clients");

function getClient(req, res) {
  const { id } = req.params;

  ModelClient.getClient(id, result => {
    res.status(result.status).send(result);
  });
}

module.exports = { getClient };
