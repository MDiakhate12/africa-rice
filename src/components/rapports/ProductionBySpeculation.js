import { Typography } from "@material-ui/core";
import { Pie } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { Colors } from "./Colors";

const getNomSpeculation = (params) =>
  params.getValue("VarieteInstitution").SpeculationInstitution.Speculation
    .nomSpeculation;

const columns = [
  { type: "string", field: "id", headerName: "idProduction", hide: true },
  {
    type: "string",
    field: "production",
    headerName: "Spéculation",
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
    width: 200,
    headerName: "Quantité produite (KG)",
  },
  // {
  //   type: "string",
  //   field: "totalStock",
  //   width: 130,
  //   headerName: "Stock de sécurité total",
  // },
];

export default function ProductionBySpeculation({
  display,
  productionsBySpeculation,
}) {
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
      <Typography
        variant="button"
        align="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Quantité produite par spéculation{" "}
      </Typography>
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
