
import { describe, test, expect } from '@jest/globals'
import { filterTasksByStatus } from './taskHelpers'
import type { Task } from '../services/taskApi'

describe('filterTasksByStatus', () => {
  const tasks: Task[] = [
    { id: 1, title: 'First task', status: 'todo' },
    { id: 2, title: 'Second task', status: 'done' },
    { id: 3, title: 'Third task', status: 'todo' },
  ]

  test('returns only tasks with the selected status', () => {
    const result = filterTasksByStatus(tasks, 'todo')

    expect(result).toHaveLength(2)
    expect(result.every((task) => task.status === 'todo')).toBe(true)
  })

  test('returns an empty array when no tasks match', () => {
    const result = filterTasksByStatus(tasks, 'inProgress')

    expect(result).toEqual([])
  })
})
