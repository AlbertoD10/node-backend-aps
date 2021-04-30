// const User = require("../models/user");
const UserModel = require("../models/user");
const bcrypt = require("bcrypt");
const saltRounds = 10;
const jwt = require("../services/jwt");

function signUp(req, res) {
  let user = {
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    lastname: req.body.lastname,
  };
  user.username.toLowerCase();

  //Crypt the password
  bcrypt.hash(user.password, saltRounds, function (err, hash) {
    if (err) {
      res.status(500).send({ message: "Ha ocurrido un error", status: 500 });
    } else {
      user.password = hash;
      //Send the data to the model and  get a callback with the response of the DB
      UserModel.signUp(user, result => {
        res.status(result.status).send(result);
      });
    }
  });
}

function login(req, res) {
  const user = req.body;

  user.username.toLowerCase();
  UserModel.login(user, result => {
    if (result.status === 200) {
      bcrypt.compare(
        user.password,
        result.userStored.password,
        (err, isValid) => {
          if (err) {
            console.log(err);
            res
              .status(500)
              .send({ message: "Ha ocurrido un error", status: 500 });
          } else {
            if (isValid) {
              res.status(200).send({
                accessToken: jwt.createAccessToken(result.userStored),
                refreshToken: jwt.createRefreshToken(result.userStored),
                message: `Bienvenido(a) ${result.userStored.name}`,
                status: 200,
              });
            } else {
              res
                .status(404)
                .send({ message: "Contraseña incorrecta ", status: 404 });
            }
          }
        }
      );
    } else {
      res.status(result.status).send(result);
    }
  });
}

module.exports = {
  signUp,
  login,
};
