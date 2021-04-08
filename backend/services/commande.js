const Models = require('../models').default
const service = require('./index')
const { Commande, Client, EtatCommande, Production } = Models

const createCommande = async (data) => {
  const commande = await service.create(Commande, data)
  console.log(commande.toJSON())
  return commande.toJSON()
}

const getAllCommandes = async (arg = {}) => {
  const commandes = await service.findAll(Commande, {
    include: [Client, Production, EtatCommande],
  })
  const commandesData = commandes.map((commande) => commande.toJSON())
  console.log(commandesData)
  return commandesData
}

const getCommandeById = async (id) => {
  const commande = await service.findByKey(Commande, id)
  console.log(commande.toJSON())
  return commande.toJSON()
}

const updateCommande = async (id, data) => {
  const updated = service.update(Commande, id, data)
  console.log(updated)
  return updated
}

const deleteCommande = async (id) => {
  const deleted = service.deleteByPk(Commande, id)
  console.log(deleted)
  return deleted
}

module.exports = {
  createCommande,
  getAllCommandes,
  getCommandeById,
  deleteCommande,
  updateCommande,
}
