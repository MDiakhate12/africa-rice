const { DataTypes } = require('sequelize')

module.exports = (sequelize) => {
  const attributes = {
    idCommande: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: 'idCommande',
    },
    quantite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'quantite',
    },
    montant: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'montant',
    },
    dateEnlevementSouhaitee: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'date_enlevement_souhaitee',
    },
    dateEnlevementReelle: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'date_enlevement_reelle',
    },
    dateExpressionBesoinClient: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: 'date_expression_besoin_client',
    },
  }
  const options = {
    tableName: 'commande',
    comment: '',
    indexes: [],
  }
  const CommandeModel = sequelize.define('Commande', attributes, options)

  CommandeModel.associate = function (models) {
    // associations can be defined here
    CommandeModel.belongsTo(models.Client, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'clientId',
        allowNull: false,
      },
    })

    CommandeModel.belongsTo(models.Institution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'institutionId',
        allowNull: false,
        defaultValue: 1,
      },
    })

    CommandeModel.belongsTo(models.EtatCommande, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'etatId',
        allowNull: false,
      },
    })

    CommandeModel.belongsTo(models.Production, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'productionId',
        allowNull: true,
      },
    })

    CommandeModel.belongsTo(models.VarieteInstitution, {
      onDelete: 'CASCADE',
      foreignKey: {
        name: 'varieteInstitutionId',
        allowNull: true,
      },
    })
  }

  return CommandeModel
}
