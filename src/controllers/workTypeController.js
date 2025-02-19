const WorkType = require("../models/WorkType");

exports.getAllWorkTypes = async (req, res) => {
  const workTypes = await WorkType.find();
  res.json(workTypes);
};

exports.createWorkType = async (req, res) => {
  const workType = new WorkType(req.body);
  await workType.save();
  res.status(201).json(workType);
};

exports.updateWorkType = async (req, res) => {
  const workType = await WorkType.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(workType);
};

exports.deleteWorkType = async (req, res) => {
  try {
    const workType = await WorkType.findById(req.params.id);
    if (!workType)
      return res.status(404).json({ error: "Work type not found" });

    await workType.deleteOne();
    res.status(200).json({ message: "Work type deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
