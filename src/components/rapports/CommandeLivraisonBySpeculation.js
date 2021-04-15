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

export default function CommandeLivraisonBySpeculation() {
  const [commandesBySpeculation, setCommandesBySpeculation] = useState([]);
  const [
    commandeBySpeculationByState,
    setCommandeBySpeculationByState,
  ] = useState([]);

  const getCommandeSumBySpeculation = () => {
    ipcRenderer.send("getCommandeSumBySpeculation");
    ipcRenderer.once("gotCommandeSumBySpeculation", (event, data) => {
      setCommandesBySpeculation(data);
    });
  };

  useEffect(() => {
    getCommandeSumBySpeculation();
  }, []);

  const getCommandeSumBySpeculationByState = () => {
    ipcRenderer.send("getCommandeSumBySpeculationByState");
    ipcRenderer.once("gotCommandeSumBySpeculationByState", (event, data) => {
      setCommandeBySpeculationByState(data);
      console.log("BY STATE: ", data);
    });
  };

  useEffect(() => {
    getCommandeSumBySpeculation();
    getCommandeSumBySpeculationByState();
  }, []);

  const optionsSpeculationByState = {
    title: {
      display: true,
      text: "Quantité commandée VS Quantité Livrée par spéculation",
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

  const labels = commandesBySpeculation.map(
    (commande) =>
      commande.Production.VarieteInstitution.SpeculationInstitution.Speculation
        .nomSpeculation
  );

  const commandeBySpeculationByStateLabels = commandeBySpeculationByState
    .filter((commande) => commande.etatId === 5)
    .map(
      (commande) =>
        commande.Production.VarieteInstitution.SpeculationInstitution
          .Speculation.nomSpeculation
    );

  console.log(commandeBySpeculationByStateLabels);
  const dataBySpeculationByState = {
    labels,
    datasets: [
      {
        label: "Commande",
        data: commandesBySpeculation.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: colors.slice(3, commandesBySpeculation.length + 3),
      },
      {
        label: "Enlèvement",
        data: labels.map((label) => {
          if (commandeBySpeculationByStateLabels.includes(label)) {
            return commandeBySpeculationByState.find(
              (commande) =>
                commande.Production.VarieteInstitution.SpeculationInstitution
                  .Speculation.nomSpeculation === label
            ).totalQuantiteCommandee;
          }
          return 0;
        }),
        // commande.etatId === 5 ? commande.totalQuantiteCommandee : 0
        backgroundColor: colors.slice(5, commandesBySpeculation.length + 5),
      },
    ],
  };

  return (
    <Bar data={dataBySpeculationByState} options={optionsSpeculationByState} />
  ); //
}
