"use strict";
require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const mongoose = require("mongoose");
const { Employee, WorkType, Work } = require("./schemas");
const cors = require("cors");
connectMongoose();

app.use(express.json());
app.use(cors());
// Employee Endpoints
app.get("/employees", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

app.post("/employees", async (req, res) => {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json(employee);
});

app.patch("/employees/:id", async (req, res) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(employee);
});

app.delete("/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });

    await employee.deleteOne(); // This will now trigger the pre-hook
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// WorkType Endpoints
app.get("/work-types", async (req, res) => {
  const workTypes = await WorkType.find();
  res.json(workTypes);
});

app.post("/work-types", async (req, res) => {
  const workType = new WorkType(req.body);
  await workType.save();
  res.status(201).json(workType);
});

app.patch("/work-types/:id", async (req, res) => {
  const workType = await WorkType.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(workType);
});

app.delete("/work-types/:id", async (req, res) => {
  try {
    const workType = await WorkType.findById(req.params.id);
    if (!workType)
      return res.status(404).json({ error: "Work type not found" });

    await workType.deleteOne(); // This will now trigger the pre-hook
    res.status(200).json({ message: "Work type deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Work Endpoints
app.get("/works", async (req, res) => {
  const works = await Work.find().populate("employees").populate("workType");
  res.json(works);
});

app.get("/works/:id", async (req, res) => {
  const work = await Work.findById(req.params.id)
    .populate("employees")
    .populate("workType");
  res.json(work);
});

app.post("/works", async (req, res) => {
  const work = new Work(req.body);
  await work.save();
  res.status(201).json(work);
});

app.patch("/works/:id", async (req, res) => {
  const work = await Work.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(work);
});

app.delete("/works/:id", async (req, res) => {
  const work = await Work.findByIdAndDelete(req.params.id);
  res.status(201).json(work);
});

appListen();

function connectMongoose() {
  mongoose
    .connect(process.env.CONNECTION_MONGO)
    .then(() => {
      console.log("Successfully connected to MongoDB.");
    })
    .catch((error) => {
      console.error("Error connecting to MongoDB:", error);
    });
}

function appListen() {
  app.listen(PORT, (error) => {
    if (!error) console.log("Server running on port: " + PORT);
    else console.log("Error occurred, server can't start", error);
  });
}
