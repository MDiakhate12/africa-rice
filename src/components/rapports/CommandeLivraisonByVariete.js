import React, { useEffect, useState } from "react";
import { Colors } from "./Colors";
import { Bar } from "react-chartjs-2";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

export default function CommandeLivraisonByVariete() {
  const [commandesByVariete, setCommandeByVariete] = useState([]);
  const [commandeByVarieteByState, setCommandeByVarieteByState] = useState([]);

  const getCommandeSumByVariete = () => {
    ipcRenderer.send("getCommandeSumByVarietes");
    ipcRenderer.once("gotCommandeSumByVarietes", (event, data) => {
      setCommandeByVariete(data);
    });
  };

  useEffect(() => {
    getCommandeSumByVariete();
  }, []);

  const getCommandeSumByVarieteByState = () => {
    ipcRenderer.send("getCommandeSumByVarieteByState");
    ipcRenderer.once("gotCommandeSumByVarieteByState", (event, data) => {
      setCommandeByVarieteByState(data);
      console.log("BY STATE: ", data);
    });
  };

  useEffect(() => {
    getCommandeSumByVariete();
    getCommandeSumByVarieteByState();
  }, []);

  const optionsVarieteByState = {
    title: {
      display: true,
      text: "Quantité commandée VS Quantité Livrée par variété",
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

  const labels = commandesByVariete.map(
    (commande) => commande.Production.VarieteInstitution.Variete.nomVariete
  );

  const commandeByVarieteByStateLabels = commandeByVarieteByState
    .filter((commande) => commande.etatId === 5)
    .map(
      (commande) => commande.Production.VarieteInstitution.Variete.nomVariete
    );

  const commandesEnlevees = commandeByVarieteByState.filter(
    (commande) => commande.etatId === 5
  );

  console.log(commandeByVarieteByStateLabels);
  const dataByVarieteByState = {
    labels,
    datasets: [
      {
        label: "Commande",
        data: commandesByVariete.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        // backgroundColor: colors.slice(3, commandesByVariete.length + 3),
        backgroundColor: Colors[4],
      },
      {
        label: "Enlèvement",
        data: labels.map((label) => {
          // if (commandeByVarieteByStateLabels.includes(label)) {
          //   return commandeByVarieteByState.find(
          //     (commande) =>
          //       commande.Production.VarieteInstitution.SpeculationInstitution
          //         .Speculation.nomSpeculation === label
          //   ).totalQuantiteCommandee;
          // }
          // return 0;
          let index = commandeByVarieteByStateLabels.indexOf(label);
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

  return <Bar data={dataByVarieteByState} options={optionsVarieteByState} />; //
}
