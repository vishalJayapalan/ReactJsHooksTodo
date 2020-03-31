import React from 'react'
import TaskFeatures from './taskFeatures'

export default class IndividualTask extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showTaskFeatures: false,
      nameToggle: false
    }
  }

  render () {
    // console.log(this.props)
    let nameToggle
    if (this.state.inputToggle) {
      nameToggle = (
        <input
          autoFocus
          className='taskNameInput'
          type='text'
          defaultValue={this.props.task.taskName}
          onKeyUp={e => {
            if (e.keyCode === 13 && e.target.value) {
              this.setState({ inputToggle: false })
              this.props.updateTask(e, 'taskName', this.props.task)
            }
          }}
          onBlur={() => this.setState({ inputToggle: false })}
          // event,listId
        />
      )
    } else {
      nameToggle = (
        <p
          className='taskName'
          onClick={() => this.setState({ inputToggle: true })}
        >
          {this.props.task.taskName}
        </p>
      )
    }
    return (
      <div className='individualTask'>
        <div className='task'>
          <input
            className='done'
            type='checkbox'
            onChange={e => this.props.updateTaskChecked(e)}
          />
          {nameToggle}
          <i
            className='fas fa-angle-down'
            onClick={() =>
              this.setState({ showTaskFeatures: !this.state.showTaskFeatures })
            }
          />
        </div>
        <hr />
        {this.state.showTaskFeatures && (
          <TaskFeatures
            task={this.props.task}
            deleteTask={this.props.deleteTask}
            updateTask={this.props.updateTask}
          />
        )}
      </div>
    )
  }
}
