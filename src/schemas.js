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
  employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }], // Масив для підтримки декількох працівників
  workType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "WorkType",
    required: true,
  },
  startDate: { type: Date, required: true },
  plannedEndDate: { type: Date, required: true }, // Дата, до якої планується завершити роботу
  actualEndDate: { type: Date }, // Фактична дата завершення
  additionalPayment: { type: Number, min: 0 }, // Сума, що додається до зарплати
});

const Employee = mongoose.model("Employee", EmployeeSchema);
const WorkType = mongoose.model("WorkType", WorkTypeSchema);
const Work = mongoose.model("Work", WorkSchema);

module.exports = { Employee, WorkType, Work };
