import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Colors } from "./Colors";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");


export default function ProductionCommandeBySpeculation() {
  const [commandesBySpeculation, setCommandesBySpeculation] = useState([]);

  const getCommandeSumBySpeculation = () => {
    ipcRenderer.send("getCommandeSumBySpeculation");
    ipcRenderer.once("gotCommandeSumBySpeculation", (event, data) => {
      setCommandesBySpeculation(data);
      console.log("DIIAAAAF", data);
    });
  };

  useEffect(() => {
    getCommandeSumBySpeculation();
  }, []);

  const [productionsBySpeculation, setProductionsBySpeculation] = useState([]);

  const getProductionsSumBySpeculation = () => {
    ipcRenderer.send("getProductionsSumBySpeculation");
    ipcRenderer.once("gotProductionsSumBySpeculation", (event, data) => {
      console.log(data);
      setProductionsBySpeculation(data);
    });
  };

  useEffect(() => {
    getProductionsSumBySpeculation();
  }, []);

  const dataBySpeculation = {
    labels: productionsBySpeculation.map(
      (production) =>
        production.VarieteInstitution.SpeculationInstitution.Speculation
          .nomSpeculation
    ),
    datasets: [
      {
        label: "Production",
        data: productionsBySpeculation.map(
          (production) => production.totalQuantiteProduite
        ),
        backgroundColor: Colors[0],
      },
      {
        label: "Commande",
        data: commandesBySpeculation.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: Colors[1],
      },
    ],
  };

  const optionsSpeculation = {
    title: {
      display: true,
      text: "Quantité produite VS Quantité commandée par spéculation  ",
      // position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 2000,
          },
        },
      ],
    },
  };

  return <Bar data={dataBySpeculation} options={optionsSpeculation} />;
}
