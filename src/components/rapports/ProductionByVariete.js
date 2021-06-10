import { useEffect, useState, useContext } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { GlobalContext } from "../../store/GlobalProvider";
import { Colors } from "./Colors";
import { Typography } from "@material-ui/core";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const getNomVariete = (params) =>
  params.getValue("VarieteInstitution").Variete.nomVariete;

const columns = [
  { type: "string", field: "id", headerName: "idProduction", hide: true },
  {
    type: "string",
    field: "production",
    headerName: "Variété",
    width: 160,
    renderCell: getNomVariete,
    valueGetter: getNomVariete,
  },
  {
    type: "number",
    field: "totalQuantiteProduite",
    width: 200,
    headerName: "Quantité produite (KG)",
  },
];

export default function ProductionByVariete({
  display,
  productionsByVariete,
  filter: { idSpeculation },
}) {


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
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //         // count: 5,
    //         stepSize: 1000,
    //       },
    //     },
    //   ],
    // },
  };

  //   return <Bar data={dataByVariete} options={optionsVariete} />;
  // }

  return display === "chart" ? (
    <Pie data={dataByVariete} options={optionsVariete} />
  ) : (
    <>
      <Typography
        variant="button"
        align="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Quantité produite par variété{" "}
      </Typography>
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
