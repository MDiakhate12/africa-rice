const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idNiveau: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_niveau',
    },
    nomNiveau: {
      type: DataTypes.ENUM('G0', 'G1', 'G2', 'Prébase', 'Base', 'R1', 'R2'),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'nom_niveau',
      unique: 'nom_niveau_UNIQUE',
    },
  }
  const options = {
    tableName: 'niveau_de_production',
    comment: '',
    indexes: [],
  }
  const NiveauDeProductionModel = sequelize.define(
    'NiveauDeProduction',
    attributes,
    options,
  )
  return NiveauDeProductionModel
}
