import React, { useEffect, useState, useContext } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { Colors } from "./Colors";
import { GlobalContext } from "../../store/GlobalProvider";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const getNomVariete = (params) =>
  params.getValue("Production").VarieteInstitution.Variete.nomVariete;

const getNomSpeculation = (params) =>
  params.getValue("Production").VarieteInstitution.SpeculationInstitution
    .Speculation.nomSpeculation;

const columns = [
  { type: "string", field: "id", headerName: "idProduction", hide: true },
  {
    type: "string",
    field: "speculation",
    headerName: "Speculation",
    width: 130,
    renderCell: getNomSpeculation,
    valueGetter: getNomSpeculation,
    hide: true,
  },
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

export default function ProductionCommandeByVariete({ display }) {
  const { institution } = useContext(GlobalContext);
  const [commandesByVariete, setCommandesByVariete] = useState([]);
  const [max, setMax] = useState();
  const [min, setMin] = useState();

  const getCommandeSumByVarietes = () => {
    ipcRenderer.send("getCommandeSumByVarietes", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotCommandeSumByVarietes", (event, data) => {
      setCommandesByVariete(data);
      console.log("DIIAAAAF", data);
    });
  };

  useEffect(() => {
    getCommandeSumByVarietes();
  }, [institution]);

  const [productionsByVariete, setProductionsByVariete] = useState([]);

  const getProductionsSumByVarietes = () => {
    ipcRenderer.send("getByVarietes", {
      institution: institution?.idInstitution,
    });
    ipcRenderer.once("gotByVarietes", (event, data) => {
      console.log(data);
      setProductionsByVariete(data);
      setMax(Math.max(...data.map((p) => p.totalQuantiteDisponible)));
      setMax(Math.min(...data.map((p) => p.totalQuantiteDisponible)));
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
        label: "Quantité disponible",
        data: productionsByVariete.map(
          (production) => production.totalQuantiteDisponible
        ),
        backgroundColor: Colors[0],
        stack: 0,
      },
      {
        label: "Stock de sécurité",
        data: productionsByVariete.map((production) => production.totalStock),
        backgroundColor: Colors[3],
        stack: 0,
      },
      {
        label: "Commande",
        data: productionsByVariete.map((production) => {
          let result = commandesByVariete
            .find((commande) => commande.Production.varieteInstitutionId === production.varieteInstitutionId)

            return result?.totalQuantiteCommandee || 0
            
        }),
        backgroundColor: Colors[1],
        stack: 1,
      },
    ],
  };

  const optionsVariete = {
    maintainAspectRatio: false,
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
            stepSize: (max - min) / 1000,
          },
        },
      ],
    },
  };

  //   return <Bar data={dataByVariete} options={optionsVariete} />;
  // }

  const rows = commandesByVariete.map((v, i) => ({
    id: v.Production.VarieteInstitution.SpeculationInstitution.speculationId,
    ...v,
    ...productionsByVariete[i],
  }));

  return display === "chart" ? (
    <Bar data={dataByVariete} options={optionsVariete} height="500" />
  ) : (
    <>
      <DataTable height={350} pageSize={4} columns={columns} rows={rows} />
    </>
  );
}
