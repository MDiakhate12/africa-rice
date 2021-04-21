const {
  createProduction,
  deleteProduction,
  getAllProductions,
  getProductionsSumByVarietes,
  getProductionById,
  updateProduction,
  getProductionsSumBySpeculation,
  getProductionsSumByRegion,
  getProductionsSumBySpeculationTotal,
} = require('../services/production')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.production.create, (event, arg) => {
    createProduction(arg)
      .then((data) => {
        event.reply(eventResponse.production.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.production.delete, (event, arg) => {
    deleteProduction(arg)
      .then((data) => {
        event.reply(eventResponse.production.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.production.getAll, (event, arg) => {
    getAllProductions(arg)
      .then((data) => {
        event.reply(eventResponse.production.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on('getByVarietes', (event, arg) => {
    getProductionsSumByVarietes(arg)
      .then((data) => {
        event.reply('gotByVarietes', data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on('getProductionsSumByRegion', (event, arg) => {
    getProductionsSumByRegion(arg)
      .then((data) => {
        event.reply('gotProductionsSumByRegion', data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.production.getOne, (event, arg) => {
    getProductionById(arg)
      .then((data) => {
        event.reply(eventResponse.production.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.production.update, (event, arg) => {
    updateProduction(arg.id, arg.data)
      .then((data) => {
        event.reply(eventResponse.Production.gotOne, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on('getProductionsSumBySpeculation', (event, arg) => {
    getProductionsSumBySpeculation(arg)
      .then((data) => {
        event.reply('gotProductionsSumBySpeculation', data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on('getProductionsSumBySpeculationTotal', (event, arg) => {
    getProductionsSumBySpeculationTotal(arg)
      .then((data) => {
        event.reply('gotProductionsSumBySpeculationTotal', data)
      })
      .catch((err) => console.log(err))
  })
}
