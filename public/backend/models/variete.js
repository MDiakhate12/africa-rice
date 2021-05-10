const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idVariete: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_variete',
    },
    nomVariete: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'nom_variete',
      unique: 'nom_variete_UNIQUE',
    },
    longueurCycle: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'longueur_cycle',
    },
  }
  const options = {
    tableName: 'variete',
    comment: '',
    indexes: [],
  }
  const VarieteModel = sequelize.define('Variete', attributes, options)

  VarieteModel.associate = function (models) {
    // associations can be defined here
    VarieteModel.belongsTo(models.Speculation, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'speculationId',
        allowNull: false,
      },
    })
    VarieteModel.belongsTo(models.ZoneAgroEcologique, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'zoneId',
        allowNull: false,
      },
    })
  }

  return VarieteModel
}
