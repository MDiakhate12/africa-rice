const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    idCommande: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "idCommande",
    },
    quantite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quantite",
    },
    montant: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "montant",
    },
    estEnlevee: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_enlevee",
    },
    estValide: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_valide",
    },
    estRejetee: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_rejetee",
    },
    estTraite: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_traite",
    },
    estAnnulee: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_annulee",
    },
    dateEnlevementSouhaitee: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_enlevement_souhaitee",
    },
    dateEnlevementReelle: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_enlevement_reelle",
    },
    dateCreation: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_creation",
    },
    dateDerniereModification: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_derniere_modification",
    },
    dateExpressionBesoinClient: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_expression_besoin_client",
    },
  };
  const options = {
    tableName: "commande",
    comment: "",
    indexes: [],
  };
  const CommandeModel = sequelize.define("Commande", attributes, options);

  CommandeModel.associate = function (models) {
    // associations can be defined here
    CommandeModel.belongsTo(models.Client, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "clientId",
        allowNull: false,
      },
    });

    CommandeModel.belongsTo(models.Magasin, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "magasinId",
        allowNull: false,
      },
    });

    CommandeModel.belongsTo(models.Production, {
      onDelete: "CASCADE",
      foreignKey: {
        name: "productionId",
        allowNull: false,
      },
    });
  };

  return CommandeModel;
};
