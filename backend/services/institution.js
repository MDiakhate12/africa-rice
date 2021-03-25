const Models = require('../models').default
const service = require('./index')
const { Institution } = Models

const createInstitution = async (data) => {
  const institution = await service.create(Institution, data)
  console.log(institution.toJSON())
  return institution.toJSON()
}

const getAllInstitutions = async () => {
  const institutions = await service.findAll(Institution)
  const institutionsData = institutions.map((institution) =>
    institution.toJSON(),
  )
  console.log(institutionsData)
  return institutionsData
}

const getInstitutionById = async (id) => {
  const institution = await service.findByKey(Institution, id)
  console.log(institution.toJSON())
  return institution.toJSON()
}

const updateInstitution = async (id, data) => {
  const updated = service.update(Institution, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteInstitution = async (id) => {
  const deleted = service.deleteByPk(Institution, id)
  console.log(deleted.toJSON())
  return deleted.toJSON()
}

module.exports = {
  createInstitution,
  getAllInstitutions,
  getInstitutionById,
  deleteInstitution,
  updateInstitution,
}
