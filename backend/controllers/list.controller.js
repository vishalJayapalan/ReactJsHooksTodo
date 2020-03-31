const List = require('../models/lists.model')

const getLists = async (req, res) => {
  List.find()
    .then(list => res.json(list))
    .catch(err => res.status(400).json('Error: ' + err))
}

const createList = async (req, res) => {
  const list = new List()
  list.listName = req.body.listName
  list.tasks = []
  list
    .save()
    .then(() => res.json({ listId: list._id }))
    .catch(err => res.status(400).json('Error: ' + err))
}

const updateList = async (req, res) => {
  const { listName } = req.body
  List.findById(req.params._id)
    .then(list => {
      list.listName = listName
      list
        .save()
        .then(() => res.json('list updated!'))
        .catch(err => res.status(400).json('Error: ' + err))
    })
    .catch(err => res.status(400).json('Error: ' + err))
}

const deleteList = async (req, res) => {
  List.deleteOne({ _id: req.params._id })
    .then(list => res.json('List Deleted.'))
    .catch(err => res.status(400).json('Error: ' + err))
}

module.exports = {
  getLists,
  createList,
  updateList,
  deleteList
}
