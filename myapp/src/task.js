import React from 'react'
import IndividualTask from './individualTask'

export default class Task extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      tasks: this.props.tasks,
      listName: this.props.listName
    }
  }

  render () {
    // console.log(this.state)
    return (
      <div>
        <nav className='taskNav'>
          <button className='back' onClick={this.props.handleBack}>
            Back
          </button>
          <button className='clearCompletedBtn'>ClearCompleted</button>
        </nav>
        <p className='showListName'>{this.props.listName.toUpperCase()}</p>
        <input
          autoFocus
          type='text'
          placeholder='Enter the taskName'
          className='taskInput'
          onKeyUp={e => {
            if (e.keyCode === 13 && e.target.value) {
              this.props.handleCreateTask(e)
            }
          }}
        />
        <div className='taskContainer'>
          {this.props.tasks.map(task => (
            <IndividualTask
              key={task.taskId}
              task={task}
              deleteTask={this.props.deleteTask}
              updateTask={this.props.updateTask}
              updateTaskChecked={this.props.updateTaskChecked}
            />
          ))}
        </div>
      </div>
    )
  }
}
