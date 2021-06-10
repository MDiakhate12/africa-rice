import * as localisations from "./store/localisation/localisation.json";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("./store/utils/events");

const isDev = global.__filename.includes("init.js");

const niveaux = [
  { nomNiveau: "prebase" },
  { nomNiveau: "base" },
  { nomNiveau: "G0" },
  { nomNiveau: "G1" },
  { nomNiveau: "G2" },
  { nomNiveau: "R1" },
  { nomNiveau: "R2" },
];

const speculations = [
  {
    nomSpeculation: "riz",
    imageSpeculation: `${isDev ? "" : global.__dirname}/assets/images/riz.jpg`,
  },
  {
    nomSpeculation: "sorgho",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/sorgho.jpg`,
  },
  {
    nomSpeculation: "mil",
    imageSpeculation: `${isDev ? "" : global.__dirname}/assets/images/mil.jpg`,
  },
  {
    nomSpeculation: "mais",
    imageSpeculation: `${isDev ? "" : global.__dirname}/assets/images/mais.jpg`,
  },
  {
    nomSpeculation: "arachide",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/arachide.jpg`,
  },
  {
    nomSpeculation: "niebe",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/niebe.jpg`,
  },
  {
    nomSpeculation: "oignon",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/oignon.jpg`,
  },
  {
    nomSpeculation: "tomate",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/tomate.jpg`,
  },
  {
    nomSpeculation: "piment",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/piment.jpg`,
  },
  {
    nomSpeculation: "jaxatu",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/jaxatu.jpg`,
  },
  {
    nomSpeculation: "pomme de terre",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/pomme_de_terre.jpg`,
  },
  {
    nomSpeculation: "patate douce",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/patate_douce.jpg`,
  },
  {
    nomSpeculation: "gombo",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/gombo.jpg`,
  },
  {
    nomSpeculation: "aubergine",
    imageSpeculation: `${
      isDev ? "" : global.__dirname
    }/assets/images/aubergine.jpg`,
  },
];

const varietes = [
  {
    nomVariete: "Sahel 108",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "Sahel 210",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "Sahel 177",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "Sahel 134",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "Sahel 201",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "Sahel 329",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "NERICA 4",
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "NERICA 8",
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "NERICA 6",
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "NERICA L19",
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "NERICA S44",
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "FKR 45 N",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "NERICA 14",
    longueurCycle: 30,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "DJ 11 509",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "BG 90 2",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "Tox 728",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "War 77",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "ROK 5",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "ISRIZ 3 ",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "ISRIZ 8",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "ISRIZ 9",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "ISRIZ 12",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "ISRIZ 15",
    longueurCycle: 28,
    speculationId: 1,
    zoneId: 1,
  },
  {
    nomVariete: "CE 145-66",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: "CE 151-262",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: "CE 180-33",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: "CE 196-7-2-1",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: "F2-20",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: "Faourou",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: "Nguinte",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: "Nganda",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: "Darou",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 2,
  },
  {
    nomVariete: "Souna 3",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: "IBV 8001",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: "IBV 8004",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: "IBMV 8402",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: "IDSMD 9507",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: "Gawane",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: "Thialack 2",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 3,
  },
  {
    nomVariete: "Xeewel Gi",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: "Noor 96",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: "Doo Mer",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: "Sooror",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: "Gaaw Na",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: "Jaboot",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: "Goor Yomboul",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: "Yaayi Seex",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: "Obatampa",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
  {
    nomVariete: "Swan",
    longueurCycle: 45,
    zoneId: 2,
    speculationId: 4,
  },
];

const zones = [
  { nomZone: "Vallée du Fleuve Sénégal" },
  { nomZone: "Centre" },
  { nomZone: "Sud" },
];

const etats = [
  { etat: "Acceptable" },
  { etat: "Rejete" },
  { etat: "Annule" },
  { etat: "Accepte" },
  { etat: "Enleve" },
  { etat: "Insuffisant" },
  { etat: "Indisponible" },
];

const initNiveau = async () => {
  ipcRenderer.send(events.niveauDeProduction.getOne, 1);
  return ipcRenderer.once(
    eventResponse.niveauDeProduction.gotOne,
    (event, data) => {
      if (data === null) {
        return niveaux.forEach((n) => {
          return ipcRenderer.send(events.niveauDeProduction.create, n);
        });
      }
    }
  );
};

const initLocalisation = async () => {
  ipcRenderer.send(events.localisation.getOne, 1);
  return ipcRenderer.once(eventResponse.localisation.gotOne, (event, data) => {
    if (data === null) {
      return localisations.localisations.forEach((l) => {
        return ipcRenderer.send(events.localisation.create, l);
      });
    }
  });
};

const initSpeculation = async () => {
  ipcRenderer.send(events.speculation.getOne, 1);
  return ipcRenderer.once(eventResponse.speculation.gotOne, (event, data) => {
    if (data === null) {
      localStorage.removeItem("institution");
      return speculations.forEach((s) => {
        return ipcRenderer.send(events.speculation.create, s);
      });
    }
  });
};

const initVariete = async () => {
  ipcRenderer.send(events.variete.getOne, 1);
  return ipcRenderer.once(eventResponse.variete.gotOne, (event, data) => {
    if (data === null) {
      return varietes.forEach((v) => {
        return ipcRenderer.send(events.variete.create, v);
      });
    }
  });
};

const initZone = async () => {
  ipcRenderer.send(events.zoneAgro.getOne, 1);
  return ipcRenderer.once(eventResponse.zoneAgro.gotOne, (event, data) => {
    if (data === null) {
      return zones.forEach((z) => {
        return ipcRenderer.send(events.zoneAgro.create, z);
      });
    }
  });
};

export const initEtat = async () => {
  ipcRenderer.send(events.etatCommande.getOne, 1);
  return ipcRenderer.once(eventResponse.etatCommande.gotOne, (event, data) => {
    if (data === null) {
      return etats.forEach((e) => {
        return ipcRenderer.send(events.etatCommande.create, e);
      });
    }
  });
};

export const init = async () => {
  initSpeculation().then(() => {
    initZone().then(async () => {
      await initVariete();
      await initEtat();
      await initNiveau();
      await initLocalisation();
    });
  });
};

init();

ipcRenderer.once(eventResponse.niveauDeProduction.created, (event, data) => {
  console.log(data);
  return data;
});

ipcRenderer.once(eventResponse.localisation.created, (event, data) => {
  console.log(data);
  return data;
});

ipcRenderer.once(eventResponse.speculation.created, (event, data) => {
  console.log(data);
  return data;
});

ipcRenderer.once(eventResponse.variete.created, (event, data) => {
  console.log(data);
  return data;
});

ipcRenderer.once(eventResponse.zoneAgro.created, (event, data) => {
  console.log(data);
  return data;
});

ipcRenderer.once(eventResponse.etatCommande.created, (event, data) => {
  console.log(data);
  return data;
});
