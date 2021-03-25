import "./App.css";
import GlobalProvider from "./store/GlobalProvider";
import MiniDrawer from "./components/common/MiniDrawer";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core";
import { amber, teal } from "@material-ui/core/colors";
import { BrowserRouter, Route } from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    type: "light",
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
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalProvider>
        <BrowserRouter>
          <MiniDrawer />
        </BrowserRouter>
      </GlobalProvider>
    </ThemeProvider>
  );
}

export default App
