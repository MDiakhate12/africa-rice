import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { Colors } from "./Colors";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const getNomSpeculation = (params) =>
  params.getValue("VarieteInstitution").SpeculationInstitution.Speculation
    .nomSpeculation;

const columns = [
  { type: "string", field: "id", headerName: "idProduction", hide: true },
  {
    type: "string",
    field: "production",
    headerName: "Production",
    width: 160,
    renderCell: getNomSpeculation,
    valueGetter: getNomSpeculation,
  },
  // { type: "string", field: "totalPrix", width: 130, headerName: "Prix total" },
  // {
  //   type: "string",
  //   field: "totalQuantiteDisponible",
  //   width: 130,
  //   headerName: "Quantité disponible totale",
  // },
  {
    type: "number",
    field: "totalQuantiteProduite",
    width: 150,
    headerName: "Total produit",
  },
  // {
  //   type: "string",
  //   field: "totalStock",
  //   width: 130,
  //   headerName: "Stock de sécurité total",
  // },
];

export default function ProductionBySpeculation({ display }) {
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
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //         // count: 5,
    //         stepSize: 2000,
    //       },
    //     },
    //   ],
    // },
  };

  const rows = productionsBySpeculation.map((v) => ({
    id: v.VarieteInstitution.SpeculationInstitution.speculationId,
    ...v,
  }));

  return display === "chart" ? (
    <Pie data={dataBySpeculations} options={optionsSpeculation} />
  ) : (
    <>
      <DataTable
        height={350}
        pageSize={4}
        columns={columns}
        rows={productionsBySpeculation.map((v) => ({
          id: v.VarieteInstitution.SpeculationInstitution.speculationId,
          ...v,
        }))}
      />
    </>
  );
}
