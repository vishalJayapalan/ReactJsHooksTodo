import React from 'react'

export default class TaskFeatures extends React.Component {
  render () {
    return (
      <div className='taskFeatures'>
        <p className='notes'>Notes</p>
        <textarea
          className='textNotes'
          defaultValue={this.props.task.notes}
          onChange={e => this.props.updateTask(e, 'notes', this.props.task)}
        />
        <p className='dueDate'>Due Date</p>
        <input
          type='date'
          className='date'
          defaultValue={this.props.task.date}
          onChange={e => this.props.updateTask(e, 'date', this.props.task)}
        />
        <p className='priority'>Priority</p>
        <select
          className='prioritySelect'
          defaultValue={this.props.task.priority}
          onChange={e => this.props.updateTask(e, 'priority', this.props.task)}
        >
          <option value='0'>None</option>
          <option value='1'>Low</option>
          <option value='2'>Medium</option>
          <option value='3'>High</option>
        </select>
        <button
          className='dltBtn'
          onClick={() =>
            this.props.deleteTask(
              this.props.task.listId,
              this.props.task.taskId
            )
          }
        >
          Delete
        </button>
      </div>
    )
  }
}
