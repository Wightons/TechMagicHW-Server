require("dotenv").config();
const app = require("./config/serverConfig");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;

connectDB();

app.use("/employees", require("./routes/employeeRoutes"));
app.use("/work-types", require("./routes/workTypeRoutes"));
app.use("/works", require("./routes/workRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
