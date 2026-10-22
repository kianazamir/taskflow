
const express = require('express')
const cors = require('cors')

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

// Store tasks on the server while it is running.
let tasks = [
  { id: 1, title: 'Planera veckans uppgifter', status: 'todo' },
  { id: 2, title: 'Arbeta med projektet', status: 'inProgress' },
  { id: 3, title: 'Skapa projektmapp', status: 'done' },
]

// Return all tasks.
app.get('/api/tasks', (req, res) => {
  res.json(tasks)
})

// Create a task.
app.post('/api/tasks', (req, res) => {
  const title = req.body.title?.trim()

  if (!title) {
    return res.status(400).json({ message: 'A task title is required.' })
  }

  const task = {
    id: Date.now(),
    title,
    status: 'todo',
  }

  tasks.push(task)
  res.status(201).json(task)
})

// Update a task's status.
app.patch('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const { status } = req.body
  const allowedStatuses = ['todo', 'inProgress', 'done']

  if (!allowedStatuses.includes(status)) {
    return res.status(400).json({ message: 'Invalid task status.' })
  }

  const task = tasks.find((item) => item.id === id)

  if (!task) {
    return res.status(404).json({ message: 'Task not found.' })
  }

  task.status = status
  res.json(task)
})

// Delete a task.
app.delete('/api/tasks/:id', (req, res) => {
  const id = Number(req.params.id)
  const existingTask = tasks.some((task) => task.id === id)

  if (!existingTask) {
    return res.status(404).json({ message: 'Task not found.' })
  }

  tasks = tasks.filter((task) => task.id !== id)
  res.status(204).end()
})

app.listen(PORT, () => {
  console.log(`TaskFlow API running at http://localhost:${PORT}`)
})
