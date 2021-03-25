const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idVarieteInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_variete_institution',
    },
    stockDeSecurite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'stock_de_securite',
    },
    prix: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'prix',
    },
  }
  const options = {
    tableName: 'variete_institution',
    comment: '',
    indexes: [],
  }
  const VarieteInstitutionModel = sequelize.define(
    'VarieteInstitution',
    attributes,
    options,
  )

  VarieteInstitutionModel.associate = function (models) {
    // associations can be defined here
    VarieteInstitutionModel.belongsTo(models.SpeculationInstitution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'speculationInstitutionId',
        allowNull: false,
      },
    })
    VarieteInstitutionModel.belongsTo(models.Institution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'institutionId',
        allowNull: false,
      },
    })

    VarieteInstitutionModel.belongsTo(models.Variete, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'varieteId',
        allowNull: false,
      },
    })
  }

  return VarieteInstitutionModel
}
