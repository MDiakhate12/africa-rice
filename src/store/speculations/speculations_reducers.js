import { allSpeculations } from "./speculations";

import riz from "../../components/images/riz.jpg"
import sorgho from "../../components/images/sorgho.jpg"

export const speculationInitialState = [
  {
    idSpeculation: 1,
    nomSpeculation: "riz",
    imageSpeculation: riz
  },
  {
    idSpeculation: 2,
    nomSpeculation: "sorgho",
    imageSpeculation: sorgho
  },
];

export const speculationReducer = (action, state) => {};

export const allSpeculationInitialState = allSpeculations;

export const allSpeculationReducer = (action, state) => {};
