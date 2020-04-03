import React, { useState } from 'react'
import IndividualTask from './individualTask'

// export default class Task extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       tasks: this.props.tasks,
//       listName: this.props.listName
//     }
//   }

// console.log(this.state)
export default function Task (props) {
  return (
    <div>
      <nav className='taskNav'>
        <button className='back' onClick={props.handleBack}>
          Back
        </button>
        <button className='clearCompletedBtn'>ClearCompleted</button>
      </nav>
      <p className='showListName'>{props.listName.toUpperCase()}</p>
      <input
        autoFocus
        type='text'
        placeholder='Enter the taskName'
        className='taskInput'
        onKeyUp={e => {
          if (e.keyCode === 13 && e.target.value) {
            props.handleCreateTask(e)
          }
        }}
      />
      <div className='taskContainer'>
        {props.tasks.map(task => (
          <IndividualTask
            key={task.taskId}
            task={task}
            deleteTask={props.deleteTask}
            updateTask={props.updateTask}
            updateTaskChecked={props.updateTaskChecked}
          />
        ))}
      </div>
    </div>
  )
}
