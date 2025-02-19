const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  salary: { type: Number, required: true, min: 0 },
});

EmployeeSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const workCount = await mongoose
      .model("Work")
      .countDocuments({ employees: this._id });
    if (workCount > 0) {
      return next(
        new Error("Cannot delete employee because they are assigned to work.")
      );
    }
    next();
  }
);

module.exports = mongoose.model("Employee", EmployeeSchema);
