import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Colors } from "./Colors";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

export default function ProductionByVariete() {
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
        backgroundColor: Colors.slice(0, productionsByVariete.length),
      },
    ],
  };
  const optionsVariete = {
    title: {
      display: true,
      text: "Quantité produite par variété",
      // position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            // count: 5,
            stepSize: 1000,
          },
        },
      ],
    },
  };

  return <Bar data={dataByVariete} options={optionsVariete} />;
}
