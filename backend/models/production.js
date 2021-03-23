const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idProduction: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_production"
    },
    dateDeProduction: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "date_de_production"
    },
    quantiteProduite: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quantite_produite"
    },
    prixUnitaire: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "prix_unitaire"
    },
    idLocalisation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_localisation",
      references: {
        key: "id_localisation",
        model: "localisationModel"
      }
    },
    idMagasin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_magasin",
      references: {
        key: "id_magasin",
        model: "magasinModel"
      }
    },
    idNiveauInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_niveau_institution",
      references: {
        key: "id_niveau_institution",
        model: "niveauInstitutionModel"
      }
    },
    idVarieteInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_variete_institution",
      references: {
        key: "id_variete_institution",
        model: "varieteInstitutionModel"
      }
    },
    idInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: "1",
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_institution",
      references: {
        key: "id_institution",
        model: "institutionModel"
      }
    },
    quantiteDisponible: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "quantite_disponible"
    }
  };
  const options = {
    tableName: "production",
    comment: "",
    indexes: [{
      name: "id_magasin",
      unique: false,
      type: "BTREE",
      fields: ["id_magasin"]
    }, {
      name: "id_localisation",
      unique: false,
      type: "BTREE",
      fields: ["id_localisation"]
    }, {
      name: "production_ibfk_4_idx",
      unique: false,
      type: "BTREE",
      fields: ["id_variete_institution"]
    }, {
      name: "id_variete_institution",
      unique: false,
      type: "BTREE",
      fields: ["id_variete_institution"]
    }, {
      name: "production_ibfk_5_idx",
      unique: false,
      type: "BTREE",
      fields: ["id_institution"]
    }, {
      name: "production_ibfk_3_idx",
      unique: false,
      type: "BTREE",
      fields: ["id_niveau_institution"]
    }]
  };
  const ProductionModel = sequelize.define("productionModel", attributes, options);
  return ProductionModel;
};