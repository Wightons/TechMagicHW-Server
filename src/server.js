require("dotenv").config();
const app = require("./config/serverConfig");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 3000;
const authController = require("./controllers/authController");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger-output.json");

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
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
