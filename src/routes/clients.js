const express = require("express");
const api = express.Router();
const ClientsController = require("../controllers/clients");
const md_validation = require("../middlewares/validations");
const md_auth = require("../middlewares/authenticated");

api.get(
  "/client/:id",
  [md_validation.validateId, md_auth.ensureAuth],
  ClientsController.getClient
);

module.exports = api;
