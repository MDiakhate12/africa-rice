const Models = require('../models').default
const service = require('./index')
const { NiveauInstitution, NiveauDeProduction } = Models

const createNiveauInstitution = async (data) => {
  const niveauInstitution = await service.create(NiveauInstitution, data)
  console.log(niveauInstitution.toJSON())
  return niveauInstitution.toJSON()
}

const getAllNiveauInstitutions = async () => {
  let option = {
    include: [NiveauDeProduction],
  }
  if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const niveauInstitutions = await service.findAll(NiveauInstitution, option)
  const niveauInstitutionsData = niveauInstitutions.map((niveauInstitution) =>
    niveauInstitution.toJSON(),
  )
  console.log(niveauInstitutionsData)
  return niveauInstitutionsData
}

const getNiveauInstitutionById = async (id) => {
  const niveauInstitution = await service.findByKey(NiveauInstitution, id, {
    include: [NiveauDeProduction],
  })
  console.log(niveauInstitution.toJSON())
  return niveauInstitution.toJSON()
}

const updateNiveauInstitution = async (id, data) => {
  const updated = service.update(NiveauInstitution, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteNiveauInstitution = async (id) => {
  const deleted = service.deleteByPk(NiveauInstitution, id)
  console.log(deleted.toJSON())
  return deleted.toJSON()
}

module.exports = {
  createNiveauInstitution,
  getAllNiveauInstitutions,
  getNiveauInstitutionById,
  deleteNiveauInstitution,
  updateNiveauInstitution,
}
