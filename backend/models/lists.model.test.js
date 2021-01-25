// const listController = require('./list.controller')
const mongoose = require('mongoose')

const List = require('../models/lists.model')

require('dotenv').config()

// const uri = process.env.ATLAS_URI
const uri = 'mongodb://127.0.0.1/todo_test_database'
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
})

describe('list Model Test', () => {
  beforeAll(async () => {
    await List.deleteMany({})
  })
  afterEach(async () => {
    await List.deleteMany({})
  })
  afterAll(async () => {
    await mongoose.connection.close()
  })
  it('has a module', () => {
    expect(List).toBeDefined()
  })
  describe('get list', () => {
    it('get a list', async () => {
      const list = new List({ listName: 'Shopping List', tasks: [] })
      await list.save()
      const gotLists = await List.find()
      const expected = 'Shopping List'
      const actual = gotLists[0].listName
      expect(actual).toEqual(expected)
    })
  })

  describe('save Lists', () => {
    it('saves a List', async () => {
      const list = new List({ listName: 'Shopping List', tasks: [] })
      const savedList = await list.save()
      const expected = 'Shopping List'
      const actual = savedList.listName
      expect(actual).toEqual(expected)
    })
  })

  describe('update List', () => {
    it('updates a list', async () => {
      const list = new List({ listName: 'Shopping List', tasks: [] })
      await list.save()
      list.listName = 'Shopping Lists'
      const updatedList = await list.save()
      const expected = 'Shopping Lists'
      const actual = updatedList.listName
      expect(actual).toEqual(expected)
    })
  })
})
