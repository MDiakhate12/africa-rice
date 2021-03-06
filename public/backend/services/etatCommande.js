const Models = require("../models").default;
const service = require("./index");
const { EtatCommande } = Models;

const createEtatCommande = async (data) => {
  const etatCommande = await service.create(EtatCommande, data);
  console.log(etatCommande.toJSON());
  return etatCommande.toJSON();
};

const getAllEtatCommandes = async (arg = {}) => {
  const etatCommandes = await service.findAll(EtatCommande);
  const etatCommandesData = etatCommandes.map((etatCommande) =>
    etatCommande.toJSON()
  );
  console.log(etatCommandesData);
  return etatCommandesData;
};

const getEtatCommandeById = async (id) => {
  const etatCommande = await service.findByPk(EtatCommande, id);
  if (etatCommande) {
    console.log("GET ONE", etatCommande.toJSON());
    return etatCommande.toJSON();
  }
  console.log("GET ONE", etatCommande);
  return etatCommande;
};

const getEtatCommandeByKey = async (key) => {
  const etatCommande = await service.findByKey(EtatCommande, key);
  if (etatCommande) {
    console.log("GET ONE", etatCommande.toJSON());
    return etatCommande.toJSON();
  }
  console.log("GET ONE", etatCommande);
  return etatCommande;
};

const updateEtatCommande = async (id, data) => {
  const updated = service.update(EtatCommande, id, data);
  console.log(updated);
  return updated;
};

const deleteEtatCommande = async (id) => {
  const deleted = service.deleteByPk(EtatCommande, id);
  console.log(deleted);
  return deleted;
};

module.exports = {
  createEtatCommande,
  getAllEtatCommandes,
  getEtatCommandeById,
  deleteEtatCommande,
  updateEtatCommande,
  getEtatCommandeByKey,
};
