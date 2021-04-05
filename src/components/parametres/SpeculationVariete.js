import React from "react";

import { Box, Grid, Typography } from "@material-ui/core";
import Variete from "./Variete";
import Speculation from "./Speculation";

export default function SpeculationVariete() {
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Grid container spacing={6} justify="space-between">
            <Grid item sm={3}>
              <Typography variant="button">Nos Spéculations</Typography>
            </Grid>
            <Grid item sm={3}>
              <Typography variant="button">Ajouter Une Spéculation</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Speculation />

        <Box height={150}></Box>

        <Variete />
      </Grid>
    </div>
  );
}
