const {
  createCommande,
  deleteCommande,
  getAllCommandes,
  getCommandeById,
  updateCommande,
} = require('../services/commande')
const { events, eventResponse } = require('../utils/events')

module.exports = (ipcMain) => {
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
    getAllCommandes()
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.commande.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.commande.update, (event, arg) => {
    getCommandeById(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.commande.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.commande.getOne, (event, arg) => {
    updateCommande(arg.id, arg.data)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.Commande.gotOne, data)
      })
      .catch((err) => console.log(err))
  })
}
