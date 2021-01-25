import React, { useState, useEffect } from 'react'
import IndividualTask from './individualTask'

export default function Task (props) {
  const [tasks, setTasks] = useState([])
  const [listName, setListName] = useState('')

  useEffect(() => {
    fetchList()
    async function fetchList () {
      const data = await window.fetch(
        `http://localhost:5000/task/${props.inTask}`
      )
      const jsonData = await data.json()
      const sortedTasks = sortTask(jsonData.tasks)
      setTasks(sortedTasks)
      setListName(jsonData.listName)
    }
  }, [props.tasksUpdated])

  async function handleCreateTask (event) {
    const _id = props.inTask
    const taskName = event.target.value
    event.target.value = ''
    const response = await window.fetch(`http://localhost:5000/task/${_id}`, {
      method: 'POST',
      body: JSON.stringify({
        taskName: taskName,
        listId: _id
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response.json()
    const id = jsonData.taskId
    const updatedTask = [
      ...tasks,
      {
        _id: id,
        taskName,
        checked: false,
        priority: 0,
        date: false,
        listId: props.inTask,
        notes: ''
      }
    ]

    const sortedTask = sortTask(updatedTask)
    setTasks(sortedTask)
  }

  function sortTask (newTasks) {
    // dateSorting
    newTasks.sort((a, b) => new Date(b.date) - new Date(a.date))

    // prioritySorting
    newTasks.sort((a, b) => b.priority - a.priority)

    // doneSorting
    newTasks.sort((a, b) => {
      a = a.checked
      b = b.checked
      if (a === b) return 0
      if (!a) return -1
      if (!b) return 1
    })
    return newTasks
  }

  async function handleUpdateTask (e, task, name = 'checked') {
    const listId = task.listId
    const taskId = task._id
    const value = e.target.value !== 'on' ? e.target.value : e.target.checked
    const newTasks = tasks.map(t => {
      if (t._id === taskId) {
        t[name] = value
      }
      return t
    })
    const sortedTasks = sortTask(newTasks)
    setTasks(sortedTasks)

    await window.fetch(`http://localhost:5000/task/${listId}/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ task: task }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async function handleDeleteTask (_id, taskId) {
    const list = await window.fetch(
      `http://localhost:5000/task/${_id}/${taskId}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const newTasks = tasks.filter(task => {
      return task._id != taskId
    })
    setTasks(newTasks)
  }

  return (
    <div>
      <nav className='taskNav'>
        <button className='back' onClick={props.handleBack}>
          Back
        </button>
        <button
          className='clearCompletedBtn'
          onClick={e => props.handleClearCompletedTasks(e, props.tasks)}
        >
          ClearCompleted
        </button>
      </nav>
      <p className='showListName'>{listName.toUpperCase()}</p>
      <input
        autoFocus
        type='text'
        placeholder='Enter the taskName'
        className='taskInput'
        onKeyUp={e => {
          if (e.keyCode === 13 && e.target.value) {
            handleCreateTask(e)
          }
        }}
      />
      <div className='taskContainer'>
        {tasks.map(task => (
          <IndividualTask
            key={task._id}
            task={task}
            deleteTask={handleDeleteTask}
            updateTask={handleUpdateTask}
          />
        ))}
      </div>
    </div>
  )
}
