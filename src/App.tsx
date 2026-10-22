
import { useEffect, useState } from 'react'
import './App.css'
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTaskStatus,
  type Task,
  type TaskStatus,
} from './services/taskApi'

const columns: { status: TaskStatus; title: string }[] = [
  { status: 'todo', title: 'Att göra' },
  { status: 'inProgress', title: 'Pågår' },
  { status: 'done', title: 'Klar' },
]

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  // Load tasks when the component first appears.
  useEffect(() => {
    async function loadTasks() {
      try {
        setIsLoading(true)
        setError('')
        const data = await fetchTasks()
        setTasks(data)
      } catch {
        setError('Kunde inte hämta uppgifterna. Kontrollera att servern körs.')
      } finally {
        setIsLoading(false)
      }
    }

    void loadTasks()
  }, [])

  async function addTask(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const title = newTask.trim()

    if (!title) return

    try {
      setError('')
      setMessage('')
      const task = await createTask(title)
      setTasks((currentTasks) => [...currentTasks, task])
      setNewTask('')
      setMessage('Uppgiften lades till!')
    } catch {
      setError('Kunde inte lägga till uppgiften. Försök igen.')
    }
  }

  async function moveTask(id: number, status: TaskStatus) {
    try {
      setError('')
      setMessage('')
      const updatedTask = await updateTaskStatus(id, status)
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === id ? updatedTask : task,
        ),
      )
      setMessage('Statusen uppdaterades!')
    } catch {
      setError('Kunde inte uppdatera statusen. Försök igen.')
    }
  }

  async function removeTask(id: number) {
    try {
      setError('')
      setMessage('')
      await deleteTask(id)
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id),
      )
      setMessage('Uppgiften togs bort!')
    } catch {
      setError('Kunde inte ta bort uppgiften. Försök igen.')
    }
  }

  return (
    <main className="app">
      <header className="app-header">
        <p className="eyebrow">DIN PERSONLIGA PLANERARE</p>
        <h1>TaskFlow</h1>
        <p className="subtitle">
          Samla dina uppgifter. Få saker gjorda.
        </p>
      </header>

      <form className="task-form" onSubmit={addTask}>
        <label htmlFor="new-task">Lägg till en uppgift</label>
        <div className="form-row">
          <input
            id="new-task"
            value={newTask}
            onChange={(event) => setNewTask(event.target.value)}
            placeholder="Vad behöver du göra?"
            required
          />
          <button type="submit" disabled={isLoading}>
            Lägg till
          </button>
        </div>
      </form>

      {isLoading && <p role="status">Laddar uppgifter...</p>}
      {error && <p role="alert">{error}</p>}
      {message && <p role="status">{message}</p>}

      {!isLoading && !error && (
        <section className="board" aria-label="Uppgiftstavla">
          {columns.map((column) => {
            const columnTasks = tasks.filter(
              (task) => task.status === column.status,
            )

            return (
              <section
                className="column"
                key={column.status}
                aria-labelledby={`heading-${column.status}`}
              >
                <div className="column-heading">
                  <h2 id={`heading-${column.status}`}>{column.title}</h2>
                  <span className="task-count">{columnTasks.length}</span>
                </div>

                <div className="task-list">
                  {columnTasks.map((task) => (
                    <article className="task-card" key={task.id}>
                      <p>{task.title}</p>

                      <label htmlFor={`status-${task.id}`}>Status</label>
                      <select
                        id={`status-${task.id}`}
                        value={task.status}
                        onChange={(event) =>
                          void moveTask(
                            task.id,
                            event.target.value as TaskStatus,
                          )
                        }
                      >
                        {columns.map((option) => (
                          <option key={option.status} value={option.status}>
                            {option.title}
                          </option>
                        ))}
                      </select>

                      <button
                        className="delete-button"
                        type="button"
                        onClick={() => void removeTask(task.id)}
                        aria-label={`Ta bort uppgiften ${task.title}`}
                      >
                        Ta bort
                      </button>
                    </article>
                  ))}

                  {columnTasks.length === 0 && (
                    <p className="empty-state">Inga uppgifter här ännu.</p>
                  )}
                </div>
              </section>
            )
          })}
        </section>
      )}

      <footer className="app-footer">
        TaskFlow · Ett steg i taget.
      </footer>
    </main>
  )
}

export default App
