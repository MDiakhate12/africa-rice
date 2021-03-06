const {
  createLocalisation,
  deleteLocalisation,
  getAllLocalisations,
  getLocalisationById,
  updateLocalisation,
} = require('../services/localisation')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.localisation.create, (event, arg) => {
    createLocalisation(arg)
      .then((data) => {
        // console.log(data)
        event.reply(eventResponse.localisation.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.localisation.delete, (event, arg) => {
    deleteLocalisation(arg)
      .then((data) => {
        // console.log(data)
        event.reply(eventResponse.localisation.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.localisation.getAll, (event, arg) => {
    getAllLocalisations(arg)
      .then((data) => {
        // console.log(data)
        event.reply(eventResponse.localisation.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.localisation.getOne, (event, arg) => {
    getLocalisationById(arg)
      .then((data) => {
        // console.log(data)
        event.reply(eventResponse.localisation.gotOne, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.localisation.update, (event, arg) => {
    updateLocalisation(arg.id, arg.data)
      .then((data) => {
        // console.log(data)
        event.reply(eventResponse.Localisation.updated, data)
      })
      .catch((err) => console.log(err))
  })
}
