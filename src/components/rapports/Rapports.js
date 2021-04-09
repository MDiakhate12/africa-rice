import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import Production from "./Production";
import Commande from "./Commande";
import { Grid } from "@material-ui/core";
import ProductionCommande from "./ProductionCommande";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

// const greenBackground = "rgba(75, 192, 192, 0.2)";
// const greenBorder = "rgba(75, 192, 192, 1)";

export default function Rapports() {
  // const [productions, setProductions] = useState([]);

  // const [data, setData] = useState({
  //   labels: [],
  //   datasets: [
  //     {
  //       label: "Production par spéculation",
  //       data: [],
  //       backgroundColor: greenBackground,
  //       borderColor: greenBorder,
  //       borderWidth: 1,
  //     },
  //   ],
  // });

  // const getUniqueValues = (array) => [...new Set(array)];

  // const getNestedObject = (nestedObj, pathArr) => {
  //   return pathArr.reduce(
  //     (obj, key) => (obj && obj[key] !== "undefined" ? obj[key] : undefined),
  //     nestedObj
  //   );
  // };

  // const getAllProductions = () => {
  //   ipcRenderer.send(events.production.getAll);
  //   ipcRenderer.once(eventResponse.production.gotAll, (event, response) => {
  //     setProductions(response);
  //     setData({
  //       ...response,
  //       datasets: {
  //         ...data.datasets,
  //         data: response.reduce(
  //           (result,production) => {

  //             }
  //         )
  //       },
  //       labels: getUniqueValues(
  //         response.map(
  //           (production) =>
  //             production.VarieteInstitution.SpeculationInstitution.Speculation
  //               .nomSpeculation
  //         )
  //       ),
  //     });
  //   });
  // };

  // useEffect(() => {
  //   getAllProductions();
  // }, []);

  const colors = [
    { riz: "rgba(255, 99, 132, 0.2)" },
    { sorgho: "rgba(54, 162, 235, 0.2)" },
    { mil: "rgba(148, 0, 0, 0.5)" },
    { mais: "rgba(75, 192, 192, 0.2)" },
    { arachide: "rgba(153, 102, 255, 0.2)" },
    { niebe: "rgba(255, 159, 64, 0.2)" },
    { oignon: "rgba(231, 51, 255, 0.2)" },
    { tomate: "rgba(190, 255, 51, 0.2)" },
    { piment: "rgba(255, 51, 51, 0.2)" },
    { jaxatu: "rgba(26, 173, 0, 0.2)" },
    { pomme_de_terre: "rgba(194, 204, 0, 0.2)" },
    { patate_douce: "rgba(255, 244, 122, 0.2)" },
    { gombo: "rgba(3, 179, 0, 0.2)" },
    { aubergine: "rgba(102, 26, 168, 0.2)" },
  ];

  const getProductionsSumBySpeculation = () => [
    { riz: 2000 },
    { mil: 3000 },
    { mais: 1000 },
    { sorgho: 800 },
    { arachide: 4000 },
    { niebe: 500 },
  ];
  const getProductionsSumByVariete = () => [
    { riz: 2000 },
    { mil: 3000 },
    { mais: 1000 },
    { sorgho: 800 },
    { arachide: 4000 },
    { niebe: 500 },
  ];

  const data = {
    labels: getProductionsSumBySpeculation().map((v) => Object.keys(v)[0]),
    datasets: [
      {
        label: "Production par spéculation",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
        hoverOffset: 309,
      },
    ],
  };

  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={6}>
          <Production />
        </Grid>
        <Grid item sm={6}>
          <Commande />
        </Grid>
        <Grid item sm={6}>
          <ProductionCommande />
        </Grid>
      </Grid>
    </div>
  );
}
