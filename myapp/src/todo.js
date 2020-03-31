import React, { useState, useEffect } from 'react'
import List from './list'
import Task from './task'

// class Todo extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       inTask: null,
//       listId: 2,
//       taskId: 3,
//       lists: [],
//       listInput: false
//     }
//     // this.handleUpdateInput = this.handleUpdateInput.bind(this)
//   }

function Todo (props) {
  const [lists, setList] = useState([])
  const [inTask, setInTask] = useState(null)

  useEffect(() => {
    async function componentDidMount () {
      const data = await window.fetch('http://localhost:5000/list', {
        method: 'get'
      })
      const jsonData = await data.json()
      setList(jsonData) // shit
    }
    componentDidMount()
  })

  function handleDeleteList (listId) {
    // listId
    const list = lists.filter(a => a._id != listId)
    setList(list) // shit
    window.fetch(`http://localhost:5000/list/${listId}/`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  async function handleCreateList (event) {
    const listName = event.target.value
    // console.log(listName)
    const response = await window.fetch('http://localhost:5000/list/', {
      method: 'POST',
      body: JSON.stringify({ listName: listName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response.json()
    const listId = jsonData.listId
    setList([
      ...lists,
      {
        _id: listId,
        listName: listName,
        tasks: []
      }
    ]) // shit
    // event.target.value = ''
  }

  function handleUpdateList (event, listId) {
    const listName = event.target.value
    const listsUpdate = lists.map(list => {
      if (list._id == listId) {
        list.listName = listName
      }
      return list
    })
    setList(listsUpdate) //shit
    window.fetch(`http://localhost:5000/list/${listId}/`, {
      method: 'PUT',
      body: JSON.stringify({ listName: listName }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function openTask (listId) {
    setList(listId) // shit
  }

  function handleBack () {
    setInTask(null) // have to handle this
  }

  async function handleCreateTask (event) {
    const _id = inTask // have to handle this
    const taskName = event.target.value
    event.target.value = ''
    const response = await window.fetch(`http://localhost:5000/task/${_id}`, {
      method: 'POST',
      body: JSON.stringify({ taskName, listId: _id }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const jsonData = await response.json()
    const taskId = jsonData.taskId
    const listsUpdated = lists
    for (const list of lists) {
      if (list._id == inTask) {
        // have to handle this
        list.tasks.push({
          taskId,
          taskName,
          checkbox: false,
          priority: 'none',
          date: false,
          listId: list._id,
          notes: ''
        })
      }
    }
    setList(listsUpdated) // have to handle this
  }

  function handleDeleteTask (_id, taskId) {
    const listsUpdated = lists
    const list = lists.find(l => {
      return l._id == _id
    })
    const listIndex = lists.findIndex(l => l._id == _id)
    list.tasks = list.tasks.filter(t => t.taskId != taskId)
    listsUpdated[listIndex] = list

    setList(listsUpdated) // shit
    window.fetch(`http://localhost:5000/task/${_id}/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function handleUpdateTask (e, name, task) {
    const listId = task.listId
    const taskId = task.taskId
    const listsUpdated = lists.slice()
    const listIndex = lists.findIndex(l => l._id === listId)
    const list = lists[listIndex]
    list.tasks = list.tasks.map(t => {
      if (t.taskId === taskId) {
        t[name] = e.target.value
      }
      return t
    })
    listsUpdated[listIndex] = list
    setList(listsUpdated) // shit
    console.log(task)
    window.fetch(`http://localhost:5000/task/${listId}/${taskId}`, {
      method: 'PUT',
      body: JSON.stringify({ task }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function handleUpdateTaskChecked (e) {
    console.log(e.target)
  }

  let listOrTask
  if (inTask === null) {
    // should be handled
    listOrTask = (
      <List
        lists={lists}
        handleDelete={listId => handleDeleteList(listId)}
        handleCreate={e => handleCreateList(e)}
        handleUpdate={(e, listId) => handleUpdateList(e, listId)}
        // handleUpdateInput={e => handleUpdateInput(e)}
        handleOpenTask={e => openTask(e)}
      />
    )
  } else {
    let count
    let listName
    const list = lists.slice()
    for (let i = 0; i < list.length; i++) {
      if (lists[i]._id == inTask) {
        // should handle this
        listName = lists[i].listName
        count = i
        break
      }
    }
    listOrTask = (
      <Task
        tasks={lists[count].tasks}
        listName={listName}
        handleBack={() => handleBack()}
        handleCreateTask={e => handleCreateTask(e)}
        deleteTask={(listId, taskId) => handleDeleteTask(listId, taskId)}
        updateTask={(e, name, task) => handleUpdateTask(e, name, task)}
        updateTaskChecked={e => handleUpdateTaskChecked(e)}
      />
    )
  }

  return <div>{listOrTask}</div>
}

export default Todo
