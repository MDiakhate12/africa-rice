import { Box, Card, Grid, Paper } from "@material-ui/core";
import React from "react";
import SettingsImage from "../images/undraw_following_q0cr.svg";
import AfricaRiceImage from "../images/africa-rice.webp";
import PreferencesImage from "../images/undraw_set_preferences_kwiaé_secondary.svg";
import CommandeImage from "../images/undraw_business_shop_qw5t.svg";
import ProductionImage from "../images/undraw_environment_iaus.svg";
import AchatImage from "../images/undraw_shopping_app_flsj.svg";
import StatsImage from "../images/undraw_Presentation_re_sxof.svg";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Carousel from "react-material-ui-carousel";
import { GlobalContext } from "../../store/GlobalProvider";

const { events, eventResponse } = require("../../store/utils/events");
const { ipcRenderer } = window.require("electron");

export default function Home() {
  var items = [
    {
      description:
        "Choisissez les niveaux de production que vous prenez en charge et personnalisez votre Logo",
      image: SettingsImage,
      title: "Niveau de production",
    },
    {
      description: "Choisissez vos cultures et organisez vos Magasins",
      image: StatsImage,
      title: "Spéculation et Magasin",
    },
    { image: PreferencesImage },
    { image: CommandeImage },
    { image: ProductionImage },
    { image: AchatImage },
  ];

  const { speculations, getAllSpeculation } = React.useContext(GlobalContext);

  React.useEffect(() => {
    getAllSpeculation();

    return () => {
      ipcRenderer.removeAllListeners([
        eventResponse.speculation.gotAll,
        events.speculation.getAll,
      ]);
    };
  }, []);

  return (
    <div>
      {/* <Box height="55vh" width="100vw">
        <Carousel slides={slides} />
      </Box> */}
      {/* <Slider heading="Example Slider" slides={slideData} /> */}

      <Box display="flex" justifyContent="center" alignItems="center">
        <img src={AfricaRiceImage} alt="" />
      </Box>

      <Grid container spacing={3} justify="space-around">
        <Grid item>
          <Box width="500px" height="300px">
            <Carousel navButtonsAlwaysVisible={true}>
              {items.map((item, i) => (
                <Item
                  key={i}
                  description={item.description}
                  image={item.image}
                  title={item.title}
                />
              ))}
            </Carousel>
          </Box>
        </Grid>
        <Grid item>
          <Box width="500px" height="300px">
            <Carousel navButtonsAlwaysVisible={true}>
              {speculations.map((speculation, i) => (
                <Item
                  key={i}
                  image={speculation.imageSpeculation}
                  title={speculation.nomSpeculation}
                />
              ))}
            </Carousel>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
}

function Item({ description, title, image }) {
  return (
    <Paper
      className="Project"
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",

        width: "500px",
        height: "300px",
        padding: "20px",
      }}
      elevation={10}
    >
      {/* <h2>{title}</h2>
      <p>{description}</p> */}
    </Paper>
  );
}

const useStyles = makeStyles({
  root: {
    maxWidth: "100vw",
    height: "80vh",
  },
  media: {
    height: "50vh",
    backgroundSize: "contain",
  },
});

function MediaCard({ description, title, image, imageTitle }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia className={classes.media} image={image} title={imageTitle} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Visiter
        </Button>
        <Button size="small" color="primary">
          Voir Plus
        </Button>
      </CardActions>
    </Card>
  );
}
