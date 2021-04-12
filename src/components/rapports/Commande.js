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

export default function Commande() {
  const [commandesByVariete, setCommandesByVariete] = useState([]);
  const [commandesBySpeculation, setCommandesBySpeculation] = useState([]);
  const [
    commandesBySpeculationByState,
    setCommandesBySpeculationByState,
  ] = useState([]);

  const getCommandeSumByVarietes = () => {
    ipcRenderer.send("getCommandeSumByVarietes");
    ipcRenderer.once("gotCommandeSumByVarietes", (event, data) => {
      setCommandesByVariete(data);
    });
  };

  const getCommandeSumBySpeculation = () => {
    ipcRenderer.send("getCommandeSumBySpeculation");
    ipcRenderer.once("gotCommandeSumBySpeculation", (event, data) => {
      setCommandesBySpeculation(data);
    });
  };

  const getCommandeSumBySpeculationByState = () => {
    ipcRenderer.send("getCommandeSumBySpeculationByState");
    ipcRenderer.once("gotCommandeSumBySpeculationByState", (event, data) => {
      setCommandesBySpeculationByState(data);
      console.log("DIIAAAAF", data);
    });
  };

  useEffect(() => {
    getCommandeSumByVarietes();
    getCommandeSumBySpeculation();
    getCommandeSumBySpeculationByState();
    // console.log(commandes)
  }, []);

  const dataByVariete = {
    labels: commandesByVariete.map(
      (commande) => commande.Production.VarieteInstitution.Variete.nomVariete
    ),
    datasets: [
      {
        label: "Commande",
        data: commandesByVariete.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: colors.slice(3, commandesByVariete.length + 3),
      },
    ],
  };

  
  const optionsSpeculation = {
    title: {
      display: true,
      text: "Quantité commandée",
      // position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 200,
          },
        },
      ],
    },
  };

  const optionsVariete = {
    title: {
      display: true,
      text: "Quantité commandée par variété",
      // position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 200,
          },
        },
      ],
    },
  };

  
  const optionsSpeculationByState = {
    title: {
      display: true,
      text: "Quantité commandée VS Quantité livrée par spéculation",
      // position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 200,
          },
        },
      ],
    },
  };

  const dataBySpeculation = {
    labels: commandesBySpeculation.map(
      (commande) =>
        commande.Production.VarieteInstitution.SpeculationInstitution
          .Speculation.nomSpeculation
    ),
    datasets: [
      {
        label: "Commande",
        data: commandesBySpeculation.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: colors.slice(3, commandesBySpeculation.length + 3),
      },
    ],
  };

  const dataBySpeculationByState = {
    labels: commandesBySpeculationByState.map(
      (commande) =>
        commande.Production.VarieteInstitution.SpeculationInstitution
          .Speculation.nomSpeculation
    ),
    datasets: [
      {
        label: "Commande",
        data: commandesBySpeculationByState.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: colors.slice(
          3,
          commandesBySpeculationByState.length + 3
        ),
      },
      {
        label: "Enlèvement",
        data: commandesBySpeculationByState
          .filter((commande) => commande.etatId === 5)
          .map((commande) => commande.totalQuantiteCommandee),
        backgroundColor: colors.slice(
          5,
          commandesBySpeculationByState.length + 5
        ),
      },
    ],
  };


  return (
    <div>
      <Bar data={dataByVariete} options={optionsVariete} />
      <Bar data={dataBySpeculation} options={optionsSpeculation} />
      <Bar data={dataBySpeculationByState} options={optionsSpeculationByState} />
    </div>
  );
}
