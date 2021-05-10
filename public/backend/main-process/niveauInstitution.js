const {
  createNiveauInstitution,
  deleteNiveauInstitution,
  getAllNiveauInstitutions,
  getNiveauInstitutionById,
  updateNiveauInstitution,
} = require('../services/niveauInstitution')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.niveauInstitution.create, (event, arg) => {
    createNiveauInstitution(arg)
      .then((data) => {
        event.reply(eventResponse.niveauInstitution.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.niveauInstitution.delete, (event, arg) => {
    deleteNiveauInstitution(arg)
      .then((data) => {
        event.reply(eventResponse.niveauInstitution.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.niveauInstitution.getAll, (event, arg) => {
    getAllNiveauInstitutions(arg)
      .then((data) => {
        event.reply(eventResponse.niveauInstitution.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.niveauInstitution.update, (event, arg) => {
    getNiveauInstitutionById(arg)
      .then((data) => {
        event.reply(eventResponse.niveauInstitution.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.niveauInstitution.getOne, (event, arg) => {
    updateNiveauInstitution(arg.id, arg.data)
      .then((data) => {
        event.reply(eventResponse.NiveauInstitution.gotOne, data)
      })
      .catch((err) => console.log(err))
  })
}
