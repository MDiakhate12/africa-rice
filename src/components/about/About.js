import { Grid } from "@material-ui/core";

import Typography from "@material-ui/core/Typography";
import { useContext } from "react";
import { GlobalContext } from "../../store/GlobalProvider";

export default function About() {
  const { isDev } = useContext(GlobalContext);

  return (
    <div>
      <Grid container id="con" justify="space-between">
      <Grid item id="yhs">
          <img
            src={`${isDev ? "" : global.__dirname}/assets/images/USAID2.png`}
            alt=""
          />
        </Grid>
        <Grid item>
          <img
            src={`${
              isDev ? "" : global.__dirname
            }/assets/images/africa-rice.webp`}
            alt=""
          
          />
        </Grid>
      </Grid>

      <Grid container justify="center">
        <Grid item sm={12}>
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
            dans le cadre de la mise en œuvre du projet
            <br /> Seed-Scaling Project pour faire face <br /> à l'inadéquation
            entre la demande et l'offre en semences.
            <br /> <br />
            Le projet a été financé par USAID \ Feed The Future. <br /> <br />.
            {/* Avec le concours des développeurs : <br /> */}
            {/* Mouhammad DIAKHATE & Mor KAIRE */}
          </Typography>
        </Grid>
      </Grid>
    </div>
  );
}
