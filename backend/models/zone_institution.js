const {
  DataTypes
} = require('sequelize');

module.exports = sequelize => {
  const attributes = {
    idZoneInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: true,
      autoIncrement: true,
      comment: null,
      field: "id_zone_institution"
    },
    idInstitution: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: null,
      primaryKey: false,
      autoIncrement: false,
      comment: null,
      field: "id_institution"
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
    tableName: "zone_institution",
    comment: "",
    indexes: [{
      name: "id_institution",
      unique: true,
      type: "BTREE",
      fields: ["id_institution", "id_localisation"]
    }, {
      name: "id_institution_2",
      unique: true,
      type: "BTREE",
      fields: ["id_institution", "id_localisation"]
    }, {
      name: "id_localisation",
      unique: false,
      type: "BTREE",
      fields: ["id_localisation"]
    }]
  };
  const ZoneInstitutionModel = sequelize.define("zoneInstitutionModel", attributes, options);
  return ZoneInstitutionModel;
};