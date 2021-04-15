import React, { useEffect, useState } from "react";
import { Colors } from "./Colors";
import { Pie, Line, Bar } from "react-chartjs-2";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

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

  const commandesEnlevees = commandeBySpeculationByState.filter(
    (commande) => commande.etatId === 5
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
        // backgroundColor: colors.slice(3, commandesBySpeculation.length + 3),
        backgroundColor: Colors[4],
      },
      {
        label: "Enlèvement",
        data: labels.map((label) => {
          // if (commandeBySpeculationByStateLabels.includes(label)) {
          //   return commandeBySpeculationByState.find(
          //     (commande) =>
          //       commande.Production.VarieteInstitution.SpeculationInstitution
          //         .Speculation.nomSpeculation === label
          //   ).totalQuantiteCommandee;
          // }
          // return 0;
          let index = commandeBySpeculationByStateLabels.indexOf(label);
          if (index > -1) {
            return commandesEnlevees[index].totalQuantiteCommandee;
          }
          return 0;
        }),
        // commande.etatId === 5 ? commande.totalQuantiteCommandee : 0
        backgroundColor: Colors[5],
      },
    ],
  };

  return (
    <Bar data={dataBySpeculationByState} options={optionsSpeculationByState} />
  ); //
}
