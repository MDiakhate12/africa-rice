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

const getAllVarieteInstitutions = async () => {
  const varietes = await service.findAll(VarieteInstitution, {
    include: [
      Institution,
      SpeculationInstitution,
      { model: Variete, include: [Speculation, ZoneAgroEcologique] },
    ],
  })
  const variestesData = varietes.map((variete) => variete.toJSON())
  // console.log(variestesData);
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
  const updated = service.update(VarieteInstitution, id, data)
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
