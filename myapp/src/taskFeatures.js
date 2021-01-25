import React from 'react'

// export default class TaskFeatures extends React.Component {
//   render () {
export default function TaskFeatures (props) {
  // console.log(props)
  return (
    <div className='taskFeatures'>
      <p className='notes'>Notes</p>
      <textarea
        className='textNotes'
        defaultValue={props.task.notes}
        onChange={e => props.updateTask(e, props.task, 'notes')}
      />
      <p className='dueDate'>Due Date</p>
      <input
        type='date'
        className='date'
        defaultValue={props.task.date}
        onChange={e => props.updateTask(e, props.task, 'date')}
      />
      <p className='priority'>Priority</p>
      <select
        className='prioritySelect'
        defaultValue={props.task.priority}
        onChange={e => props.updateTask(e, props.task, 'priority')}
      >
        <option value='0'>None</option>
        <option value='1'>Low</option>
        <option value='2'>Medium</option>
        <option value='3'>High</option>
      </select>
      <button
        className='dltBtn'
        onClick={() => props.deleteTask(props.task.listId, props.task._id)}
      >
        Delete
      </button>
    </div>
  )
}
