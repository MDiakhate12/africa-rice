const {
  createVarieteInstitution,
  deleteVarieteInstitution,
  getAllVarieteInstitutions,
  getVarieteInstitutionById,
  updateVarieteInstitution,
} = require('../services/varieteInstitution')
const { events, eventResponse } = require('../utils/events')

module.exports = (ipcMain) => {
  ipcMain.on(events.varieteInstitution.create, (event, arg) => {
    createVarieteInstitution(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.varieteInstitution.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.varieteInstitution.delete, (event, arg) => {
    deleteVarieteInstitution(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.varieteInstitution.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.varieteInstitution.getAll, (event, arg) => {
    getAllVarieteInstitutions()
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.varieteInstitution.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.varieteInstitution.update, (event, arg) => {
    getVarieteInstitutionById(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.varieteInstitution.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.varieteInstitution.getOne, (event, arg) => {
    updateVarieteInstitution(arg.id, arg.data)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.varieteInstitution.gotOne, data)
      })
      .catch((err) => console.log(err))
  })
}
