const Models = require('../models').default
const service = require('./index')

const {
  Production,
  Client,
  EtatCommande,
  SpeculationInstitution,
  Magasin,
  Localisation,
  NiveauInstitution,
  NiveauDeProduction,
  VarieteInstitution,
  Variete,
  sequelize,
  Speculation,
  Commande,
} = Models

const createCommande = async (data) => {
  const commande = await service.create(Commande, data)
  console.log(commande.toJSON())
  return commande.toJSON()
}

const getAllCommandes = async (arg = {}) => {
  const commandes = await service.findAll(Commande, {
    include: [
      Client,
      {
        model: Production,
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
      },

      EtatCommande,
    ],
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

const getCommandeSumBySpeculation = async () => {
  let option = {
    include: [
      {
        model: Production,
        include: [
          {
            model: VarieteInstitution,
            include: [
              Variete,
              { model: SpeculationInstitution, include: Speculation },
            ],
          },
        ],
      },
    ],
    group: ['Production.VarieteInstitution.speculationInstitutionId'],
    attributes: [
      'Production.VarieteInstitution.speculationInstitutionId',
      [
        sequelize.fn('sum', sequelize.col('quantite')),
        'totalQuantiteCommandee',
      ],
    ],
  }

  const commandes = await service.findAll(Commande, option)
  const commandesData = commandes.map((commande) => commande.toJSON())
  console.log(commandesData)
  return commandesData
}

const getCommandeSumBySpeculationByState = async () => {
  let option = {
    include: [
      {
        model: Production,
        include: [
          {
            model: VarieteInstitution,
            include: [
              Variete,
              { model: SpeculationInstitution, include: Speculation },
            ],
          },
        ],
      },
    ],
    group: ["etatId", "Production.VarieteInstitution.SpeculationInstitution.speculationId"],
    attributes: [
      "Production.VarieteInstitution.SpeculationInstitution.speculationId",
      "etatId",
      [
        sequelize.fn('sum', sequelize.col('quantite')),
        'totalQuantiteCommandee',
      ],
    ],
  }

  const commandes = await service.findAll(Commande, option)
  const commandesData = commandes.map((commande) => commande.toJSON())
  console.log(commandesData)
  return commandesData
}

const getCommandeSumByVarietes = async () => {
  let option = {
    include: [
      {
        model: Production,
        include: [
          {
            model: VarieteInstitution,
            include: [
              Variete,
              { model: SpeculationInstitution, include: Speculation },
            ],
          },
        ],
      },
    ],
    group: ['Production.VarieteInstitution.varieteId'],
    attributes: [
      [
        sequelize.fn('sum', sequelize.col('quantite')),
        'totalQuantiteCommandee',
      ],
    ],
  }

  const commandes = await service.findAll(Commande, option)
  const commandesData = commandes.map((commande) => commande.toJSON())
  console.log(commandesData)
  return commandesData
}

const getCommandeSumByVarieteByState = async () => {
  let option = {
    include: [
      {
        model: Production,
        include: [
          {
            model: VarieteInstitution,
            include: [
              Variete,
              { model: SpeculationInstitution, include: Speculation },
            ],
          },
        ],
      },
    ],
    group: ["etatId", "Production.VarieteInstitution.varieteId"],
    attributes: [
      "Production.VarieteInstitution.varieteId",
      "etatId",
      [
        sequelize.fn('sum', sequelize.col('quantite')),
        'totalQuantiteCommandee',
      ],
    ],
  }

  const commandes = await service.findAll(Commande, option)
  const commandesData = commandes.map((commande) => commande.toJSON())
  console.log(commandesData)
  return commandesData
}

module.exports = {
  createCommande,
  getAllCommandes,
  getCommandeById,
  deleteCommande,
  updateCommande,
  getCommandeSumByVarietes,
  getCommandeSumBySpeculation,
  getCommandeSumBySpeculationByState,
  getCommandeSumByVarieteByState,
}
