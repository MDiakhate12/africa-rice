const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    numeroDeCommade: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "numero_de_commade"
    },
    quantite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quantite"
    },
    montant: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "montant"
    },
    estEnlevee: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_enlevee"
    },
    estValide: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_valide"
    },
    estRejetee: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_rejetee"
    },
    estTraite: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_traite"
    },
    estAnnulee: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: "0",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "est_annulee"
    },
    dateEnlevementSouhaitee: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_enlevement_souhaitee"
    },
    dateEnlevementReelle: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_enlevement_reelle"
    },
    dateCreation: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_creation"
    },
    dateDerniereModification: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_derniere_modification"
    },
    dateExpressionBesoinClient: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_expression_besoin_client"
    },
    magasinEnlevement: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "magasin_enlevement",
      references: {
        key: "id_magasin",
        model: "magasinModel"
      }
    },
    idProduction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_production",
      references: {
        key: "id_production",
        model: "productionModel"
      }
    },
    idClient: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_client",
      references: {
        key: "id_client",
        model: "clientModel"
      }
    }
  };
  const options = {
    tableName: "commande",
    comment: "",
    indexes: [{
      name: "id_production",
      unique: false,
      type: "BTREE",
      fields: ["id_production"]
    }, {
      name: "magasin_enlevement",
      unique: false,
      type: "BTREE",
      fields: ["magasin_enlevement"]
    }, {
      name: "id_client",
      unique: false,
      type: "BTREE",
      fields: ["id_client"]
    }]
  };
  const CommandeModel = sequelize.define("commandeModel", attributes, options);
  return CommandeModel;
};