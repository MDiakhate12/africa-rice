import { useEffect, useState, useContext } from "react";
import { Colors } from "./Colors";
import { Pie, Line, Bar } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { GlobalContext } from "../../store/GlobalProvider";
import { Typography } from "@material-ui/core";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const getNomSpeculation = (params) =>
  params.getValue("Production").VarieteInstitution.SpeculationInstitution
    .Speculation.nomSpeculation;

const columns = [
  { type: "string", field: "id", headerName: "idCommande", hide: true },
  {
    type: "string",
    field: "commande",
    headerName: "Spéculation",
    width: 140,
    renderCell: getNomSpeculation,
    valueGetter: getNomSpeculation,
  },
  {
    type: "number",
    field: "totalQuantiteCommandee",
    headerName: "Quantité commandée (KG)",
    width: 200,
  },
  {
    type: "number",
    field: "totalQuantiteEnleve",
    headerName: "Quantité livrée (KG)",
    width: 200,
  },
];

export default function CommandeLivraisonBySpeculation({ display }) {
  const { institution } = useContext(GlobalContext);
  const [commandesBySpeculation, setCommandesBySpeculation] = useState([]);
  const [commandeBySpeculationByState, setCommandeBySpeculationByState] =
    useState([]);

  const [max, setMax] = useState();
  const [min, setMin] = useState();

  const getCommandeSumBySpeculation = () => {
    ipcRenderer.send("getCommandeSumBySpeculation", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotCommandeSumBySpeculation", (event, data) => {
      setCommandesBySpeculation(data);
      setMax(Math.max(...data.map((p) => p.totalQuantiteDisponible)));
      setMax(Math.min(...data.map((p) => p.totalQuantiteDisponible)));
    });
  };

  useEffect(() => {
    getCommandeSumBySpeculation();
  }, [institution]);

  const getCommandeSumBySpeculationByState = () => {
    ipcRenderer.send("getCommandeSumBySpeculationByState", {
      "$Production.institutionId$": institution?.idInstitution,
    });
    ipcRenderer.once("gotCommandeSumBySpeculationByState", (event, data) => {
      setCommandeBySpeculationByState(data);
      console.log("BY STATE: ", data);
    });
  };

  useEffect(() => {
    getCommandeSumBySpeculation();
    getCommandeSumBySpeculationByState();
  }, []);

  const optionsSpeculationByState = {
    maintainAspectRatio: false,

    title: {
      display: true,
      text: "Quantité commandée contre Quantité Livrée par spéculation",
      // position: "bottom",
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
            // stepSize: (max - min) / 10,
          },
        },
      ],
    },
  };

  const labels = commandesBySpeculation.map(
    (commande) =>
      commande.Production.VarieteInstitution.SpeculationInstitution.Speculation
        .nomSpeculation
  );

  const commandeBySpeculationByStateLabels = commandeBySpeculationByState
    .filter((commande) => commande.etatId === 5)
    .map(
      (commande) =>
        commande.Production.VarieteInstitution.SpeculationInstitution
          .Speculation.nomSpeculation
    );

  const commandesEnlevees = commandeBySpeculationByState.filter(
    (commande) => commande.etatId === 5
  );

  console.log(commandeBySpeculationByStateLabels);

  const totalEnleve = labels.map((label) => {
    let index = commandeBySpeculationByStateLabels.indexOf(label);
    if (index > -1) {
      return commandesEnlevees[index].totalQuantiteCommandee;
    }
    return 0;
  });

  const dataBySpeculationByState = {
    labels,
    datasets: [
      {
        label: "Commande",
        data: commandesBySpeculation.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        // backgroundColor: colors.slice(3, commandesBySpeculation.length + 3),
        backgroundColor: Colors[4],
      },
      {
        label: "Enlèvement",
        data: totalEnleve,
        // commande.etatId === 5 ? commande.totalQuantiteCommandee : 0
        backgroundColor: Colors[5],
      },
    ],
  };

  //   return (
  //     <Bar data={dataBySpeculationByState} options={optionsSpeculationByState} />
  //   ); //
  // }

  const rows = commandesBySpeculation.map((v, i) => {
    return {
      id: `${v.Production.VarieteInstitution.SpeculationInstitution.speculationId}${v.etatId}`,
      ...v,
      totalQuantiteEnleve: totalEnleve[i],
    };
  });

  return display === "chart" ? (
    <Bar
      data={dataBySpeculationByState}
      options={optionsSpeculationByState}
      height="500"
    />
  ) : (
    <>
      <Typography
        variant="button"
        align="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Quantité commandée contre Quantité Livrée par spéculation{" "}
      </Typography>
      <DataTable height={350} pageSize={4} columns={columns} rows={rows} />
    </>
  );
}
