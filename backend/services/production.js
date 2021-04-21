const Models = require('../models').default
const service = require('./index')
const {
  Production,
  SpeculationInstitution,
  Magasin,
  Localisation,
  NiveauInstitution,
  NiveauDeProduction,
  VarieteInstitution,
  Variete,
  sequelize,
  Speculation,
} = Models

const createProduction = async (data) => {
  const production = await service.create(Production, data)
  console.log(production.toJSON())
  return production.toJSON()
}

const getAllProductions = async (arg = {}) => {
  let option = {
    include: [
      Magasin,
      Localisation,
      { model: NiveauInstitution, include: NiveauDeProduction },
      {
        model: VarieteInstitution,
        include: [
          Variete,
          { model: SpeculationInstitution, include: [Speculation] },
        ],
      },
    ],
  }
  if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const productions = await service.findAll(Production, option)
  const productionsData = productions.map((production) => production.toJSON())
  return productionsData
}

const getProductionsSumBySpeculation = async (arg = {}) => {
  let option = {
    include: [
      {
        model: VarieteInstitution,
        include: [
          Variete,
          { model: SpeculationInstitution, include: Speculation },
        ],
      },
    ],
    group: ['VarieteInstitution.speculationInstitutionId'],
    attributes: [
      'VarieteInstitution.speculationInstitutionId',
      [
        sequelize.fn('sum', sequelize.col('quantite_produite')),
        'totalQuantiteProduite',
      ],
      [
        sequelize.fn('sum', sequelize.col('quantite_disponible')),
        'totalQuantiteDisponible',
      ],
      [sequelize.fn('sum', sequelize.col('prix_unitaire')), 'totalPrix'],
      [sequelize.fn('sum', sequelize.col('stock_de_securite')), 'totalStock'],
    ],
  }
  if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const productions = await service.findAll(Production, option)
  const productionsData = productions.map((production) => production.toJSON())
  return productionsData
}

const getProductionsSumBySpeculationTotal = async (arg = {}) => {
  let option = {
    include: [
      {
        model: VarieteInstitution,
        include: [
          Variete,
          { model: SpeculationInstitution, include: Speculation },
        ],
      },
    ],
    attributes: [
      'VarieteInstitution.speculationInstitutionId',
      [
        sequelize.fn('sum', sequelize.col('quantite_produite')),
        'totalQuantiteProduite',
      ],
      [
        sequelize.fn('sum', sequelize.col('quantite_disponible')),
        'totalQuantiteDisponible',
      ],
      [sequelize.fn('sum', sequelize.col('prix_unitaire')), 'totalPrix'],
      [sequelize.fn('sum', sequelize.col('stock_de_securite')), 'totalStock'],
    ],
  }
  if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const productions = await service.findAll(Production, option)
  const productionsData = productions.map((production) => production.toJSON())[0]
  return productionsData
}

const getProductionsSumByVarietes = async (arg = {}) => {
  let option = {
    include: [
      Localisation,
      {
        model: VarieteInstitution,
        include: [
          Variete,
          { model: SpeculationInstitution, include: Speculation },
        ],
      },
    ],
    group: ['varieteInstitutionId'],
    attributes: [
      'varieteInstitutionId',
      [
        sequelize.fn('sum', sequelize.col('quantite_produite')),
        'totalQuantiteProduite',
      ],
      [
        sequelize.fn('sum', sequelize.col('quantite_disponible')),
        'totalQuantiteDisponible',
      ],
      [sequelize.fn('sum', sequelize.col('prix_unitaire')), 'totalPrix'],
      [sequelize.fn('sum', sequelize.col('stock_de_securite')), 'totalStock'],
    ],
  }
  
  if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const productions = await service.findAll(Production, option)
  const productionsData = productions.map((production) => production.toJSON())
  return productionsData
}
const getProductionsSumByRegion = async (arg = {}) => {
  let option = {
    include: [
      Localisation,
      {
        model: VarieteInstitution,
        include: [
          Variete,
          { model: SpeculationInstitution, include: Speculation },
        ],
      },
    ],
    group: ['Localisation.region'],
    attributes: [
      'varieteInstitutionId',
      'Localisation.region',
      [
        sequelize.fn('sum', sequelize.col('quantite_produite')),
        'totalQuantiteProduite',
      ],
      [
        sequelize.fn('sum', sequelize.col('quantite_disponible')),
        'totalQuantiteDisponible',
      ],
      [sequelize.fn('sum', sequelize.col('prix_unitaire')), 'totalPrix'],
      [sequelize.fn('sum', sequelize.col('stock_de_securite')), 'totalStock'],
    ],
  }

  if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const productions = await service.findAll(Production, option)
  const productionsData = productions.map((production) => production.toJSON())
  return productionsData
}

const getProductionById = async (id) => {
  const production = await service.findByKey(Production, id)
  console.log(production.toJSON())
  return production.toJSON()
}

const updateProduction = async (id, data) => {
  const updated = service.update(Production, id, data)
  console.log(updated)
  return updated
}

const deleteProduction = async (id) => {
  const deleted = service.deleteByPk(Production, id)
  console.log(deleted)
  return deleted
}

module.exports = {
  createProduction,
  getAllProductions,
  getProductionsSumBySpeculation,
  getProductionsSumBySpeculationTotal,
  getProductionsSumByVarietes,
  getProductionsSumByRegion,
  getProductionById,
  deleteProduction,
  updateProduction,
}
