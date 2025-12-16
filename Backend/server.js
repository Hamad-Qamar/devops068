const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://mongo:27017/studentdb")
    .then(() => console.log("MongoDB Connected"));

const StudentSchema = new mongoose.Schema({
    name: String,
    regNo: String,
    department: String
});

const Student = mongoose.model("Student", StudentSchema);

// Get all students
app.get("/students", async (req, res) => {
    const students = await Student.find();
    res.json(students);
});

// Add student
app.post("/students", async (req, res) => {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: "Student Added" });
});

app.listen(5000, () => {
    console.log("Backend running on port 5000");
});
