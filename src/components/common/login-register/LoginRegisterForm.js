import { useContext, useState } from "react";
import clsx from "clsx";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Box,
  Typography,
  TextField,
  CircularProgress,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../../store/GlobalProvider";
import "./LoginRegisterForm.css";
import { validateEmail, validatePassword } from "../../../store/utils";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { useHistory } from "react-router-dom";
import AfricaRiceImage from "../../images/africa-rice.webp";
import MuiPhoneInput from "material-ui-phone-number";

const { ipcRenderer } = window.require("electron");
const { events, eventResponse } = require("../../../store/utils/events");

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  addButton: {
    width: "100%",
    background: theme.gradient.primary_reverse,
  },
  gridContainer: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  fab: {
    position: "sticky",
  },
  formDialog: {
    maxWidth: "30%",
  },
  textField: {
    fontSize: "10px",
    marginTop: "-4px",
  },
}));

export default function LoginRegisterForm() {
  const [active, setActive] = useState(true);
  const [error, setError] = useState({});
  const [responseError, setResponseError] = useState();

  const classes = useStyles();

  const [formState, setFormState] = useState({
    nomComplet: "",
    sigle: "",
    addresse: "",
    telephone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formStateLogin, setFormStateLogin] = useState({});
  const { login, loading, setLoading } = useContext(GlobalContext);
  const history = useHistory();

  const timeout = null;

  const handleChange = (e) => {
    console.log(e);
    let { name, value } = e.target;

    // name === "password" &&
    //   setError({ ...error, password: !validatePassword(value) });

    // name === "confirmPassword" &&
    //   setError({ ...error, confirmPassword: formState.password !== value });

    // name === "email" && setError({ ...error, email: !validateEmail(value) });

    setFormState((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const handlePhoneChange = (value) => {
    console.log(value);
    if (value.length < 9) {
      setFormState((state) => {
        return {
          ...state,
          telephone: value,
        };
      });
    } else {
      return;
    }
  };

  const handleChangeLogin = (e) => {
    console.log(e.target.value);
    let { name, value } = e.target;

    setFormStateLogin((state) => {
      return {
        ...state,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    setLoading(true);
    if (Object.keys(formState).length === 0) return;

    for (let [key, value] of Object.entries(error)) {
      if (value === true) {
        check({ target: { name: key, value } });
        return;
      }
    }

    for (let [key, value] of Object.entries(formState)) {
      if (value === "") {
        check({ target: { name: key, value } });
        return;
      }
    }

    setResponseError();
    console.log(formState);
    ipcRenderer.send(events.auth.register, formState);
    ipcRenderer.once(eventResponse.auth.registered, (ev, data) => {
      console.log(data);
      if (data.status === "error") {
        setResponseError(data.message);
        return;
      }
      login(data.payload);
      setLoading(false);
      history.push("/");
    });
  };

  const handleClickShowPassword = () => {
    setFormState({ ...formState, showPassword: !formState.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setFormState({
      ...formState,
      showConfirmPassword: !formState.showConfirmPassword,
    });
  };

  const handleMouseDownConfirmPassword = (event) => {
    event.preventDefault();
  };

  const interval = 1500;

  const clearOrCheck = (e) => {
    let { name } = e.target;

    if (name === "password" && formState.password?.length === 8)
      return check(e);

    if (
      name === "confirmPassword" &&
      formState.password === formState.confirmPassword
    )
      return check(e);

    clearTimeout(timeout);
  };

  const check = (e) => {
    let { name, value } = e.target;

    name === "password" &&
      setError({ ...error, password: !validatePassword(value) });

    name === "confirmPassword" &&
      setError({ ...error, confirmPassword: formState.password !== value });

    name === "email" && setError({ ...error, email: !validateEmail(value) });

    name !== "email" &&
      name !== "password" &&
      name !== "confirmPassword" &&
      setError({ ...error, [name]: value === "" });
  };

  const checkInterval = (e) => {
    clearTimeout(timeout);
    setTimeout(() => check(e), interval);
  };

  const handleSubmitLogin = (e) => {
    if (Object.keys(formStateLogin).length === 0) return;

    for (let [key, value] of Object.entries(error)) {
      if (value === true) {
        check({ target: { name: key, value } });
        return;
      }
    }

    for (let [key, value] of Object.entries(formStateLogin)) {
      if (value === "") {
        check({ target: { name: key, value } });
        return;
      }
    }

    setResponseError();
    console.log(formStateLogin);
    ipcRenderer.send(events.auth.login, formStateLogin);
    ipcRenderer.once(eventResponse.auth.logged, (ev, data) => {
      console.log(data);
      setResponseError(data.message);

      if (data.status === "error") {
        setTimeout(() => {
          setResponseError();
        }, 4000);
        console.log(data.status);

        return;
      }
      login(data);
      history.push("/");
    });
  };

  return (
    <div className="body">
      <div
        className={`container ${active ? "right-panel-active" : ""}`}
        id="container"
      >
        <div className="form-container sign-up-container">
          <form
            action="#"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmit(e);
              }
            }}
          >
            <h1>Enregistrement</h1>
            {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div> */}
            {/* <span>or use your email for registration</span> */}

            <Grid container spacing={1}>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Nom complet"
                  name="nomComplet"
                  margin="dense"
                  value={formState?.nomComplet || ""}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                  onKeyDown={clearOrCheck}
                  onKeyUp={checkInterval}
                  error={error.nomComplet}
                  helperText={
                    error.nomComplet ? "Ce champ est obligatoire" : ""
                  }
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Sigle"
                  name="sigle"
                  margin="dense"
                  value={formState?.sigle || ""}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                  onKeyDown={clearOrCheck}
                  onKeyUp={checkInterval}
                  error={error.sigle}
                  helperText={error.sigle ? "Ce champ est obligatoire" : ""}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Addresse"
                  name="addresse"
                  margin="dense"
                  value={formState?.addresse || ""}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                  onKeyDown={clearOrCheck}
                  onKeyUp={checkInterval}
                  error={error.addresse}
                  helperText={error.addresse ? "Ce champ est obligatoire" : ""}
                />
              </Grid>

              {/* <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  name="telephone"
                  margin="dense"
                  value={formState?.telephone || ""}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                  onKeyDown={clearOrCheck}
                  onKeyUp={checkInterval}
                  error={error.telephone}
                  helperText={error.telephone ? "Ce champ est obligatoire" : ""}
                />
              </Grid> */}

              <Grid item sm={12}>
                <MuiPhoneInput
                  defaultCountry="sn"
                  regions={"africa"}
                  countryCodeEditable={false}
                  fullWidth
                  label="Téléphone"
                  name="telephone"
                  format="## ### ## ##"
                  margin="dense"
                  value={formState?.telephone || ""}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handlePhoneChange}
                  error={error.telephone}
                  helperText={error.telephone ? "Ce champ est obligatoire" : ""}
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  margin="dense"
                  value={formState?.email || ""}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                  error={error.email}
                  onKeyDown={clearOrCheck}
                  onKeyUp={checkInterval}
                  helperText={
                    error.email ? "Le format de l'email est invalide" : ""
                  }
                />
              </Grid>

              <Grid item sm={12}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  fullWidth
                  error={error.password}
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Mot de passe
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={formState.showPassword ? "text" : "password"}
                    value={formState.password}
                    name="password"
                    onChange={handleChange}
                    onKeyDown={clearOrCheck}
                    onKeyUp={checkInterval}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {formState.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>
                    {error.password
                      ? "Le mdp doit contenir au moins 8 caractères"
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  fullWidth
                  error={error.confirmPassword}
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Confirmer le mot de passe
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={formState.showConfirmPassword ? "text" : "password"}
                    value={formState.confirmPassword}
                    name="confirmPassword"
                    onChange={handleChange}
                    onKeyDown={clearOrCheck}
                    onKeyUp={checkInterval}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownConfirmPassword}
                        >
                          {formState.showConfirmPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>
                    {error.confirmPassword
                      ? "Les mdp doivent être conformes"
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>
              {/* <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Mot de passe"
                  name="password"
                  margin="dense"
                  value={formState?.password || ''}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                  error={error.password}
                  helperText={
                    error.password
                      ? "Le mdp doit contenir au moins 8 caractères"
                      : ""
                  }
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Confirmer le mot de passe"
                  name="confirmPassword"
                  margin="dense"
                  value={formState?.confirmPassword || ""}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                  error={error.confirmPassword}
                  helperText={
                    error.confirmPassword
                      ? "Les mdp doivent être conformes"
                      : ""
                  }
                />
              </Grid>*/}

              <Grid item sm={12}>
                {responseError ? (
                  <p style={{ color: "red" }}>{responseError}</p>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item sm={12} className={classes.gridContainer}>
                {/* <Button
                  color="primary"
                  variant="contained"
                  className={classes.addButton}
                  // size="large"
                  onClick={handleSubmit}
                >
                  {loading ? (
                    <CircularProgress size="small" color="inherit" />
                  ) : (
                    <Typography>Enregistrer</Typography>
                  )}
                </Button> */}
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.addButton}
                  // size="large"
                  onClick={handleSubmit}
                >
                  Enregistrer
                </Button>
              </Grid>
            </Grid>

            {/* <input type="text" placeholder="Name" />
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" /> */}
            {/* <button>Sign Up</button> */}
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form
            action="#"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSubmitLogin(e);
              }
            }}
          >
            <h1>Connexion</h1>
            <Grid container>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  margin="dense"
                  value={formStateLogin?.email || ""}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChangeLogin}
                />
              </Grid>

              <Grid item sm={12}>
                <FormControl
                  className={clsx(classes.margin, classes.textField)}
                  fullWidth
                  error={error.password}
                >
                  <InputLabel htmlFor="standard-adornment-password">
                    Mot de passe
                  </InputLabel>
                  <Input
                    id="standard-adornment-password"
                    type={formState.showPassword ? "text" : "password"}
                    name="password"
                    onChange={handleChangeLogin}
                    value={formStateLogin?.password || ""}
                    className={clsx(classes.margin, classes.textField)}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {formState.showPassword ? (
                            <Visibility />
                          ) : (
                            <VisibilityOff />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                  <FormHelperText>
                    {error.password
                      ? "Le mdp doit contenir au moins 8 caractères"
                      : ""}
                  </FormHelperText>
                </FormControl>
              </Grid>

              <Grid item sm={12}>
                {responseError ? (
                  <p style={{ color: "red" }}>{responseError}</p>
                ) : (
                  ""
                )}
              </Grid>

              <Grid item sm={12} className={classes.gridContainer}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.addButton}
                  // size="large"
                  onClick={handleSubmitLogin}
                >
                  Connexion
                </Button>
              </Grid>
            </Grid>
            {/* <div className="social-container">
              <a href="#" className="social">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </a>
              <a href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span> 
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button> */}
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Déja enregistré ? </h1>
              <p>Connectez vous en cliquant sur le boutton ci-dessous.</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => setActive(false)}
              >
                Connexion
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Premier pas !</h1>
              <p>
                Enregistrez votre institution en cliquant sur le boutton
                ci-dessous.
              </p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => setActive(true)}
              >
                Entregistrer l'institution
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <footer
        style={{
          backgroundColor: "inherit",
          color: "gray",
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
      </footer> */}
    </div>
  );
}
