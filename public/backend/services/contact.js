const Models = require("../models").default;
const service = require("./index");
const { Contact, Client } = Models;

const createContact = async (data) => {
  const contact = await service.create(Contact, data);
  console.log(contact.toJSON());
  return contact.toJSON();
};

const getAllContacts = async (arg = {}) => {
  let option = {
    includes: [Client],
  };

  if (Object.keys(arg)) option = { ...option, where: { ...arg } };

  const contacts = await service.findAll(Contact, option);
  const contactsData = contacts.map((contact) => contact.toJSON());

  console.log(contactsData);
  return contactsData;
};

const getContactById = async (id) => {
  const contact = await service.findByPk(Contact, id);
  console.log(contact.toJSON());
  return contact.toJSON();
};

const updateContact = async (id, data) => {
  const updated = service.update(Contact, id, data);
  console.log(updated);
  return updated;
};

const deleteContact = async (id) => {
  const deleted = service.deleteByPk(Contact, id);
  console.log(deleted);
  return deleted;
};

module.exports = {
  createContact,
  getAllContacts,
  getContactById,
  deleteContact,
  updateContact,
};
