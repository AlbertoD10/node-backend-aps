const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//User model
const UserSchema = Schema({
  username: {
    type: String,
    unique: true,
  },
  name: String,
  lastname: String,
  password: String,
});
//Instance of UserSchema for manipulating the data
const UserModel = mongoose.model("User", UserSchema);
// const UserModel = (module.exports = mongoose.model("User", UserSchema));

function signUp(data, callback) {
  let User = new UserModel(data);

  User.save((err, userData) => {
    if (err) {
      if (err.code === 11000) {
        callback({ message: "Este nombre de usuario ya existe", status: 409 });
      } else {
        console.log(err.code);
        callback({ message: "Ha ocurrido un error", status: 500 });
      }
    } else {
      if (!userData) {
        callback({
          message: "Error al crear el usuario, intente nuevamente",
          status: 404,
        });
      } else {
        callback({ message: "Usuario creado", status: 200 });
      }
    }
  });
}

function login(data, callback) {
  UserModel.findOne({ username: data.username }, (err, userStored) => {
    if (err) {
      console.log(err);
      callback({ message: "Ha ocurrido un error", status: 500 });
    } else {
      if (!userStored) {
        callback({ message: "Usuario no encontrado", status: 404 });
      } else {
        callback({ userStored, status: 200 });
      }
    }
  });
}

function getUser(id, callback) {
  UserModel.findById(id, (err, userStored) => {
    if (err) {
      console.log(err);
      callback({ message: "Ha ocurrido un error", status: 500 });
    } else {
      if (!userStored) {
        callback({ message: "Usuario no encontrado", status: 404 });
      } else {
        callback({ userStored, status: 200 });
      }
    }
  });
}

module.exports = {
  signUp,
  login,
  getUser,
};
