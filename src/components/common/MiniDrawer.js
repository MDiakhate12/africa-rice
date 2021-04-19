import React, { useState, useContext } from 'react'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import CssBaseline from '@material-ui/core/CssBaseline'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import SettingsIcon from '@material-ui/icons/Settings'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import HomeIcon from '@material-ui/icons/Home'
import PrintIcon from '@material-ui/icons/Print'
import EqualizerIcon from '@material-ui/icons/Equalizer'
import StoreIcon from '@material-ui/icons/Store'
import DrawerItem from './DrawerItem'
import { Route, Switch, useLocation } from 'react-router'
import Productions from '../productions/Productions'
import Commandes from '../commandes/Commandes'
import Parametres from '../parametres/Parametres'
import Rapports from '../rapports/Rapports'
import Impressions from '../impressions/Impressions'
import {
  Box,
  Button,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  MenuList,
  Tooltip,
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import { AccountCircle, LocationOnSharp } from '@material-ui/icons'
import Home from '../home/Home'
import { GlobalContext } from '../../store/GlobalProvider'
const drawerWidth = 240

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: theme.gradient.primary_reverse,
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  toolbarColored: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    // backgroundColor: theme.palette.primary.main,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
    flexGrow: 1,
  },
  selected: {
    backgroundColor: 'rgba(0, 150, 136, 0.3)',
  },
}))

export default function MiniDrawer() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const location = useLocation()

  const { logout } = useContext(GlobalContext)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  const items = [
    {
      isActive: false,
      to: '/home',
      icon: <HomeIcon color="primary" />,
      text: 'Accueil',
    },
    {
      isActive: false,
      to: '/productions',
      icon: <StoreIcon color="primary" />,
      text: 'Production',
    },
    {
      isActive: true,
      to: '/commandes',
      icon: <ShoppingCartIcon color="primary" />,
      text: 'Commandes',
    },
    {
      isActive: false,
      to: '/parametres',
      icon: <SettingsIcon color="primary" />,
      text: 'Paramètres',
    },
    {
      isActive: false,
      to: '/rapports',
      icon: <EqualizerIcon color="primary" />,
      text: 'Rapports',
    },
    {
      isActive: false,
      to: '/impressions',
      icon: <PrintIcon color="primary" />,
      text: 'Impressions',
    },
  ]

  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [currentItem, setCurrentItem] = useState(items[0])

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index)
    console.log(location)
    console.log(items[index].text)
    setCurrentItem(items[index])
  }

  const [auth, setAuth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const shown = Boolean(anchorEl)

  const handleChange = (event) => {
    setAuth(event.target.checked)
  }

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h1" className={classes.title}>
            Gestion des semences
          </Typography>

          <Typography variant="button">{currentItem.text}</Typography>

          {auth && (
            <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={shown}
                onClose={handleClose}
              >
                <Link to="/parametres?tab=2" className={classes.default}>
                  <MenuItem
                    onClick={() => {
                      setSelectedIndex(
                        items.findIndex(
                          (item) => item.to === location.pathname,
                        ),
                      )
                      handleClose()
                    }}
                  >
                    Profil
                  </MenuItem>
                </Link>
                <MenuItem
                  onClick={() => {
                    logout()
                    handleClose()
                  }}
                >
                  Déconnexion
                </MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbarColored}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? (
              <ChevronRightIcon color="primary" />
            ) : (
              <ChevronLeftIcon color="primary" />
            )}
          </IconButton>
        </div>
        <Divider />
        {/* <List>
          {items.map(({ text, icon, to }, index) => (
            <Fragment key={text}>
              <DrawerItem to={to} text={text}>
                {icon}
              </DrawerItem>
              {index === 1 ? <Divider /> : ""}
            </Fragment>
          ))}
        </List> */}
        <MenuList>
          {items.map(({ text, icon, to }, index) => (
            <Link to={to} className={classes.default}>
              <MenuItem
                key={text}
                selected={index === selectedIndex}
                onClick={(event) => handleMenuItemClick(event, index)}
                classes={{
                  selected: classes.selected,
                }}
              >
                {/* <Tooltip title={text}> */}
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText
                  primary={text}
                  className={classes.itemText}
                />{' '}
                {/* </Tooltip> */}
              </MenuItem>
            </Link>
          ))}
        </MenuList>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/home" component={Home} />
          <Route path="/productions" component={Productions} />
          <Route path="/commandes" component={Commandes} />
          <Route path="/parametres" component={Parametres} />
          <Route path="/rapports" component={Rapports} />
          <Route path="/impressions" component={Impressions} />
        </Switch>
      </main>
      <footer
        style={{
          backgroundColor: 'inherit',
          color: 'gray',
        }}
      >
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          position="relative"
        >
          <Typography variant="body2">
            2021 &copy; Africa Rice | Mouhammad DIAKHATE & Mor KAIRE
          </Typography>
        </Box>
      </footer>
    </div>
  )
}
