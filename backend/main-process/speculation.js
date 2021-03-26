const {
  createSpeculation,
  deleteSpeculation,
  getAllSpeculations,
  getSpeculationById,
  updateSpeculation,
} = require('../services/speculation')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.speculation.create, (event, arg) => {
    createSpeculation(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.speculation.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.speculation.delete, (event, arg) => {
    deleteSpeculation(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.speculation.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.speculation.getAll, (event, arg) => {
    getAllSpeculations()
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.speculation.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.speculation.update, (event, arg) => {
    getSpeculationById(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.speculation.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.speculation.getOne, (event, arg) => {
    updateSpeculation(arg.id, arg.data)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.speculation.gotOne, data)
      })
      .catch((err) => console.log(err))
  })
}
