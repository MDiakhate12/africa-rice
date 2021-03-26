import { eventResponse, events } from "../utils/events";

const { ipcRenderer } = window.require("electron");

export const allZones = [
  { nomZone: "Vallée du Fleuve Sénégal" },
  { nomZone: "Centre" },
  { nomZone: "Sud" },
];

allZones.map((z) => {
  ipcRenderer.send(events.zoneAgro.create, z);

  ipcRenderer.on(eventResponse.zoneAgro.created, (e, d) => console.log(d));
});
