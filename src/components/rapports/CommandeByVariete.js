import { Typography } from "@material-ui/core";
import { useEffect, useState, useContext } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";
import { GlobalContext } from "../../store/GlobalProvider";
import DataTable from "../common/DataTable";
import { Colors } from "./Colors";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

const getNomVariete = (params) =>
  params.getValue("Production").VarieteInstitution.Variete.nomVariete;

const columns = [
  { type: "string", field: "id", headerName: "idCommande", hide: true },
  {
    type: "string",
    field: "speculation",
    headerName: "Variété",
    width: 170,
    renderCell: getNomVariete,
    valueGetter: getNomVariete,
  },
  {
    type: "number",
    field: "totalQuantiteCommandee",
    headerName: "Quantité commandée (KG)",
    width: 210,
  },
];

export default function CommandeByVariete({
  display,
  filter: { idSpeculation },
}) {
  const { institution } = useContext(GlobalContext);
  const [commandesByVariete, setCommandesByVariete] = useState([]);

  const getCommandeSumByVarietes = () => {
    ipcRenderer.send("getCommandeSumByVarietes", {
      institutionId: institution?.idInstitution,
    });
    ipcRenderer.once("gotCommandeSumByVarietes", (event, data) => {
      setCommandesByVariete(
        data.filter(
          (v) =>
            v.Production.VarieteInstitution.Variete.speculationId ===
            idSpeculation
        )
      );
      console.log(
        "YEAAAAH",
        data.filter(
          (v) =>
            v.Production.VarieteInstitution.Variete.speculationId ===
            idSpeculation
        )
      );
    });
  };

  useEffect(() => {
    getCommandeSumByVarietes();
  }, [institution, idSpeculation]);

  const dataByVariete = {
    labels: commandesByVariete.map(
      (commande) => commande.Production.VarieteInstitution.Variete.nomVariete
    ),
    datasets: [
      {
        label: "Commande",
        data: commandesByVariete.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: Colors.slice(0, commandesByVariete.length),
      },
    ],
  };

  const optionsVariete = {
    title: {
      display: true,
      text: "Quantité commandée par variété",
      // position: "bottom",
    },
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //         stepSize: 200,
    //       },
    //     },
    //   ],
    // },
  };

  //   return <Bar data={dataByVariete} options={optionsVariete} />;
  // }

  const rows = commandesByVariete
    .map((v) => ({
      id: v.Production.VarieteInstitution.varieteId,
      ...v,
    }));

  return display === "chart" ? (
    <Pie data={dataByVariete} options={optionsVariete} />
  ) : (
    <>
      <Typography
        variant="button"
        align="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Quantité commandée par variété{" "}
      </Typography>
      <DataTable height={350} pageSize={4} columns={columns} rows={rows} />
    </>
  );
}
