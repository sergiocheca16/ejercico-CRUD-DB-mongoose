const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.post('/create', async (req, res) => {
    try {
        const task = new Task({ title: req.body.title });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear la tarea' });
    }
});

router.get('/', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});

router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) return res.status(404).json({ error: 'Tarea no encontrada' });
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener la tarea' });
    }
});

router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { completed: true },
            { new: true }
        );
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
});

router.put('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params._id,
            { title: req.body.title },
            { new: true }
        );
        res.json(task);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la tarea' });
    }
});

router.delete('/id/:_id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params._id);
        res.json({ message: 'Tarea eliminada' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar la tarea' });
    }
});

module.exports = router;