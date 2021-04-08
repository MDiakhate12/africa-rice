import React, { useEffect, useState } from "react";
import { Pie, Line, Bar } from "react-chartjs-2";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../store/utils/events");

// const greenBackground = "rgba(75, 192, 192, 0.2)";
// const greenBorder = "rgba(75, 192, 192, 1)";

export default function ProductionByVariete() {
  const [productions, setProductions] = useState([]);

  const getAllProductions = () => {
    ipcRenderer.send("getByVarietes");
    ipcRenderer.once("gotByVarietes", (event, data) => {
      console.log(data);
      // updateColumn(false)
      setProductions(data);
      // setTimeout(() => {
      //   updateColumn(true)
      //   setProductions(groupBySpeculation(data))
      // }, 3000)
    });
  };
  const getCommandeSumBySpeculationByMonth = () => {
    ipcRenderer.send("getCommandeSumBySpeculationByMonth");
    ipcRenderer.once("gotCommandeSumBySpeculationByMonth", (event, data) => {
      console.log("DIIAAAAF", data);
    });
  };

  useEffect(() => {
    getAllProductions();
    getCommandeSumBySpeculationByMonth()
    // console.log(productions)
  }, []);

  const data = {
    labels: productions.map(
      (production) => production.VarieteInstitution.Variete.nomVariete
    ),
    datasets: [
      {
        label: "Production par variété",
        data:  productions.map(
            (production) => production.totalQuantiteProduite
          ),
      },
    ],
  };

  return (
    <div>
      <Bar data={data} />
    </div>
  );
}
