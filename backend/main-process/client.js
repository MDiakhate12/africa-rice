const { ipcMain } = require('electron')
const {
  createClient,
  deleteClient,
  getAllClients,
  getClientById,
  updateClient,
} = require('../services/client')
const { events, eventResponse } = require('../utils/events')

ipcMain.on(events.client.create, (event, arg) => {
  createClient(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.client.created, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.client.delete, (event, arg) => {
  deleteClient(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.client.deleted, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.client.getAll, (event, arg) => {
  getAllClients()
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.client.gotAll, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.client.update, (event, arg) => {
  getClientById(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.client.updated, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.client.getOne, (event, arg) => {
  updateClient(arg.id, arg.data)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.Client.gotOne, data)
    })
    .catch((err) => console.log(err))
})
