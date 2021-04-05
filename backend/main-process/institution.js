const {
  createInstitution,
  deleteInstitution,
  getAllInstitutions,
  getInstitutionById,
  updateInstitution,
} = require('../services/institution')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.institution.create, (event, arg) => {
    createInstitution(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.institution.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.institution.delete, (event, arg) => {
    deleteInstitution(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.institution.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.institution.getAll, (event, arg) => {
    getAllInstitutions()
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.institution.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.institution.getOne, (event, arg) => {
    getInstitutionById(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.institution.gotOne, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.institution.update, (event, arg) => {
    updateInstitution(arg.id, arg.data)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.institution.updated, data)
      })
      .catch((err) => console.log(err))
  })
}
