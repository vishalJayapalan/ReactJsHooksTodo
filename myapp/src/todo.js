import React, { useState, useEffect } from 'react'
import List from './list'
import Task from './task'

function Todo (props) {
  const [lists, setLists] = useState([])
  const [inTask, setInTask] = useState(null)

  useEffect(() => {
    fetchList()
  }, [])
  async function fetchList () {
    console.log('inFetchList')
    const data = await window.fetch('http://localhost:5000/list', {
      method: 'get'
    })
    const jsonData = await data.json()
    setLists(jsonData)
    console.log(lists)
  }
  function handleDeleteList (listId) {
    // listId
    console.log('inDeleteList')
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
    console.log('inCreateLIst')
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
    setLists([
      ...lists,
      {
        _id: listId,
        listName: listName,
        tasks: []
      }
    ])
    // event.target.value = ''
  }

  function handleUpdateList (event, listId) {
    console.log('inHandleUpdateList')
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
    console.log('inOpenTask')
    setInTask(listId)
  }

  function handleBack () {
    setInTask(null)
  }

  async function handleCreateTask (event) {
    console.log('inCreateTask')
    const _id = inTask
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
    // console.log(taskId)
    const newLists = lists
    for (const list of newLists) {
      if (list._id == inTask) {
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
    setLists(newLists)
    console.log('inCreateList after creating ', lists)
    // this.setState({ taskId, lists }) check again
  }

  function handleDeleteTask (_id, taskId) {
    console.log('inDeleteTask')
    const newLists = lists
    const list = newLists.find(l => l._id == _id)
    const listIndex = lists.findIndex(l => l._id == _id)
    list.tasks = list.tasks.filter(t => t.taskId != taskId)
    newLists[listIndex] = list

    setLists(lists)
    window.fetch(`http://localhost:5000/task/${_id}/${taskId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  function handleUpdateTask (e, name, task) {
    console.log('inUpdateTask')
    const value = e.target.value
    const listId = task.listId
    const taskId = task.taskId
    // console.log(task)
    const newLists = lists
    // const list = this.state.lists.find(l => l._id === listId)
    const listIndex = newLists.findIndex(l => l._id === listId)
    const list = lists[listIndex]
    list.tasks = list.tasks.map(t => {
      if (t.taskId === taskId) {
        t[name] = value
      }
      return t
    })
    newLists[listIndex] = list
    // console.log(lists)
    setLists(lists)
    // console.log(task)
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
    console.log(lists)
    listOrTask = (
      <List
        lists={lists}
        // listInput={this.state.listInput}
        handleDelete={handleDeleteList}
        handleCreate={handleCreateList}
        handleUpdate={handleUpdateList}
        // handleUpdateInput={e => handleUpdateInput(e)}
        handleOpenTask={openTask}
      />
    )
  } else {
    let count
    let listName
    const list = lists
    for (let i = 0; i < list.length; i++) {
      if (lists[i]._id == inTask) {
        listName = lists[i].listName
        count = i
        break
      }
    }
    console.log(count)
    console.log(lists)
    listOrTask = (
      <Task
        tasks={lists[count].tasks}
        listName={listName}
        handleBack={handleBack}
        handleCreateTask={handleCreateTask}
        deleteTask={handleDeleteTask}
        updateTask={handleUpdateTask}
        updateTaskChecked={handleUpdateTaskChecked}
      />
    )
  }

  return <div>{listOrTask}</div>
}

export default Todo
