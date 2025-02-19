const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  lastName: { type: String, required: true },
  firstName: { type: String, required: true },
  middleName: { type: String, required: false },
  salary: { type: Number, required: true, min: 0 },
});

const WorkTypeSchema = new mongoose.Schema({
  description: { type: String, required: true },
  dailyRate: { type: Number, required: true, min: 0 },
});

const WorkSchema = new mongoose.Schema({
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  workType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkType",
    required: true,
  },
  startDate: { type: Date, required: true },
  plannedEndDate: { type: Date, required: true },
  actualEndDate: { type: Date },
  additionalPayment: { type: Number, min: 0 },
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

WorkTypeSchema.pre(
  "deleteOne",
  { document: true, query: false },
  async function (next) {
    const workCount = await mongoose
      .model("Work")
      .countDocuments({ workType: this._id });
    if (workCount > 0) {
      return next(
        new Error("Cannot delete work type because it is assigned to work.")
      );
    }
    next();
  }
);

const Employee = mongoose.model("Employee", EmployeeSchema);
const WorkType = mongoose.model("WorkType", WorkTypeSchema);
const Work = mongoose.model("Work", WorkSchema);

module.exports = { Employee, WorkType, Work };
