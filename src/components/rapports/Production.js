import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const colors = [
  "rgba(75, 192, 192, 0.2)",
  "rgba(255, 159, 64, 0.2)",
  "rgba(190, 255, 51, 0.2)",
  "rgba(255, 51, 51, 0.2)",
  "rgba(26, 173, 0, 0.2)",
  "rgba(255, 99, 132, 0.2)",
  "rgba(54, 162, 235, 0.2)",
  "rgba(231, 51, 255, 0.2)",
  "rgba(148, 0, 0, 0.5)",
  "rgba(194, 204, 0, 0.2)",
  "rgba(255, 244, 122, 0.2)",
  "rgba(153, 102, 255, 0.2)",
  "rgba(3, 179, 0, 0.2)",
  "rgba(102, 26, 168, 0.2)",
];
export default function Production() {
  const [productions, setProductions] = useState([]);

  const getAllProductions = () => {
    ipcRenderer.send("getByVarietes");
    ipcRenderer.once("gotByVarietes", (event, data) => {
      console.log(data);
      // updateColumn(false)
      setProductions(data);
      // setTimeout(() => {
      //   updateColumn(true)
      //   setProductions(groupBySpeculation(data))
      // }, 3000)
    });
  };

  useEffect(() => {
    getAllProductions();
    // console.log(productions)
  }, []);

  const data = {
    labels: productions.map(
      (production) => production.VarieteInstitution.Variete.nomVariete
    ),
    datasets: [
      {
        label: "Production par variété",
        data: productions.map((production) => production.totalQuantiteProduite),
        backgroundColor: colors.slice(0, productions.length),
      },
    ],
  };
  const options = {
    title: {
      display: true,
      text: "Quantité produite par variété",
      position: "bottom",
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

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
