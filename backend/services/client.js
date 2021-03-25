const Models = require('../models').default
const service = require('./index')
const { Client } = Models

const createClient = async (data) => {
  const client = await service.create(Client, data)
  console.log(client.toJSON())
  return client.toJSON()
}

const getAllClients = async () => {
  const clients = await service.findAll(Client)
  console.log(clients.toJSON())
  return clients.toJSON()
}

const getClientById = async (id) => {
  const client = await service.findByKey(Client, id)
  console.log(client.toJSON())
  return client.toJSON()
}

const updateClient = async (id, data) => {
  const updated = service.update(Client, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteClient = async (id) => {
  const deleted = service.deleteByPk(Client, id)
  return deleted.toJSON()
}

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  deleteClient,
  updateClient,
}
