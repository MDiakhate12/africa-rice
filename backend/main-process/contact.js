// const { ipcMain } = require('electron')
const {
  createContact,
  deleteContact,
  getAllContacts,
  getContactById,
  updateContact,
} = require('../services/contact')
const { events, eventResponse } = require('../utils/events')

module.exports = (ipcMain) => {
  ipcMain.on(events.contact.create, (event, arg) => {
    createContact(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.contact.created, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.contact.delete, (event, arg) => {
    deleteContact(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.contact.deleted, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.contact.getAll, (event, arg) => {
    getAllContacts()
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.contact.gotAll, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.contact.update, (event, arg) => {
    getContactById(arg)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.contact.updated, data)
      })
      .catch((err) => console.log(err))
  })

  ipcMain.on(events.contact.getOne, (event, arg) => {
    updateContact(arg.id, arg.data)
      .then((data) => {
        console.log(data)
        event.reply(eventResponse.Contact.gotOne, data)
      })
      .catch((err) => console.log(err))
  })
}
