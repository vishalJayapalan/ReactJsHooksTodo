import React from 'react'
import IndividualList from './individualList'

export default class List extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      listInput: false
    }
  }

  listShower (list) {
    return (
      <IndividualList
        key={list._id}
        list={list}
        onHandleUpdate={this.props.handleUpdate}
        onHandleUpdateInput={this.props.handleUpdateInput}
        onHandleDelete={this.props.handleDelete}
        onOpenTask={this.props.handleOpenTask}
      />
    )
  }

  render () {
    let button
    if (this.state.listInput) {
      button = (
        <input
          autoFocus
          className='newInputList'
          type='text'
          placeholder='Please enter a List Name'
          onKeyUp={e => {
            if (e.target.value && e.keyCode === 13) {
              this.setState({ listInput: false })
              this.props.handleCreate(e)
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
            onClick={() => this.setState({ listInput: !this.state.listInput })}
          >
            CreateList
          </button>
          <button className='searchListBtn'>Search</button>
        </nav>
        {button}
        <div className='listContainer'>
          {this.props.lists.map(list => {
            return this.listShower(list)
          })}
        </div>
      </div>
    )
  }
}
