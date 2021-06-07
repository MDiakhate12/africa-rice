import { Grid } from "@material-ui/core";
import { useContext, useEffect } from "react";

import Typography from "@material-ui/core/Typography";
import { GlobalContext } from "../../store/GlobalProvider";

export default function Home() {
  const { isDev } = useContext(GlobalContext);

  useEffect(() => {
    console.log(global)
    console.log(global.__dirname)
  });
  return (
    <div>
      <Grid container justify="space-between">
        <Grid item>
          <img
            src={`${
              isDev ? "" : global.__dirname
            }/assets/images/africa-rice.webp`}
            alt=""
          />
        </Grid>
        <Grid item>
          <Typography
            variant="button"
            style={{
              fontSize: "2.1rem",
            }}
          >
            Centre du riz <br />
            pour l'Afrique
          </Typography>
        </Grid>
      </Grid>
      <Grid container alignItems="center" direction="column">
        <Grid item>
          <Typography
            variant="button"
            style={{
              fontSize: "3.4rem",
              fontWeight: "bold",
              color: "darkgreen",
              marginTop: "2.5ch",
            }}
          >
            SSP
          </Typography>{" "}
        </Grid>
        <Grid item>
          <Typography
            variant="h1"
            style={{
              fontSize: "2.4rem",
              marginTop: "2.3ch",
              fontWeight: "bold",
            }}
          >
            Seed-Scaling Project
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h1"
            style={{
              fontSize: "2.1rem",
              marginTop: "2.8ch",
            }}
          >
            Assistance technique pour le développement du secteur semencier
          </Typography>
        </Grid>
        <Grid item>
          <Typography
            variant="h1"
            style={{
              fontSize: "1.7rem",
              marginTop: "2.8ch",
            }}
          >
            Version 1.0{" "}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
