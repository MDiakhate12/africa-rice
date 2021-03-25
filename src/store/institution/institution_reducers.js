import { allInstitution } from "./institution";


import riz from "../../components/images/riz.jpg"
import sorgho from "../../components/images/sorgho.jpg"

export const institutionInitialState = [
  {
    idVariete: 1,
    nomVariete: "Sahel 108",
    longueurCycle: 45,
    stockDeSecurite: 200,
    speculation: {
      idSpeculation: 1,
      nomSpeculation: "riz",
      imageSpeculation: riz,
    },
    zone: {
      nomZone: "Vallée du Fleuve Sénégal",
      idZone: 1,
    },
  },
  {
    idVariete: 77,
    nomVariete: "CE 180-33",
    longueurCycle: 45,
    stockDeSecurite: 200,
    zone: {
      idZone: 2,
      nomZone: "Centre",
    },
    speculation: {
      idSpeculation: 2,
      nomSpeculation: "sorgho",
      imageSpeculation: sorgho,
    },
  },
];

export const institutionReducer = (state, action) => {
  switch (action.type) {
    case "ON_ADD_VARIETE":
      return [...state, action.payload];
    case "ON_DELETE_VARIETE":
      return state.filter((value) => value !== action.payload);

    default:
      break;
  }
};

export const allinstitutionInitialState = allinstitution;

export const allinstitutionReducer = (state, action) => {
  switch (action.type) {
    case "ON_ADD_VARIETE":
      return [...state, action.payload];
    case "ON_DELETE_VARIETE":
      return state.filter((value) => value !== action.payload);

    default:
      break;
  }
};
