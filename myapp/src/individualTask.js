import React, { useState } from 'react'
import TaskFeatures from './taskFeatures'

export default function IndividualTask (props) {
  const [showTaskFeatures, setShowTaskFeatures] = useState(false)

  return (
    <div className='individualTask'>
      <div className='task'>
        <input
          className='done'
          type='checkbox'
          checked={props.task.checked}
          onChange={e => props.updateTask(e, props.task)}
        />
        <input
          autoFocus
          className='taskNameInput'
          type='text'
          defaultValue={props.task.taskName}
          onBlur={e => {
            props.updateTask(e, props.task, 'taskName')
          }}
        />
        <i
          className='fas fa-angle-down'
          onClick={() => setShowTaskFeatures(!showTaskFeatures)}
        />
      </div>
      <hr
        className={`${
          props.task.priority == 3
            ? 'red'
            : props.task.priority == 2
            ? 'orange'
            : props.task.priority == 1
            ? 'green'
            : ''
        }`}
      />
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
