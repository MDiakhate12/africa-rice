const Models = require('../models').default
const service = require('./index')
const { Client } = Models

const createClient = async (data) => {
  const client = await service.create(Client, data)
  console.log(client.toJSON())
  return client.toJSON()
}

const getAllClients = async (arg = {}) => {
  const clients = await service.findAll(Client)
  const clientsData = clients.map((client) => client.toJSON())
  console.log(clientsData)
  return clientsData
}

const getClientById = async (id) => {
  const client = await service.findByKey(Client, id)
  console.log(client.toJSON())
  return client.toJSON()
}

const updateClient = async (id, data) => {
  const updated = service.update(Client, id, data)
  console.log(updated)
  return updated
}

const deleteClient = async (id) => {
  const deleted = service.deleteByPk(Client, id)
  return deleted
}

module.exports = {
  createClient,
  getAllClients,
  getClientById,
  deleteClient,
  updateClient,
}
