const Models = require("../models").default;
const service = require("./index");
const { Client, Institution } = Models;

const createClient = async (data) => {
  const client = await service.create(Client, data);
  console.log(client.toJSON());
  return client.toJSON();
};

const getAllClients = async (arg = {}) => {
  let option = {
    includes: [Institution],
  };

  if (Object.keys(arg)) option = { ...option, where: { ...arg } };

  const clients = await service.findAll(Client, option);
  const clientsData = clients.map((client) => client.toJSON());
  console.log(clientsData);
  return clientsData;
};

const getClientById = async (id) => {
  const client = await service.findByPk(Client, id);
  console.log(client.toJSON());
  return client.toJSON();
};

const updateClient = async (id, data) => {
  const updated = await service.update(Client, id, data);
  console.log(updated);
  return updated;
};

const deleteClient = async (id) => {
  const deleted = await service.deleteByPk(Client, id);
  console.log(deleted);
  return deleted;
};

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  deleteClient,
  updateClient,
};
