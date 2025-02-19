const Work = require("../models/Work");

exports.getAllWorks = async (req, res) => {
  const works = await Work.find().populate("employees").populate("workType");
  res.json(works);
};

exports.getWorkById = async (req, res) => {
  const work = await Work.findById(req.params.id)
    .populate("employees")
    .populate("workType");
  res.json(work);
};

exports.createWork = async (req, res) => {
  const work = new Work(req.body);
  await work.save();
  res.status(201).json(work);
};

exports.updateWork = async (req, res) => {
  const work = await Work.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(work);
};

exports.deleteWork = async (req, res) => {
  const work = await Work.findByIdAndDelete(req.params.id);
  res.status(200).json(work);
};
