import { Typography } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { Colors } from "./Colors";

const getNomVariete = (params) =>
  params.getValue("VarieteInstitution").Variete.nomVariete;

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
  commandesByVariete,
  filter: { idSpeculation },
}) {
  const dataByVariete = {
    labels: commandesByVariete.map(
      (commande) => commande.VarieteInstitution.Variete.nomVariete
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

  const rows = commandesByVariete.map((v) => ({
    id: v.VarieteInstitution.varieteId,
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
