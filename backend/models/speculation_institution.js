const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_institution"
    },
    idSpeculation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_speculation"
    },
    idSpeculationInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_speculation_institution"
    }
  };
  const options = {
    tableName: "speculation_institution",
    comment: "",
    indexes: [{
      name: "id_institution",
      unique: true,
      type: "BTREE",
      fields: ["id_institution", "id_speculation"]
    }, {
      name: "id_speculation",
      unique: true,
      type: "BTREE",
      fields: ["id_speculation", "id_institution"]
    }]
  };
  const SpeculationInstitutionModel = sequelize.define("speculationInstitutionModel", attributes, options);
  return SpeculationInstitutionModel;
};