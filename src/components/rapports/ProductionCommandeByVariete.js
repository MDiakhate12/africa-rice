import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Colors } from "./Colors";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

export default function ProductionCommandeByVariete() {
  const [commandesByVariete, setCommandesByVariete] = useState([]);

  const getCommandeSumByVarietes = () => {
    ipcRenderer.send("getCommandeSumByVarietes");
    ipcRenderer.once("gotCommandeSumByVarietes", (event, data) => {
      setCommandesByVariete(data);
      console.log("DIIAAAAF", data);
    });
  };

  useEffect(() => {
    getCommandeSumByVarietes();
  }, []);

  const [productionsByVariete, setProductionsByVariete] = useState([]);

  const getProductionsSumByVarietes = () => {
    ipcRenderer.send("getByVarietes");
    ipcRenderer.once("gotByVarietes", (event, data) => {
      console.log(data);
      setProductionsByVariete(data);
    });
  };

  useEffect(() => {
    getProductionsSumByVarietes();
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
        backgroundColor: Colors[0],
      },
      {
        label: "Commande",
        data: commandesByVariete.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: Colors[1],
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
 

  return <Bar data={dataByVariete} options={optionsVariete} />;
}
