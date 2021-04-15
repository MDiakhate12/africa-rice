import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { Colors } from "./Colors";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");


const getNomVariete = (params) =>
  params.getValue("VarieteInstitution").Variete.nomVariete

const columns = [
  { type: "string", field: "id", headerName: "idProduction", hide: true },
  {
    type: "string",
    field: "production",
    headerName: "Production",
    width: 160,
    renderCell: getNomVariete,
    valueGetter: getNomVariete,
  },
  {
    type: "number",
    field: "totalQuantiteProduite",
    width: 150,
    headerName: "Total produit",
  },
];

export default function ProductionByVariete({ display}) {
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

//   return <Bar data={dataByVariete} options={optionsVariete} />;
// }

return display === "chart" ? (
  <Bar data={dataByVariete} options={optionsVariete} />
) : (
  <>
    <DataTable
      height={350}
      pageSize={4}
      columns={columns}
      rows={productionsByVariete.map((v) => ({
        id: v.VarieteInstitution.varieteId,
        ...v,
      }))}
    />
  </>
);
}
