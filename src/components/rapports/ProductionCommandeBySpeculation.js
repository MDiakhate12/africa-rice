import React, { useEffect, useState, useContext } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { GlobalContext } from "../../store/GlobalProvider";
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
  {
    type: "number",
    field: "totalQuantiteDisponible",
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
  const { institution } = useContext(GlobalContext);
  const [commandesBySpeculation, setCommandesBySpeculation] = useState([]);
  const [max, setMax] = useState();
  const [min, setMin] = useState();

  const getCommandeSumBySpeculation = () => {
    ipcRenderer.send("getCommandeSumBySpeculation", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotCommandeSumBySpeculation", (event, data) => {
      setCommandesBySpeculation(data);
      console.log("DIIAAAAF", data);
    });
  };

  useEffect(() => {
    getCommandeSumBySpeculation();
  }, [institution]);

  const [productionsBySpeculation, setProductionsBySpeculation] = useState([]);

  const getProductionsSumBySpeculation = () => {
    ipcRenderer.send("getProductionsSumBySpeculation", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotProductionsSumBySpeculation", (event, data) => {
      console.log(data);
      setProductionsBySpeculation(data);
      setMax(Math.max(...data.map((p) => p.totalQuantiteDisponible)));
      setMax(Math.min(...data.map((p) => p.totalQuantiteDisponible)));
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
        label: "Quantité disponible",
        data: productionsBySpeculation.map(
          (production) => production.totalQuantiteDisponible
        ),
        backgroundColor: Colors[0],
        stack: 0,
      },
      {
        label: "Stock de sécurité",
        data: productionsBySpeculation.map(
          (production) => production.totalStock
        ),
        backgroundColor: Colors[3],
        stack: 0,
      },
      {
        label: "Commande",
        data: commandesBySpeculation.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: Colors[1],
        stack: 1,
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
            stepSize: (max - min) / 10,
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
