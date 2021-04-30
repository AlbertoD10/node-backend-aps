const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Model to access the collection
const UserSchema = Schema({
  CLIENTNUM: Number,
});

const UserModel = mongoose.model("Clients", UserSchema);

function getClient(id, callback) {
  UserModel.findOne({ CLIENTNUM: id }, (err, userStored) => {
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

module.exports = { getClient };
