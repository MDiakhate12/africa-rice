const {
  createMagasin,
  deleteMagasin,
  getAllMagasins,
  getMagasinById,
  updateMagasin,
} = require('../services/magasin')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.magasin.create, (event, arg) => {
    createMagasin(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.magasin.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.magasin.delete, (event, arg) => {
    deleteMagasin(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.magasin.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.magasin.getAll, (event, arg) => {
    getAllMagasins()
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.magasin.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.magasin.update, (event, arg) => {
    getMagasinById(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.magasin.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.magasin.getOne, (event, arg) => {
    updateMagasin(arg.id, arg.data)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.Magasin.gotOne, data)
      })
      .catch((err) => console.log(err))
  })
}
