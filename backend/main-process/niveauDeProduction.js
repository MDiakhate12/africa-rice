const { ipcMain } = require('electron')
const {
  createNiveauDeProduction,
  deleteNiveauDeProduction,
  getAllNiveauDeProductions,
  getNiveauDeProductionById,
  updateNiveauDeProduction,
} = require('../services/niveauDeProduction')
const { events, eventResponse } = require('../utils/events')

ipcMain.on(events.niveauDeProduction.create, (event, arg) => {
  createNiveauDeProduction(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.niveauDeProduction.created, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.niveauDeProduction.delete, (event, arg) => {
  deleteNiveauDeProduction(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.niveauDeProduction.deleted, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.niveauDeProduction.getAll, (event, arg) => {
  getAllNiveauDeProductions()
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.niveauDeProduction.gotAll, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.niveauDeProduction.update, (event, arg) => {
  getNiveauDeProductionById(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.niveauDeProduction.updated, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.niveauDeProduction.getOne, (event, arg) => {
  updateNiveauDeProduction(arg.id, arg.data)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.NiveauDeProduction.gotOne, data)
    })
    .catch((err) => console.log(err))
})
