const mongoose = require("mongoose");

const WorkTypeSchema = new mongoose.Schema({
  description: { type: String, required: true },
  dailyRate: { type: Number, required: true, min: 0 },
});

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

module.exports = mongoose.model("WorkType", WorkTypeSchema);
