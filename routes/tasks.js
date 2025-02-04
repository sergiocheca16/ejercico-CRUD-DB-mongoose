const express = require("express");
const router = express.Router();
const Task = require("../models/Task.js");
const mongoose = require("mongoose");

// Validar ObjectId
const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

// Crear tarea
router.post("/create", async (req, res) => {
    try {
      if (!req.body.title) return res.status(400).json({ message: "El título es obligatorio" });
      const newTask = new Task({ title: req.body.title });
      await newTask.save();
      res.status(201).json(newTask);
    } catch (error) {
      res.status(500).json({ error: "Error al crear la tarea" });
    }
});
  
// Obtener todas las tareas
router.get("/", async (_, res) => {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ error: "Error al obtener las tareas" });
    }
});
  
// Obtener tarea por ID
router.get("/id/:_id", async (req, res) => {
    if (!isValidId(req.params._id)) return res.status(400).json({ message: "ID no válido" });
  
    try {
      const task = await Task.findById(req.params._id);
      task ? res.json(task) : res.status(404).json({ message: "Tarea no encontrada" });
    } catch (error) {
      res.status(500).json({ error: "Error al obtener la tarea" });
    }
});
  
// Marcar como completada
router.put("/markAsCompleted/:_id", async (req, res) => {
    if (!isValidId(req.params._id)) return res.status(400).json({ message: "ID no válido" });
  
    try {
      const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true });
      task ? res.json(task) : res.status(404).json({ message: "Tarea no encontrada" });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la tarea" });
    }
});
  
// Actualizar solo el título
router.put("/id/:_id", async (req, res) => {
    if (!isValidId(req.params._id) || !req.body.title) {
      return res.status(400).json({ message: "ID o título inválido" });
    }
  
    try {
      const task = await Task.findByIdAndUpdate(req.params._id, { title: req.body.title }, { new: true });
      task ? res.json(task) : res.status(404).json({ message: "Tarea no encontrada" });
    } catch (error) {
      res.status(500).json({ error: "Error al actualizar la tarea" });
    }
});
  
// Eliminar tarea
router.delete("/id/:_id", async (req, res) => {
    if (!isValidId(req.params._id)) return res.status(400).json({ message: "ID no válido" });
  
    try {
      const task = await Task.findByIdAndDelete(req.params._id);
      task ? res.json({ message: "Tarea eliminada" }) : res.status(404).json({ message: "Tarea no encontrada" });
    } catch (error) {
      res.status(500).json({ error: "Error al eliminar la tarea" });
    }
});


module.exports = router;