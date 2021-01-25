import React, { useState, useEffect } from 'react'
import List from './list'
import Task from './task'

function Todo (props) {
  const [lists, setLists] = useState([])
  const [inTask, setInTask] = useState()

  useEffect(() => {
    fetchList()
  }, [inTask])

  async function fetchList () {
    const data = await window.fetch('http://localhost:5000/list')
    const jsonData = await data.json()
    setLists(jsonData)
  }

  function handleDeleteList (listId) {
    const list = lists.filter(a => a._id != listId)
    setLists(list)
    window.fetch(`http://localhost:5000/list/${listId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async function handleCreateList (event) {
    const listName = event.target.value
    const response = await window.fetch('http://localhost:5000/list/', {
      method: 'POST',
      body: JSON.stringify({ listName: listName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response.json()
    const listId = jsonData.listId
    setLists([
      ...lists,
      {
        _id: listId,
        listName: listName,
        tasks: []
      }
    ])
  }

  function handleUpdateList (event, listId) {
    const listName = event.target.value
    const newLists = lists.map(list => {
      if (list._id == listId) {
        list.listName = listName
      }
      return list
    })
    setLists(newLists)
    window.fetch(`http://localhost:5000/list/${listId}/`, {
      method: 'PUT',
      body: JSON.stringify({ listName: listName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function openTask (listId) {
    setInTask(listId)
  }

  function handleBack () {
    setInTask(null)
  }

  function handleClearCompleted (e) {
    const updatedLists = lists.map(list => {
      if (list._id === inTask) {
        const updatedTasks = list.tasks.filter(task => task.checked !== true)
        return { ...list, tasks: updatedTasks }
      } else {
        return list
      }
    })
    setLists(updatedLists)
    window.fetch(`http://localhost:5000/task/${inTask}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  return (
    <div>
      {inTask ? (
        <Task
          inTask={inTask}
          handleBack={handleBack}
          handleClearCompletedTasks={handleClearCompleted}
        />
      ) : (
        <List
          lists={lists}
          handleDelete={handleDeleteList}
          handleCreate={handleCreateList}
          handleUpdate={handleUpdateList}
          handleOpenTask={openTask}
        />
      )}
    </div>
  )
}

export default Todo
