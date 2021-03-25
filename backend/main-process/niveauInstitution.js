const { ipcMain } = require('electron')
const {
  createNiveauInstitution,
  deleteNiveauInstitution,
  getAllNiveauInstitutions,
  getNiveauInstitutionById,
  updateNiveauInstitution,
} = require('../services/niveauInstitution')
const { events, eventResponse } = require('../utils/events')

ipcMain.on(events.niveauInstitution.create, (event, arg) => {
  createNiveauInstitution(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.niveauInstitution.created, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.niveauInstitution.delete, (event, arg) => {
  deleteNiveauInstitution(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.niveauInstitution.deleted, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.niveauInstitution.getAll, (event, arg) => {
  getAllNiveauInstitutions()
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.niveauInstitution.gotAll, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.niveauInstitution.update, (event, arg) => {
  getNiveauInstitutionById(arg)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.niveauInstitution.updated, data)
    })
    .catch((err) => console.log(err))
})

ipcMain.on(events.niveauInstitution.getOne, (event, arg) => {
  updateNiveauInstitution(arg.id, arg.data)
    .then((data) => {
      console.log(data)
      event.reply(eventResponse.NiveauInstitution.gotOne, data)
    })
    .catch((err) => console.log(err))
})
