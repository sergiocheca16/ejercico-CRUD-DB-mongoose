const Task = require("../models/Task")

const TaskController = {
  async create (req, res) {
    try {
      const task = await Task.create({...req.body, completed: false})
      res.status(201).json(task)
    } catch (err) {
      console.error("Error al crear", err)
    }
  },
  async getAll (req, res) {
    try {
      const tasks = await Task.find()
      res.status(200).json(tasks)
    } catch (err) {
      console.error("Error al traer los datos", err)
    }
  },
  async getId (req, res) {
    try {
      const taskId = await Task.findById(req.params._id)
      res.status(200).json(taskId)
    } catch (err) {
      console.error("Error al acceder a la tarea", err)
    }
  },
  async markComplete (req, res) {
    try {
      const taskId = req.params._id 
      const task = await Task.findByIdAndUpdate(
        taskId, {
          completed: true
        }, {new: true}
      )
      res.json(task)
      
    } catch (err) {
      console.error("Error al acceder al actualizar", err)
    }
  },
  async updateName(req, res){
    try {
      const id = req.params._id
      const title = req.body.title
      const task = await Task.findByIdAndUpdate(
        id, {
          title
        }, {new: true}
      )
      res.json(task)
    } catch (error) {
    }
  },
  async deleteId (req, res) {
    try {
      const taskId = req.params._id
      const task = await Task.findByIdAndDelete(taskId)
      res.json({mensaje: "task eliminado", task })
    } catch (err) {
      console.error("no se ha podido eliminar la tarea")
    }
  }
}

module.exports = TaskController