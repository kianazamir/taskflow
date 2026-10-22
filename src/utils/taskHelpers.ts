
import type { Task, TaskStatus } from '../services/taskApi'

export function filterTasksByStatus(
  tasks: Task[],
  status: TaskStatus,
): Task[] {
  return tasks.filter((task) => task.status === status)
}
