import React, { useState } from 'react'
import IndividualList from './individualList'

export default function List (props) {
  const [listInput, setListInput] = useState(false)

  let button
  if (listInput) {
    button = (
      <input
        autoFocus
        className='newInputList'
        type='text'
        placeholder='Please enter a List Name'
        onKeyUp={e => {
          if (e.target.value && e.keyCode === 13) {
            setListInput(false)
            return props.handleCreate(e)
          }
        }}
      />
    )
  }
  return (
    <div className='listPage'>
      <nav className='listNav'>
        <button
          className='createListBtn'
          onClick={() => setListInput(!listInput)}
        >
          CreateList
        </button>
        <button className='searchListBtn'>Search</button>
      </nav>
      {button}
      <div className='listContainer'>
        {props.lists.map(list => {
          return (
            <IndividualList
              key={list._id}
              list={list}
              onHandleUpdate={props.handleUpdate}
              onHandleDelete={props.handleDelete}
              onOpenTask={props.handleOpenTask}
            />
          )
        })}
      </div>
    </div>
  )
}
