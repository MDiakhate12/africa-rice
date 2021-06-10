const Models = require("../models").default;
const service = require("./index");

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
} = Models;

const createCommande = async (data) => {
  const commande = await service.create(Commande, data);
  console.log(commande.toJSON());
  return commande.toJSON();
};

const getAllCommandes = async (arg = {}) => {
  let option = {
    order: [["idCommande", "DESC"]],
    where: { ...arg },
    include: [
      {
        model: VarieteInstitution,
        include: [
          Variete,
          { model: SpeculationInstitution, include: Speculation },
        ],
      },
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
          {
            model: NiveauInstitution,
            include: [NiveauDeProduction],
          },
        ],
      },
      EtatCommande,
    ],
  };
  // if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const commandes = await service.findAll(Commande, option);
  const commandesData = commandes.map((commande) => commande.toJSON());
  console.log(commandesData);
  return commandesData;
};

const getCommandeById = async (id) => {
  const commande = await service.findByPk(Commande, id);
  console.log(commande.toJSON());
  return commande.toJSON();
};

const updateCommande = async (id, data) => {
  const updated = await service.update(Commande, id, data);
  console.log(updated);
  return updated;
};

const deleteCommande = async (id) => {
  const deleted = service.deleteByPk(Commande, id);
  console.log(deleted);
  return deleted;
};

const getCommandeSumBySpeculation = async (arg = {}) => {
  let option = {
    where: { ...arg },
    include: [
      {
        model: VarieteInstitution,
        include: [
          Variete,
          { model: SpeculationInstitution, include: Speculation },
        ],
      },
      Production,
    ],
    group: ["VarieteInstitution.speculationInstitutionId"],
    attributes: [
      "VarieteInstitution.speculationInstitutionId",
      [
        sequelize.fn("sum", sequelize.col("quantite")),
        "totalQuantiteCommandee",
      ],
    ],
  };
  // if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const commandes = await service.findAll(Commande, option);
  const commandesData = commandes.map((commande) => commande.toJSON());
  console.log(commandesData);
  return commandesData;
};

const getCommandeSumBySpeculationByState = async (arg = {}) => {
  let option = {
    where: { ...arg },
    include: [
      {
        model: VarieteInstitution,
        include: [
          Variete,
          { model: SpeculationInstitution, include: Speculation },
        ],
      },
      EtatCommande,
      Production,
    ],
    group: [
      "etatId",
      "VarieteInstitution.SpeculationInstitution.speculationId",
    ],
    attributes: [
      "VarieteInstitution.SpeculationInstitution.speculationId",
      "etatId",
      [
        sequelize.fn("sum", sequelize.col("quantite")),
        "totalQuantiteCommandee",
      ],
    ],
  };
  // if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const commandes = await service.findAll(Commande, option);
  const commandesData = commandes.map((commande) => commande.toJSON());
  console.log(commandesData);
  return commandesData;
};

const getCommandeSumByVarietes = async (arg = {}) => {
  let option = {
    where: { ...arg },
    include: [
      {
        model: VarieteInstitution,
        include: [
          Variete,
          { model: SpeculationInstitution, include: Speculation },
        ],
      },
      Production,
    ],
    group: ["VarieteInstitution.varieteId"],
    attributes: [
      [
        sequelize.fn("sum", sequelize.col("quantite")),
        "totalQuantiteCommandee",
      ],
    ],
  };
  // if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const commandes = await service.findAll(Commande, option);
  const commandesData = commandes.map((commande) => commande.toJSON());
  console.log(commandesData);
  return commandesData;
};

const getCommandeSumByVarieteByState = async (arg = {}) => {
  let option = {
    where: { ...arg },
    include: [
      {
        model: VarieteInstitution,
        include: [
          Variete,
          { model: SpeculationInstitution, include: Speculation },
        ],
      },
      Production,
    ],
    group: ["etatId", "VarieteInstitution.varieteId"],
    attributes: [
      "VarieteInstitution.varieteId",
      "etatId",
      [
        sequelize.fn("sum", sequelize.col("quantite")),
        "totalQuantiteCommandee",
      ],
    ],
  };
  // if (Object.keys(arg)) option = { ...option, where: { ...arg } }
  const commandes = await service.findAll(Commande, option);
  const commandesData = commandes.map((commande) => commande.toJSON());
  console.log(commandesData);
  return commandesData;
};

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
};
