const {
  createNiveauDeProduction,
  deleteNiveauDeProduction,
  getAllNiveauDeProductions,
  getNiveauDeProductionById,
  updateNiveauDeProduction,
} = require('../services/niveauDeProduction')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.niveauDeProduction.create, (event, arg) => {
    createNiveauDeProduction(arg)
      .then((data) => {
        event.reply(eventResponse.niveauDeProduction.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.niveauDeProduction.delete, (event, arg) => {
    deleteNiveauDeProduction(arg)
      .then((data) => {
        event.reply(eventResponse.niveauDeProduction.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.niveauDeProduction.getAll, (event, arg) => {
    getAllNiveauDeProductions(arg)
      .then((data) => {
        event.reply(eventResponse.niveauDeProduction.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.niveauDeProduction.getOne, (event, arg) => {
    getNiveauDeProductionById(arg)
      .then((data) => {
        event.reply(eventResponse.niveauDeProduction.gotOne, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.niveauDeProduction.update, (event, arg) => {
    updateNiveauDeProduction(arg.id, arg.data)
      .then((data) => {
        event.reply(eventResponse.NiveauDeProduction.updated, data)
      })
      .catch((err) => console.log(err))
  })
}
