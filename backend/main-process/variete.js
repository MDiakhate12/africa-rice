const {
  createVariete,
  deleteVariete,
  getAllVarietes,
  getVarieteById,
  updateVariete,
} = require('../services/variete')
const { events, eventResponse } = require('../utils/events')

module.exports = (ipcMain) => {
  ipcMain.on(events.variete.create, (event, arg) => {
    createVariete(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.variete.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.variete.delete, (event, arg) => {
    deleteVariete(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.variete.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.variete.getAll, (event, arg) => {
    console.log('FROM IPC MAIN')
    getAllVarietes()
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.variete.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.variete.update, (event, arg) => {
    getVarieteById(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.variete.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.variete.getOne, (event, arg) => {
    updateVariete(arg.id, arg.data)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.variete.gotOne, data)
      })
      .catch((err) => console.log(err))
  })
}
