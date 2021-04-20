import React, { useEffect, useContext, useState } from 'react'
import './App.css'
import { GlobalContext } from './store/GlobalProvider'
import MiniDrawer from './components/common/MiniDrawer'
import { ThemeProvider } from '@material-ui/styles'
import { createMuiTheme } from '@material-ui/core'
import { amber, teal } from '@material-ui/core/colors'
import { BrowserRouter } from 'react-router-dom'
import Auth from './components/auth/Auth'

const theme = createMuiTheme({
  gradient: {
    primary:
      'linear-gradient(to right, var(--primary-main), var(--primary-light));',
    primary_reverse:
      'linear-gradient(to right, var(--primary-main), var(--secondary-main));',
    secondary:
      'linear-gradient(to right, var(--secondary-light), var(--secondary-main));',
  },
  palette: {
    type: 'light',
    primary: {
      // light: will be calculated from palette.primary.main,
      main: teal[500],
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: amber[500],
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
  typography: {
    allVariants: {
      fontSize: '0.8rem',
    },
    // button: { fontSize: "0.8rem" },
    h1: { fontSize: '1.3rem' },
    h2: { fontSize: '0.9rem' },
    // body1: { fontSize: "0.8rem" },
    // body2: { fontSize: "0.8rem" },
  },
})

function App() {
  const [isAuth, setIsAuth] = useState(false)
  const { checkAuth } = useContext(GlobalContext)

  useEffect(() => {
    setIsAuth(checkAuth())
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>{isAuth ? <MiniDrawer /> : <Auth />}</BrowserRouter>
    </ThemeProvider>
  )
}

export default App
