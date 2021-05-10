const Models = require('../models').default
const service = require('./index')
const { Contact } = Models

const createContact = async (data) => {
  const contact = await service.create(Contact, data)
  console.log(contact.toJSON())
  return contact.toJSON()
}

const getAllContacts = async (arg = {}) => {
  const contacts = await service.findAll(Contact)
  console.log(contacts.toJSON())
  return contacts.toJSON()
}

const getContactById = async (id) => {
  const contact = await service.findByPk(Contact, id)
  console.log(contact.toJSON())
  return contact.toJSON()
}

const updateContact = async (id, data) => {
  const updated = service.update(Contact, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteContact = async (id) => {
  const deleted = service.deleteByPk(Contact, id)
  console.log(deleted.toJSON())
  return deleted.toJSON()
}

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContact,
}
