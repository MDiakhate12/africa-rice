const {
  createEtatCommande,
  deleteEtatCommande,
  getAllEtatCommandes,
  getEtatCommandeById,
  updateEtatCommande,
} = require('../services/etatCommande')

module.exports = (ipcMain, events, eventResponse) => {
  ipcMain.on(events.etatCommande.create, (event, arg) => {
    createEtatCommande(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.etatCommande.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.etatCommande.delete, (event, arg) => {
    deleteEtatCommande(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.etatCommande.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.etatCommande.getAll, (event, arg) => {
    getAllEtatCommandes(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.etatCommande.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.etatCommande.getOne, (event, arg) => {
    getEtatCommandeById(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.etatCommande.gotOne, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.etatCommande.update, (event, arg) => {
    updateEtatCommande(arg.id, arg.data)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.etatCommande.updated, data)
      })
      .catch((err) => console.log(err))
  })
}
