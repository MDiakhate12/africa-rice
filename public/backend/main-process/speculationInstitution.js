const {
  createSpeculationInstitution,
  deleteSpeculationInstitution,
  getAllSpeculationInstitution,
  getSpeculationInstitutionById,
  updateSpeculationInstitution,
} = require('../services/speculations_institution')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.speculationInstitution.create, (event, arg) => {
    createSpeculationInstitution(arg)
      .then((data) => {
        event.reply(eventResponse.speculationInstitution.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.speculationInstitution.delete, (event, arg) => {
    deleteSpeculationInstitution(arg)
      .then((data) => {
        event.reply(eventResponse.speculationInstitution.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.speculationInstitution.getAll, (event, arg) => {
    getAllSpeculationInstitution(arg)
      .then((data) => {
        event.reply(eventResponse.speculationInstitution.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.speculationInstitution.update, (event, arg) => {
    getSpeculationInstitutionById(arg)
      .then((data) => {
        event.reply(eventResponse.speculationInstitution.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.speculationInstitution.getOne, (event, arg) => {
    updateSpeculationInstitution(arg.id, arg.data)
      .then((data) => {
        event.reply(eventResponse.speculationInstitution.gotOne, data)
      })
      .catch((err) => console.log(err))
  })
}
