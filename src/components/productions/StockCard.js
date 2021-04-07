import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import OpenInBrowserIcon from "@material-ui/icons/OpenInBrowser";
import { Button, Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function StockCard({
  handleOpenDialog,
  children,
  data: {
    nomSpeculation,
    dateDerniereProduction,
    imageSpeculation,
    quantiteProduite,
  },
}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            {nomSpeculation.substring(0, 1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          nomSpeculation.substring(0, 1).toUpperCase() +
          nomSpeculation.substring(1)
        }
        subheader={dateDerniereProduction}
      />
      <CardMedia
        className={classes.media}
        image={imageSpeculation}
        title={`Stock de ${nomSpeculation}`}
      />
      <CardContent>
        <Typography variant="h3" color="primary" component="p">
          {quantiteProduite} KG
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <Tooltip title="Ouvrir les stock des variétés correpondantes">
          <Button
            variant="outlined"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<OpenInBrowserIcon />}
            onClick={handleOpenDialog}
          >
            Variétés
          </Button>
        </Tooltip>

        {/* <IconButton aria-label="share">
          <ShareIcon />
        </IconButton> */}
        <Tooltip
          title={`${
            expanded ? "Cacher" : "Montrer"
          }  les stock des variétés correpondantes`}
        >
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>{children}</CardContent>
      </Collapse>
    </Card>
  );
}
