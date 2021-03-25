const { ipcMain } = require('electron')
const {
  createProduction,
  deleteProduction,
  getAllProductions,
  getProductionById,
  updateProduction,
} = require('../services/production')
const { events, eventResponse } = require('../utils/events')

ipcMain.on(events.production.create, (event, arg) => {
  createProduction(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.production.created, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.production.delete, (event, arg) => {
  deleteProduction(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.production.deleted, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.production.getAll, (event, arg) => {
  getAllProductions()
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.production.gotAll, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.production.update, (event, arg) => {
  getProductionById(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.production.updated, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.production.getOne, (event, arg) => {
  updateProduction(arg.id, arg.data)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.Production.gotOne, data)
    })
    .catch((err) => console.log(err))
})
