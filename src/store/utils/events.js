const events = {
  speculation: {
    create: 'createSpeculation',
    getAll: 'getAllSpeculations',
    update: 'updateSpeculation',
    delete: 'deleteSpeculation',
    getOne: 'getOneSpeculation',
  },
  variete: {
    create: 'createVariete',
    getAll: 'getAllVarietes',
    update: 'updateVariete',
    delete: 'deleteVariete',
    getOne: 'getOneVariete',
  },
  varieteInstitution: {
    create: 'createVarieteInstitution',
    getAll: 'getAllVarietesInstitution',
    update: 'updateVarieteInstitution',
    delete: 'deleteVarieteInstitution',
    getOne: 'getOneVarieteInstitution',
  },
  commande: {
    create: 'createCommande',
    getAll: 'getAllCommandes',
    update: 'updateCommande',
    delete: 'deleteCommande',
    getOne: 'getOneCommande',
  },

  zoneAgro: {
    create: 'createZoneAgro',
    getAll: 'getAllZoneAgros',
    update: 'updateZoneAgro',
    delete: 'deleteZoneAgro',
    getOne: 'getOneZoneAgro',
  },
}

const eventResponse = {
  speculation: {
    created: 'createdSpeculation',
    gotAll: 'gotAllSpeculations',
    updated: 'updatedSpeculation',
    deleted: 'deletedSpeculation',
    gotOne: 'gdtOneSpeculation',
  },
  variete: {
    created: 'createdVariete',
    gotAll: 'gotAllVarietes',
    updated: 'updatedVariete',
    deleted: 'deletedVariete',
    gotOne: 'gotOneVariete',
  },
  varieteInstitution: {
    created: 'createdVarieteInstitution',
    gotAll: 'gotAllVarietesInstitution',
    updated: 'updatedVarieteInstitution',
    deleted: 'deletedVarieteInstitution',
    gotOne: 'gotOneVarieteInstitution',
  },
  commande: {
    created: 'createdCommande',
    gotAll: 'gotAllCommandes',
    updated: 'updatedCommande',
    deleted: 'deletedCommande',
    gotOne: 'gotOneCommande',
  },
  zoneAgro: {
    created: 'createdZoneAgro',
    gotAll: 'gotAllZoneAgros',
    updated: 'updatedZoneAgro',
    deleted: 'deletedZoneAgro',
    gotOne: 'gotOneZoneAgro',
  },
}

module.exports = {
  events,
  eventResponse,
}
