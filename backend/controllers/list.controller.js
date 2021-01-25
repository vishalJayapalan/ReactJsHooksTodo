const List = require('../models/lists.model')

// const add = (a, b) => a + b

const getLists = async (req, res) => {
  try {
    const lists = await List.find()
    res.status(200).json(lists)
    // console.log(lists)
    return lists
  } catch (e) {
    // res.status(400).json({ msg: 'Error: ' + e })
  }
}

const createList = async (req, res) => {
  const { listName } = req.body
  try {
    const list = await new List({ listName, tasks: [] })
    const savedList = await list.save()
    res.status(200).json({ listId: savedList._id })
    return savedList
  } catch (e) {
    res.status(400).json({ msg: 'Error: ' + e })
  }
}

const updateList = async (req, res) => {
  const { listName } = req.body
  console.log(listName)
  try {
    const list = await List.findById(req.params._id)
    list.listName = listName
    await list.save()
    res.status(200).json(list)
    return list
  } catch (e) {
    res.status(400).json({ msg: 'Error: ' + e })
  }
}

const deleteList = async (req, res) => {
  List.deleteOne({ _id: req.params._id })
    .then(list => res.json('List Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
}

module.exports = {
  // add,
  getLists,
  createList,
  updateList,
  deleteList
}
