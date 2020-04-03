import React, { useState } from 'react'
import TaskFeatures from './taskFeatures'

export default function IndividualTask (props) {
  const [showTaskFeatures, setShowTaskFeatures] = useState(false)
  const [inputToggle, setInputToggle] = useState(false)

  let nameToggle
  if (inputToggle) {
    nameToggle = (
      <input
        autoFocus
        className='taskNameInput'
        type='text'
        defaultValue={props.task.taskName}
        onKeyUp={e => {
          if (e.keyCode === 13 && e.target.value) {
            setInputToggle(false)
            props.updateTask(e, 'taskName', this.props.task)
          }
        }}
        onBlur={() => this.setInputToggle(false)}
        // event,listId
      />
    )
  } else {
    nameToggle = (
      <p className='taskName' onClick={() => this.setInputToggle(true)}>
        {props.task.taskName}
      </p>
    )
  }
  return (
    <div className='individualTask'>
      <div className='task'>
        <input
          className='done'
          type='checkbox'
          onChange={e => props.updateTaskChecked(e)}
        />
        {nameToggle}
        <i
          className='fas fa-angle-down'
          onClick={() => setShowTaskFeatures(!showTaskFeatures)}
        />
      </div>
      <hr />
      {showTaskFeatures && (
        <TaskFeatures
          task={props.task}
          deleteTask={props.deleteTask}
          updateTask={props.updateTask}
        />
      )}
    </div>
  )
}
