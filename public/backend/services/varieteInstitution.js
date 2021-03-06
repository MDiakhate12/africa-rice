const Models = require('../models').default
const service = require('./index')
const {
  VarieteInstitution,
  Institution,
  SpeculationInstitution,
  Variete,
  Speculation,
  ZoneAgroEcologique,
} = Models

const createVarieteInstitution = async (data) => {
  const variete = await service.create(VarieteInstitution, data)
  console.log(variete.toJSON())
  return variete.toJSON()
}

const getAllVarieteInstitutions = async (arg = {}) => {
  let option = {
    include: [
      Institution,
      SpeculationInstitution,
      { model: Variete, include: [Speculation, ZoneAgroEcologique] },
    ],
  }
  if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const varietes = await service.findAll(VarieteInstitution, option)
  const variestesData = varietes.map((variete) => variete.toJSON())
  return variestesData
}

const getVarieteInstitutionById = async (id) => {
  const variete = await service.findByPk(VarieteInstitution, id, {
    include: [Variete],
  })
  console.log(variete.toJSON())
  return variete.toJSON()
}

const updateVarieteInstitution = async (id, data) => {
  const updated = await service.update(VarieteInstitution, id, data)
  console.log(updated.toJSON())
  return updated.toJSON()
}

const deleteVarieteInstitution = async (id) => {
  const deleted = await service.deleteByPk(VarieteInstitution, id)
  console.log(deleted)
  return deleted
}

module.exports = {
  createVarieteInstitution,
  getAllVarieteInstitutions,
  getVarieteInstitutionById,
  deleteVarieteInstitution,
  updateVarieteInstitution,
}
