const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idNiveauInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_niveau_institution"
    },
    idInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_institution",
      references: {
        key: "id_institution",
        model: "institutionModel"
      }
    },
    idNiveau: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_niveau",
      references: {
        key: "id_niveau",
        model: "niveauDeProductionModel"
      }
    }
  };
  const options = {
    tableName: "niveau_institution",
    comment: "",
    indexes: [{
      name: "id_institution",
      unique: true,
      type: "BTREE",
      fields: ["id_institution", "id_niveau"]
    }, {
      name: "fk_institution_idx",
      unique: false,
      type: "BTREE",
      fields: ["id_institution"]
    }, {
      name: "fk_niveau_idx",
      unique: false,
      type: "BTREE",
      fields: ["id_niveau"]
    }]
  };
  const NiveauInstitutionModel = sequelize.define("niveauInstitutionModel", attributes, options);
  return NiveauInstitutionModel;
};