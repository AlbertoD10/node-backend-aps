const express = require("express");
const api = express.Router();
const UserController = require("../controllers/user");
const md_validation = require("../middlewares/validations");

api.post("/sign-up", [md_validation.validateUser], UserController.signUp);
api.post("/login", [md_validation.validateLogin], UserController.login);

module.exports = api;
