import { Bar } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { Colors } from "./Colors";
import { Typography } from "@material-ui/core";

const getNomVariete = (params) =>
  params.getValue("VarieteInstitution").Variete.nomVariete;

const getNomSpeculation = (params) =>
  params.getValue("VarieteInstitution").SpeculationInstitution.Speculation
    .nomSpeculation;

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
    headerName: "Variété",
    width: 160,
    renderCell: getNomVariete,
    valueGetter: getNomVariete,
  },
  {
    type: "number",
    field: "totalQuantiteProduite",
    width: 190,
    headerName: "Quantité produite (KG)",
  },
  {
    type: "number",
    field: "totalQuantiteCommandee",
    headerName: "Quantité commandée (KG)",
    width: 190,
  },
];

export default function ProductionCommandeByVariete({
  productionsByVariete,
  commandesByVariete,
  display,
}) {
  const labelsUnion = [
    ...new Set([
      ...productionsByVariete.map(
        (production) => production.VarieteInstitution.Variete.nomVariete
      ),
      ...commandesByVariete.map(
        (commande) => commande.VarieteInstitution.Variete.nomVariete
      ),
    ]),
  ];

  console.log("DDDDDDDDDDDDDDDD", labelsUnion);
  const dataByVariete = {
    labels: labelsUnion,
    datasets: [
      {
        label: "Quantité produite",
        data: labelsUnion.map((label) => {
          let result = productionsByVariete.find(
            (production) =>
              production.VarieteInstitution.Variete.nomVariete === label
          );
          return result?.totalQuantiteProduite || 0;
        }),
        // data: productionsByVariete.map(
        //   (production) => {production.totalQuantiteProduite}
        // ),
        backgroundColor: Colors[0],
        stack: 0,
      },
      // {
      //   label: "Stock de sécurité",
      //   data: productionsByVariete.map((production) => production.totalStock),
      //   backgroundColor: Colors[3],
      //   stack: 0,
      // },
      {
        label: "Quantité commandée",
        data: labelsUnion.map((label) => {
          // let cmds = commandesByVariete.map((commande) => {
          //   if (!commande?.Production) {
          //     console.log("object")
          //     let value = -1 * parseInt(commande.totalQuantiteCommandee)
          //     commande["totalQuantiteCommandee"] = value;
          //   }
          //   return commande;
          // });

          // console.log("DYEEDUH", cmds);
          let result = commandesByVariete.find(
            (commande) =>
              commande.VarieteInstitution.Variete.nomVariete === label
          );

          return result?.totalQuantiteCommandee || 0;
        }),
        // data: productionsByVariete.map((production) => {
        //   let result = commandesByVariete.find(
        //     (commande) =>
        //       commande.VarieteInstitution.idVarieteInstitution ===
        //       production.varieteInstitutionId
        //   );

        //   return result?.totalQuantiteCommandee || 0;
        // }),
        backgroundColor: Colors[1],
        stack: 1,
      },
    ],
  };

  const optionsVariete = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: `Quantité produite contre Quantité commandée par variété`,
    },
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  //   return <Bar data={dataByVariete} options={optionsVariete} />;
  // }

  const rows = commandesByVariete.map((v, i) => ({
    id: v.VarieteInstitution.SpeculationInstitution.speculationId,
    ...v,
    ...productionsByVariete[i],
  }));

  return display === "chart" ? (
    <Bar data={dataByVariete} options={optionsVariete} height="500" />
  ) : (
    <>
      <Typography
        variant="button"
        align="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Quantité produite contre Quantité commandée par variété{" "}
      </Typography>
      <DataTable height={350} pageSize={4} columns={columns} rows={rows} />
    </>
  );
}
