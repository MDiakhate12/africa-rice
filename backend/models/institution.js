const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_institution"
    },
    nomComplet: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "nom_complet"
    },
    sigle: {
      type: DataTypes.STRING(50),
      allowNull: true,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "sigle"
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
    }
  };
  const options = {
    tableName: "institution",
    comment: "",
    indexes: [{
      name: "id_localisation",
      unique: false,
      type: "BTREE",
      fields: ["id_localisation"]
    }]
  };
  const InstitutionModel = sequelize.define("institutionModel", attributes, options);
  return InstitutionModel;
};