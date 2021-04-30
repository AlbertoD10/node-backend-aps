const app = require("./app");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;
const { API_VERSION, IP_SERVER, PORT_DB } = require("./config");

mongoose.set("useCreateIndex", true);
mongoose.connect(
  `mongodb://mongo:${PORT_DB}/database`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, res) => {
    if (err) {
      throw err;
    } else {
      app.listen(port, () => {
        console.log("----- SERVER ON -----");
        console.log(`DOCKER: http://${IP_SERVER}:${port}/api/${API_VERSION}/`);
        console.log(`LOCALHOST: http://${IP_SERVER}:3001/api/${API_VERSION}/`);
      });
    }
  }
);
