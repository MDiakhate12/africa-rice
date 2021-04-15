import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Colors } from "./Colors";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");


export default function CommandeByVariete() {
  const [commandesByVariete, setCommandesByVariete] = useState([]);

  const getCommandeSumByVarietes = () => {
    ipcRenderer.send("getCommandeSumByVarietes");
    ipcRenderer.once("gotCommandeSumByVarietes", (event, data) => {
      setCommandesByVariete(data);
    });
  };

  useEffect(() => {
    getCommandeSumByVarietes();
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
        backgroundColor: Colors.slice(0, commandesByVariete.length),
      },
    ],
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

  return <Bar data={dataByVariete} options={optionsVariete} />;
}
