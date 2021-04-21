import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import ListProduction from './ListProductions'
import { Box, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import Stock from './Stock'

// import '../../store/speculation/speculation'
// import '../../store/zone/zones'
// import '../../store/variete/varietes'
// import '../../store/institution/institution'
// import '../../store/speculationInstitution/speculationInstitution'
// import '../../store/localisation/localisation'
// import '../../store/niveau/niveau'
// import '../../store/niveau/etatCommande'
// import '../../store/niveauInstitution/niveauInstitution'
// import '../../store/magasin/magasin'
// import '../../store/varieteInstitution/varietes'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    // backgroundColor: theme.palette.background.paper,
    marginTop: -5
  },
}))

export default function CenteredTabs() {
  const classes = useStyles()
  const [value, setValue] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className={classes.root}>
      <Paper>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="secondary"
          color="primary"
          // centered
          variant="fullWidth"
        >
          <Tab label="Production" />
          <Tab label="Etat Stock " />
        </Tabs>
      </Paper>
      <TabPanel value={value} index={0}>
        <ListProduction />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Stock />
      </TabPanel>
    </div>
  )
}
