const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idEtat: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_etat',
    },
    etat: {
      type: DataTypes.ENUM(
        'Enleve',
        'Rejete',
        'Annule',
        'Acceptable',
        'Accepte',
      ),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'etat',
      unique: 'etat_UNIQUE',
    },
  }
  const options = {
    tableName: 'etat_commande',
    comment: '',
    indexes: [],
  }
  const EtatCommandeModel = sequelize.define(
    'EtatCommande',
    attributes,
    options,
  )
  return EtatCommandeModel
}
