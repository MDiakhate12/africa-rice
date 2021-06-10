import { Pie } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { Colors } from "./Colors";
import { Typography } from "@material-ui/core";

const getNomSpeculation = (params) =>
  params.getValue("VarieteInstitution").SpeculationInstitution
    .Speculation.nomSpeculation;

const columns = [
  { type: "string", field: "id", headerName: "idCommande", hide: true },
  {
    type: "string",
    field: "speculation",
    headerName: "Spéculation",
    width: 170,
    renderCell: getNomSpeculation,
    valueGetter: getNomSpeculation,
  },
  {
    type: "number",
    field: "totalQuantiteCommandee",
    headerName: "Qunatité commandée (KG)",
    width: 210,
  },
];

export default function CommandesBySpeculation({
  display,
  commandesBySpeculation,
}) {
  const optionsSpeculation = {
    title: {
      display: true,
      text: "Quantité commandée par spéculation",
      // position: "bottom",
    },
  };

  const dataBySpeculation = {
    labels: commandesBySpeculation.map(
      (commande) =>
        commande.VarieteInstitution.SpeculationInstitution.Speculation
          .nomSpeculation
    ),
    datasets: [
      {
        label: "Commande",
        data: commandesBySpeculation.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        backgroundColor: Colors.slice(0, commandesBySpeculation.length),
      },
    ],
  };

  //   return <Bar data={dataBySpeculation} options={optionsSpeculation} />;
  // }

  const rows = commandesBySpeculation.map((v) => ({
    id: v.VarieteInstitution.SpeculationInstitution.speculationId,
    ...v,
  }));

  return display === "chart" ? (
    <Pie data={dataBySpeculation} options={optionsSpeculation} />
  ) : (
    <>
      <Typography
        variant="button"
        align="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Quantité commandée par spéculation{" "}
      </Typography>
      <DataTable height={350} pageSize={4} columns={columns} rows={rows} />
    </>
  );
}
