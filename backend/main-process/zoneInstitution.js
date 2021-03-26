const {
  createZone,
  deleteZone,
  getAllZones,
  getZoneById,
  updateZone,
} = require('../services/zoneInstitution')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.zoneAgro.create, (event, arg) => {
    createZone(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.zoneAgro.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.zoneAgro.delete, (event, arg) => {
    deleteZone(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.zoneAgro.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.zoneAgro.getAll, (event, arg) => {
    getAllZones()
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.zoneAgro.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.zoneAgro.update, (event, arg) => {
    getZoneById(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.zoneAgro.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.zoneAgro.getOne, (event, arg) => {
    updateZone(arg.id, arg.data)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.zoneAgro.gotOne, data)
      })
      .catch((err) => console.log(err))
  })
}
