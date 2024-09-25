const express = require("express")
const router = express.Router()
const Task = require("../models/Task")
const TaskController = require("../controllers/Task.controller")

router.post("/create", TaskController.create)
router.get("/", TaskController.getAll)
router.get("/id/:_id", TaskController.getId)
router.put("/markAsCompleted/:_id", TaskController.markComplete)
router.put("/id/:_id", TaskController.updateName)
router.delete("/id/:_id", TaskController.deleteId)

module.exports = router