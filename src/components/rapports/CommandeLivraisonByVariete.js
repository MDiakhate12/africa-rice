import { Colors } from "./Colors";
import { Bar } from "react-chartjs-2";
import DataTable from "../common/DataTable";
import { Typography } from "@material-ui/core";

const getNomVariete = (params) =>
  params.getValue("VarieteInstitution").Variete.nomVariete;

const getNomSpeculation = (params) =>
  params.getValue("VarieteInstitution").SpeculationInstitution
    .Speculation.nomSpeculation;

const columns = [
  { type: "string", field: "id", headerName: "idCommande", hide: true },
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
    field: "commande",
    headerName: "Variété",
    width: 150,
    renderCell: getNomVariete,
    valueGetter: getNomVariete,
  },
  {
    type: "number",
    field: "totalQuantiteCommandee",
    headerName: "Quantité commandée (KG)",
    width: 195,
  },
  {
    type: "number",
    field: "totalQuantiteEnleve",
    headerName: "Quantité livrée (KG)",
    width: 195,
  },
];

export default function CommandeLivraisonByVariete({
  display,
  commandesByVariete,
  commandeByVarieteByState,
  filter: { idSpeculation },
}) {

  const optionsVarieteByState = {
    maintainAspectRatio: false,
    title: {
      display: true,
      text: "Quantité commandée contre Quantité Livrée par variété",
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

  const labels = commandesByVariete.map(
    (commande) => commande.VarieteInstitution.Variete.nomVariete
  );

  const commandeByVarieteByStateLabels = commandeByVarieteByState
    .filter((commande) => commande.etatId === 5)
    .map(
      (commande) => commande.VarieteInstitution.Variete.nomVariete
    );

  const commandesEnlevees = commandeByVarieteByState.filter(
    (commande) => commande.etatId === 5
  );

  console.log(commandeByVarieteByStateLabels);

  const totalEnleve = labels.map((label) => {
    let index = commandeByVarieteByStateLabels.indexOf(label);
    if (index > -1) {
      return commandesEnlevees[index].totalQuantiteCommandee;
    }
    return 0;
  });

  const dataByVarieteByState = {
    labels,
    datasets: [
      {
        label: "Commande",
        data: commandesByVariete.map(
          (commande) => commande.totalQuantiteCommandee
        ),
        // backgroundColor: colors.slice(3, commandesByVariete.length + 3),
        backgroundColor: Colors[4],
      },
      {
        label: "Enlèvement",
        data: labels.map((label) => {
          // if (commandeByVarieteByStateLabels.includes(label)) {
          //   return commandeByVarieteByState.find(
          //     (commande) =>
          //       commande.VarieteInstitution.SpeculationInstitution
          //         .Speculation.nomSpeculation === label
          //   ).totalQuantiteCommandee;
          // }
          // return 0;
          let index = commandeByVarieteByStateLabels.indexOf(label);
          if (index > -1) {
            return commandesEnlevees[index].totalQuantiteCommandee;
          }
          return 0;
        }),
        // commande.etatId === 5 ? commande.totalQuantiteCommandee : 0
        backgroundColor: Colors[5],
      },
    ],
  };

  //   return <Bar data={dataByVarieteByState} options={optionsVarieteByState} />; //
  // }

  const rows = commandesByVariete.map((v, i) => {
    return {
      id: `${v.VarieteInstitution.SpeculationInstitution.speculationId}${v.etatId}`,
      ...v,
      totalQuantiteEnleve: totalEnleve[i],
    };
  });

  return display === "chart" ? (
    <Bar
      data={dataByVarieteByState}
      options={optionsVarieteByState}
      height="500"
    />
  ) : (
    <>
      <Typography
        variant="button"
        align="center"
        style={{ display: "flex", justifyContent: "center" }}
      >
        Quantité commandée contre Quantité Livrée par variété{" "}
      </Typography>
      <DataTable height={350} pageSize={4} columns={columns} rows={rows} />
    </>
  );
}
