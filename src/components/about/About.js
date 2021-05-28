import { Grid } from "@material-ui/core";
import React from "react";

import Typography from "@material-ui/core/Typography";

export default function About() {
  return (
    <div>
      <Grid container justify="center">
        <Grid item>
          <Typography
            variant="h1"
            color="textSecondary"
            align="center"
            style={{
              fontSize: "1.8rem",
              marginTop: "5ch",
            }}
          >
            SSP a été développé au Sénégal par AfricaRice <br />
            dans le cadre de la mise en œuvre <br /> du projet Seed-Scaling Project. <br /> <br />
            Financé par Feed The Future / USAID. <br /> <br />
            {/* Avec le concours des développeurs : <br /> */}
            {/* Mouhammad DIAKHATE & Mor KAIRE */}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
