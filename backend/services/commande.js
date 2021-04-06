const Models = require('../models').default
const service = require('./index')
const { Commande } = Models

const createCommande = async (data) => {
  const commande = await service.create(Commande, data)
  console.log(commande.toJSON())
  return commande.toJSON()
}

const getAllCommandes = async (arg = {}) => {
  const commandes = await service.findAll(Commande)
  console.log(commandes.toJSON())
  return commandes.toJSON()
}

const getCommandeById = async (id) => {
  const commande = await service.findByKey(Commande, id)
  console.log(commande.toJSON())
  return commande.toJSON()
}

const updateCommande = async (id, data) => {
  const updated = service.update(Commande, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteCommande = async (id) => {
  const deleted = service.deleteByPk(Commande, id)
  console.log(deleted.toJSON())
  return deleted.toJSON()
}

module.exports = {
  createCommande,
  getAllCommandes,
  getCommandeById,
  deleteCommande,
  updateCommande,
}
