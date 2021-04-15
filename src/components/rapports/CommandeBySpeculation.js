import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Colors } from "./Colors";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");


export default function CommandesBySpeculation() {
  const [commandesBySpeculation, setCommandesBySpeculation] = useState([]);

  const getCommandeSumBySpeculation = () => {
    ipcRenderer.send("getCommandeSumBySpeculation");
    ipcRenderer.once("gotCommandeSumBySpeculation", (event, data) => {
      setCommandesBySpeculation(data);
    });
  };

  useEffect(() => {
    getCommandeSumBySpeculation();
  }, []);

  const optionsSpeculation = {
    title: {
      display: true,
      text: "Quantité commandée par spéculation",
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
        backgroundColor: Colors.slice(0, commandesBySpeculation.length),
      },
    ],
  };

  return <Bar data={dataBySpeculation} options={optionsSpeculation} />;
}
