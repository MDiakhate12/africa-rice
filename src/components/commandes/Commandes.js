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
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import GroupAddIcon from "@material-ui/icons/GroupAdd";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tooltip,
} from "@material-ui/core";
import React, { useContext, useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import { makeStyles } from "@material-ui/core/styles";
import CommandeFormCard from "./CommandeFormCard";
import { GlobalContext } from "../../store/GlobalProvider";
import ClientFormDialog from "../common/ClientFormDialog";
import Accordions from "../common/Accordions";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
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
  formControl: {
    marginBottom: theme.spacing(1),
    width: "25ch",
  },
}));

export default function Commandes() {
  //   const columns = [
  //     {
  //       type: "string",
  //       field: "id",
  //       headerName: "idCommade",
  //       hide: true,
  //       width: 130,
  //     },
  //     { type: "string", field: "quantite", headerName: "quantite", width: 130 },
  //     { type: "string", field: "montant", headerName: "montant", width: 130 },
  //     {
  //       type: "string",
  //       field: "estEnlevee",
  //       headerName: "estEnlevee",
  //       width: 130,
  //     },
  //     { type: "string", field: "estValide", headerName: "estValide", width: 130 },
  //     {
  //       type: "string",
  //       field: "estRejetee",
  //       headerName: "estRejetee",
  //       width: 130,
  //     },
  //     { type: "string", field: "estTraite", headerName: "estTraite", width: 130 },
  //     {
  //       type: "string",
  //       field: "estAnnulee",
  //       headerName: "estAnnulee",
  //       width: 130,
  //     },
  //     {
  //       type: "string",
  //       field: "dateEnlevementSouhaitee",
  //       headerName: "dateEnlevementSouhaitee",
  //       width: 130,
  //     },
  //     {
  //       type: "string",
  //       field: "dateEnlevementReelle",
  //       headerName: "dateEnlevementReelle",
  //       width: 130,
  //     },
  //     {
  //       type: "string",
  //       field: "dateCreation",
  //       headerName: "dateCreation",
  //       width: 130,
  //     },
  //     {
  //       type: "string",
  //       field: "dateDerniereModification",
  //       headerName: "dateDerniereModification",
  //       width: 130,
  //     },
  //     {
  //       type: "string",
  //       field: "dateExpressionBesoinClient",
  //       headerName: "dateExpressionBesoinClient",
  //       width: 130,
  //     },
  //     {
  //       type: "string",
  //       field: "magasinId",
  //       headerName: "magasinId    ",
  //       width: 130,
  //     },
  //     { type: "string", field: "clientId", headerName: "clientId", width: 130 },
  //     {
  //       type: "string",
  //       field: "productionId",
  //       headerName: "productionId",
  //       width: 130,
  //     },
  //   ];

  const { openClientFormDialog } = useContext(GlobalContext);

  let MAX = 10;

  const [max, setMax] = useState(10);

  let commandes = [];

  for (let i = 0; i < MAX; i++) {
    commandes.push({
      idCommande: `${i}`,
      quantite: `${i * 100}`,
      montant: `${i * 1000}`,
      estEnlevee: `${i % 2 === 0}`,
      estValide: `${i % 2 === 0}`,
      estRejetee: `${i % 2 === 0}`,
      estTraite: `${i % 2 === 0}`,
      estAnnulee: `${i % 2 === 0}`,
      dateEnlevementSouhaitee: Date.now(),
      dateEnlevementReelle: Date.now(),
      dateCreation: Date.now(),
      dateDerniereModification: Date.now(),
      dateExpressionBesoinClient: Date.now(),
      magasinId: 1,
      clientId: 1,
      productionId: 1,
    });
  }

  const [clients, setClients] = useState(() => {
    let cls = [];
    for (let i = 0; i < max - 5; i++) {
      cls.push({
        idClient: `${i}`,
        nomCompletStructure: `Client Numero ${i}`,
        acronyme: `CLNT${i}`,
        estParticulier: `${i % 2 === 0}`,
        prenom: "Client",
        nom: `Numero ${i}`,
        telephone: `${i}${i} ${i}${i}${i} ${i}${i} ${i}${i}`,
        email: `client@numero${i}.com`,
      });
    }
    return cls;
  });

  const [state, setState] = useState("");

  const handleChange = (e) => {
    let { name, value } = e.target;
    setState(value);
    console.log("client", { name, value });
  };

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleClientFormDialogClose = (res, data) => {
    if (res === "yes") {
      console.log(data);
      setMax(max + 1);
      setClients([
        ...clients,
        {
          idClient: max,
          ...data,
        },
      ]);
      setState(max);
      return;
    }
    return;
  };

  const [commandeItems, setCommandeItems] = useState(() => {
    let cls = [];
    for (let i = 0; i < max - 7; i++) {
      cls.push({
        title: `diaf ${i}`,
        id: `diaf-${i}`,
        content: `Diaf Niggah ${i}`,
      });
    }
    return cls;
  });

  const addCommandeArtcile = (article) => {
    setCommandeItems([...commandeItems, article]);
  };

  return (
    <div>
      {/* <DataTable
        columns={columns}
        rows={commandes?.map((m) => ({ id: m.idCommande, ...m }))}
      /> */}

      <ClientFormDialog
        className={classes.formDialog}
        handleClose={handleClientFormDialogClose}
      />

      <Card className={classes.root}>
        <CardHeader
          //   avatar={
          //     <Avatar aria-label="recipe" className={classes.avatar}>
          //       R
          //     </Avatar>
          //   }
          //   action={
          //     <IconButton aria-label="settings">
          //       <MoreVertIcon />
          //     </IconButton>
          //   }
          title="Nouvelle Commande"
        />
        <CardContent>
          <FormControl variant="filled" className={classes.formControl}>
            <InputLabel id="client-label" color="secondary">
              Clients
            </InputLabel>
            <Select
              labelId="client-label"
              id="client-select"
              value={state || ""}
              name="client"
              color="secondary"
              onChange={handleChange}
            >
              {clients.map((client) => (
                <MenuItem key={client.idCommande} value={client.idClient}>
                  {client.nomCompletStructure}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Tooltip title="Ajouter un nouveau client">
            <IconButton
              onClick={() => openClientFormDialog()}
              color="secondary"
              variant="outlined"
            >
              <GroupAddIcon />
            </IconButton>
          </Tooltip>
          <Accordions>
              {}
          </Accordions>
          <Tooltip title="Ajouter un nouvel article">
            <IconButton
              onClick={() =>
                addCommandeArtcile({
                  title: `diaf`,
                  id: `diaf`,
                  content: `Diaf Niggah`,
                })
              }
              color="secondary"
              variant="outlined"
            >
              <GroupAddIcon />
            </IconButton>
          </Tooltip>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
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
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>Method:</Typography>
            <Typography paragraph>
              Heat 1/2 cup of the broth in a pot until simmering, add saffron
              and set aside for 10 minutes.
            </Typography>
            <Typography paragraph>
              Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet
              over medium-high heat. Add chicken, shrimp and chorizo, and cook,
              stirring occasionally until lightly browned, 6 to 8 minutes.
              Transfer shrimp to a large plate and set aside, leaving chicken
              and chorizo in the pan. Add pimentón, bay leaves, garlic,
              tomatoes, onion, salt and pepper, and cook, stirring often until
              thickened and fragrant, about 10 minutes. Add saffron broth and
              remaining 4 1/2 cups chicken broth; bring to a boil.
            </Typography>
            <Typography paragraph>
              Add rice and stir very gently to distribute. Top with artichokes
              and peppers, and cook without stirring, until most of the liquid
              is absorbed, 15 to 18 minutes. Reduce heat to medium-low, add
              reserved shrimp and mussels, tucking them down into the rice, and
              cook again without stirring, until mussels have opened and rice is
              just tender, 5 to 7 minutes more. (Discard any mussels that don’t
              open.)
            </Typography>
            <Typography>
              Set aside off of the heat to let rest for 10 minutes, and then
              serve.
            </Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
}
