import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    flexGrow: 1,
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    flexWrap: "nowrap",
    flexGrow: 1,
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    // transform: "translateZ(0)",
  },
  title: {
    color: theme.palette.primary.light,
  },
  tileBar: {
    fontSize: "0.8rem"
  },
}));

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */
export default function SingleLineGridList({ data }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={55} className={classes.gridList} cols={6}>
        {data.map((tile) => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} width={"100%"} />
            <GridListTileBar
              title={tile.title}
              // subtitle={<span></span>}
              titlePosition="top"
              className={classes.tileBar}
              actionIcon={
                <Tooltip title={`Supprimer ${tile.title}`}>
                  <IconButton
                    aria-label={`info about ${tile.title}`}
                    className={classes.icon}
                    onClick={tile.onClick}
                  >
                    <DeleteIcon color="secondary" />
                  </IconButton>
                </Tooltip>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
