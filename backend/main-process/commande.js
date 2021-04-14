const {
  createCommande,
  deleteCommande,
  getAllCommandes,
  getCommandeById,
  updateCommande,
  getCommandeSumBySpeculationByMonth,
} = require('../services/commande')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.commande.create, (event, arg) => {
    createCommande(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.commande.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.commande.delete, (event, arg) => {
    deleteCommande(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.commande.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.commande.getAll, (event, arg) => {
    getAllCommandes(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.commande.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.commande.update, (event, arg) => {
    updateCommande(arg.id, arg.data)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.commande.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.commande.getOne, (event, arg) => {
    getCommandeById(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.Commande.gotOne, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on('getCommandeSumBySpeculationByMonth', (event, arg) => {
    getCommandeSumBySpeculationByMonth(arg)
      .then((data) => {
        console.log(data)
        event.reply('gotCommandeSumBySpeculationByMonth', data)
      })
      .catch((err) => console.log(err))
  })
}
