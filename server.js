require("dotenv").config();
const app = require("express")();

const PORT = 3000;

app.listen(PORT, (error) => {
  if (!error) console.log("Server running on port: " + PORT);
  else console.log("Error occurred, server can't start", error);
});
