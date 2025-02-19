require("dotenv").config();
const app = require("./config/serverConfig");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const authController = require("./controllers/authController");

connectDB();

app.use("/auth", require("./routes/authRoutes"));
app.use(
  "/employees",
  authController.verifyToken,
  require("./routes/employeeRoutes")
);
app.use(
  "/work-types",
  authController.verifyToken,
  require("./routes/workTypeRoutes")
);
app.use("/works", authController.verifyToken, require("./routes/workRoutes"));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
