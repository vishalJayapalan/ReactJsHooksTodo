import React,{useState} from 'react'

// class IndividualList extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       inputToggle: false
//     }
//   }

  // render () {
function IndividualList(props){
const [inputToggle,setInputToggle] = [false]

    let nameToggle
    if (this.state.inputToggle) {
      nameToggle = (
        <input
          autoFocus
          className='listNameInput'
          type='text'
          defaultValue={this.props.list.listName}
          onKeyUp={e => {
            if (e.keyCode === 13 && e.target.value) {
              this.setState({ inputToggle: false })
              this.props.onHandleUpdate(e, this.props.list._id)
            }
          }}
          onBlur={() => this.setState({ inputToggle: false })}
          // event,listId
        />
      )
    } else {
      nameToggle = (
        <p
          className='listName'
          onClick={() => this.setState({ inputToggle: true })}
        >
          {this.props.list.listName}
        </p>
      )
    }
    return (
      <div className='individualList' id={this.props.list._id}>
        <div
          className='tasksInList'
          onClick={() => this.props.onOpenTask(this.props.list._id)}
        >
          {this.props.list.tasks.map(task => (
            <p key={task.taskId} className='taskInList'>
              {task.taskName}
            </p>
          ))}
        </div>
        <div className='listNameContainer'>
          <i
            className='fas fa-archive'
            onClick={() => this.props.onHandleDelete(this.props.list._id)}
          />
          {nameToggle}
        </div>
      </div>
    )
  }
}

export default IndividualList
