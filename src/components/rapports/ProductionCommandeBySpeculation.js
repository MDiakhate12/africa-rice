import React, { useContext, useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { Colors } from "./Colors";
import {GlobalContext} from "../../store/GlobalProvider";

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
  {
    type: "number",
    field: "totalQuantiteProduite",
    width: 130,
    headerName: "Total produit",
  },
  {
    type: "number",
    field: "totalQuantiteCommandee",
    headerName: "Total commandé",
    width: 150,
  },
];

export default function ProductionCommandeBySpeculation({ display }) {
  const [commandesBySpeculation, setCommandesBySpeculation] = useState([]);

  const {institution} = useContext(GlobalContext)

  const getCommandeSumBySpeculation = () => {
    ipcRenderer.send("getCommandeSumBySpeculation", { institutionId: institution?.institutionId });
    ipcRenderer.once("gotCommandeSumBySpeculation", (event, data) => {
      setCommandesBySpeculation(data);
      console.log("DIIAAAAF", data);
    });
  };

  useEffect(() => {
    getCommandeSumBySpeculation();
  }, []);

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
  }, []);

  const dataBySpeculation = {
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
        backgroundColor: Colors[0],
      },
      {
        label: "Commande",
        data: commandesBySpeculation.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: Colors[1],
      },
    ],
  };

  const optionsSpeculation = {
    title: {
      display: true,
      text: "Quantité produite VS Quantité commandée par spéculation  ",
      // position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            stepSize: 2000,
          },
        },
      ],
    },
  };

  //   return <Bar data={dataBySpeculation} options={optionsSpeculation} />;
  // }

  const rows = commandesBySpeculation.map((v, i) => ({
    id: v.Production.VarieteInstitution.SpeculationInstitution.speculationId,
    ...v,
    ...productionsBySpeculation[i],
  }));

  return display === "chart" ? (
    <Bar data={dataBySpeculation} options={optionsSpeculation} />
  ) : (
    <>
      <DataTable height={350} pageSize={4} columns={columns} rows={rows} />
    </>
  );
}
