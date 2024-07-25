const env = require("dotenv").config();
const port = process.env.port || 8000;
const app = require("./app");

app.listen(port, () => {
  console.log(`Server running on port: `, port);
});
