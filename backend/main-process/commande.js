const {
  createCommande,
  deleteCommande,
  getAllCommandes,
  getCommandeById,
  updateCommande,
  getCommandeSumBySpeculation,
  getCommandeSumByVarietes,
  getCommandeSumBySpeculationByState,
} = require('../services/commande')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.commande.create, (event, arg) => {
    createCommande(arg)
      .then((data) => {
        event.reply(eventResponse.commande.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.commande.delete, (event, arg) => {
    deleteCommande(arg)
      .then((data) => {
        event.reply(eventResponse.commande.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.commande.getAll, (event, arg) => {
    getAllCommandes(arg)
      .then((data) => {
        event.reply(eventResponse.commande.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.commande.update, (event, arg) => {
    updateCommande(arg.id, arg.data)
      .then((data) => {
        event.reply(eventResponse.commande.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.commande.getOne, (event, arg) => {
    getCommandeById(arg)
      .then((data) => {
        event.reply(eventResponse.Commande.gotOne, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on('getCommandeSumBySpeculation', (event, arg) => {
    getCommandeSumBySpeculation(arg)
      .then((data) => {
        event.reply('gotCommandeSumBySpeculation', data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on('getCommandeSumByVarietes', (event, arg) => {
    getCommandeSumByVarietes(arg)
      .then((data) => {
        event.reply('gotCommandeSumByVarietes', data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on('getCommandeSumBySpeculationByState', (event, arg) => {
    getCommandeSumBySpeculationByState(arg)
      .then((data) => {
        event.reply('gotCommandeSumBySpeculationByState', data)
      })
      .catch((err) => console.log(err))
  })
}
