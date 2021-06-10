import { Bar } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { GlobalContext } from "../../store/GlobalProvider";
import { Colors } from "./Colors";
import { Typography } from "@material-ui/core";

const getNomSpeculation = (params) =>
  params.getValue("VarieteInstitution").SpeculationInstitution.Speculation
    .nomSpeculation;

const columns = [
  { type: "string", field: "id", headerName: "idProduction", hide: true },
  {
    type: "string",
    field: "production",
    headerName: "Spéculation",
    width: 130,
    renderCell: getNomSpeculation,
    valueGetter: getNomSpeculation,
  },
  {
    type: "number",
    field: "totalQuantiteDisponible",
    width: 200,
    headerName: "Quantité produite (KG)",
  },
  {
    type: "number",
    field: "totalQuantiteCommandee",
    headerName: "Quantité commandée (KG)",
    width: 200,
  },
];

export default function ProductionCommandeBySpeculation({
  display,
  productionsBySpeculation,
  commandesBySpeculation,
}) {
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
      // {
      //   label: "Stock de sécurité",
      //   data: productionsBySpeculation.map(
      //     (production) => production.totalStock
      //   ),
      //   backgroundColor: Colors[3],
      //   stack: 0,
      // },
      {
        label: "Commande",
        // data: commandesBySpeculation.map(
        //   (commande) => commande.totalQuantiteCommandee
        // ),
        data: productionsBySpeculation.map((production) => {
          let result = commandesBySpeculation.find(
            (commande) =>
              commande.VarieteInstitution.speculationInstitutionId ===
              production.VarieteInstitution.speculationInstitutionId
          );

          return result?.totalQuantiteCommandee || 0;
        }),
        backgroundColor: Colors[1],
        stack: 1,
      },
    ],
  };

  const optionsSpeculation = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Quantité produite contre Quantité commandée par spéculation",
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

  //   return <Bar data={dataBySpeculation} options={optionsSpeculation} />;
  // }

  const rows = commandesBySpeculation.map((v, i) => ({
    id: v.VarieteInstitution.SpeculationInstitution.speculationId,
    ...v,
    ...productionsBySpeculation[i],
  }));

  return display === "chart" ? (
    <Bar data={dataBySpeculation} options={optionsSpeculation} height="500" />
  ) : (
    <>
      <Typography
        variant="button"
        align="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Quantité produite contre Quantité commandée par spéculation
      </Typography>
      <DataTable height={350} pageSize={4} columns={columns} rows={rows} />
    </>
  );
}
