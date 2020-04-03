import React, { useState } from 'react'

// class IndividualList extends React.Component {
//   constructor (props) {
//     super(props)
//     this.state = {
//       inputToggle: false
//     }
//   }

export default function IndividualList (props) {
  const [inputToggle, setInputToggle] = useState(false)
  let nameToggle
  if (inputToggle) {
    nameToggle = (
      <input
        autoFocus
        className='listNameInput'
        type='text'
        defaultValue={props.list.listName}
        onKeyUp={e => {
          if (e.keyCode === 13 && e.target.value) {
            setInputToggle(false)
            props.onHandleUpdate(e, props.list._id)
          }
        }}
        onBlur={() => setInputToggle(false)}
        // event,listId
      />
    )
  } else {
    nameToggle = (
      <p className='listName' onClick={() => setInputToggle(true)}>
        {props.list.listName}
      </p>
    )
  }
  return (
    <div className='individualList' id={props.list._id}>
      <div
        className='tasksInList'
        onClick={() => props.onOpenTask(props.list._id)}
      >
        {props.list.tasks.map(task => (
          <p key={task.taskId} className='taskInList'>
            {task.taskName}
          </p>
        ))}
      </div>
      <div className='listNameContainer'>
        <i
          className='fas fa-archive'
          onClick={() => props.onHandleDelete(props.list._id)}
        />
        {nameToggle}
      </div>
    </div>
  )
}
