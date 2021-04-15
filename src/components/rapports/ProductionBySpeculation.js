import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { Colors } from "./Colors";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

export default function ProductionBySpeculation() {
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
    // console.log(productions)
  }, []);

  const dataBySpeculations = {
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
        backgroundColor: Colors.slice(0, productionsBySpeculation.length),
      },
    ],
  };
  const optionsSpeculation = {
    title: {
      display: true,
      text: "Quantité produite par spéculation",
      // position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            // count: 5,
            stepSize: 2000,
          },
        },
      ],
    },
  };

  return <Bar data={dataBySpeculations} options={optionsSpeculation} />;
}
