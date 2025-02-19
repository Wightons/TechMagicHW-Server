const mongoose = require("mongoose");

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

module.exports = mongoose.model("Work", WorkSchema);
