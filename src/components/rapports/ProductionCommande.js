import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");
const colors = [
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(148, 0, 0, 0.5)",
  "rgba(75, 192, 192, 0.2)",
  "rgba(26, 173, 0, 0.2)",
  "rgba(194, 204, 0, 0.2)",
  "rgba(255, 244, 122, 0.2)",
  "rgba(3, 179, 0, 0.2)",
  "rgba(102, 26, 168, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(231, 51, 255, 0.2)",
  "rgba(190, 255, 51, 0.2)",
  "rgba(255, 51, 51, 0.2)",
];

export default function ProductionCommande() {
  const [commandesByVariete, setCommandesByVariete] = useState([]);
  const [commandesBySpeculation, setCommandesBySpeculation] = useState([]);

  const getCommandeSumByVarietes = () => {
    ipcRenderer.send("getCommandeSumByVarietes");
    ipcRenderer.once("gotCommandeSumByVarietes", (event, data) => {
      setCommandesByVariete(data);
      console.log("DIIAAAAF", data);
    });
  };
  const getCommandeSumBySpeculation = () => {
    ipcRenderer.send("getCommandeSumBySpeculation");
    ipcRenderer.once("gotCommandeSumBySpeculation", (event, data) => {
      setCommandesBySpeculation(data);
      console.log("DIIAAAAF", data);
    });
  };

  useEffect(() => {
    getCommandeSumByVarietes();
    getCommandeSumBySpeculation();
    // console.log(commandes)
  }, []);

  const [productionsByVariete, setProductionsByVariete] = useState([]);
  const [productionsBySpeculation, setProductionsBySpeculation] = useState([]);

  const getProductionsSumByVarietes = () => {
    ipcRenderer.send("getByVarietes");
    ipcRenderer.once("gotByVarietes", (event, data) => {
      console.log(data);
      setProductionsByVariete(data);
    });
  };
  const getProductionsSumBySpeculation = () => {
    ipcRenderer.send("getProductionsSumBySpeculation");
    ipcRenderer.once("gotProductionsSumBySpeculation", (event, data) => {
      console.log(data);
      setProductionsBySpeculation(data);
    });
  };

  useEffect(() => {
    getProductionsSumByVarietes();
    getProductionsSumBySpeculation();
    // console.log(productions)
  }, []);

  const dataByVariete = {
    labels: productionsByVariete.map(
      (production) => production.VarieteInstitution.Variete.nomVariete
    ),
    datasets: [
      {
        label: "Production",
        data: productionsByVariete.map(
          (production) => production.totalQuantiteProduite
        ),
        backgroundColor: colors[0],
      },
      {
        label: "Commande",
        data: commandesByVariete.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: colors[1],
      },
    ],
  };
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
        backgroundColor: colors[0],
      },
      {
        label: "Commande",
        data: commandesBySpeculation.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: colors[1],
      },
    ],
  };

  const optionsVariete = {
    title: {
      display: true,
      text: "Quantité produite VS Quantité commandée par variété",
      // position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 1000,
          },
        },
      ],
    },
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

  return (
    <div>
      <Bar data={dataByVariete} options={optionsVariete} />
      <Bar data={dataBySpeculation} options={optionsSpeculation} />
    </div>
  );
}
