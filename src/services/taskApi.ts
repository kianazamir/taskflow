
export type TaskStatus = 'todo' | 'inProgress' | 'done'

export interface Task {
  id: number
  title: string
  status: TaskStatus
}

const API_URL =
  `${import.meta.env.VITE_API_URL || 'http://localhost:3001'}/api/tasks`

// Fetch tasks from the backend.
export async function fetchTasks(): Promise<Task[]> {
  const response = await fetch(API_URL)

  if (!response.ok) {
    throw new Error('Could not load tasks.')
  }

  return response.json()
}

// Create a task on the backend.
export async function createTask(title: string): Promise<Task> {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title }),
  })

  if (!response.ok) {
    throw new Error('Could not create task.')
  }

  return response.json()
}

// Update a task's status on the backend.
export async function updateTaskStatus(
  id: number,
  status: TaskStatus,
): Promise<Task> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status }),
  })

  if (!response.ok) {
    throw new Error('Could not update task.')
  }

  return response.json()
}

// Delete a task on the backend.
export async function deleteTask(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  })

  if (!response.ok) {
    throw new Error('Could not delete task.')
  }
}
