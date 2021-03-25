const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idProduction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'id_production',
    },
    dateDeProduction: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'date_de_production',
    },
    quantiteProduite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'quantite_produite',
    },
    prixUnitaire: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'prix_unitaire',
    },
    quantiteDisponible: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'quantite_disponible',
    },
  }
  const options = {
    tableName: 'production',
    comment: '',
    indexes: [],
  }
  const ProductionModel = sequelize.define('Production', attributes, options)

  ProductionModel.associate = function (models) {
    // associations can be defined here
    ProductionModel.belongsTo(models.Institution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'institutionId',
        allowNull: false,
      },
    })
    ProductionModel.belongsTo(models.VarieteInstitution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'varieteInstitutionId',
        allowNull: false,
      },
    })
    ProductionModel.belongsTo(models.NiveauInstitution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'niveauInstitutionId',
        allowNull: false,
      },
    })
    ProductionModel.belongsTo(models.Magasin, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'magasinId',
        allowNull: false,
      },
    })
    ProductionModel.belongsTo(models.Localisation, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'localisationId',
        allowNull: false,
      },
    })
  }

  return ProductionModel
}
