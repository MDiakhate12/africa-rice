import React, { useContext, useState } from "react";
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
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { GlobalContext } from "../../../store/GlobalProvider";
import "./LoginRegisterForm.css";
import { validateEmail, validatePassword } from "../../../store/utils";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

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

  const classes = useStyles();

  const [formState, setFormState] = useState({});

  const { institution } = useContext(GlobalContext);
  const [error, setError] = useState({});

  const timeout = null;

  const handleChange = (e) => {
    console.log(e.target.value);
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

  const handleSubmit = (e) => {
    if (Object.keys(formState).length === 0) return;
    
    for (let [key, value] of Object.entries(error)) {
      if (value === true) {
        check({ target: { name: key, value } });
        return;
      }
    }

    for (let [key, value] of Object.entries(formState)) {
      if (value) {
        check({ target: { name: key, value } });
        return;
      }
    }

    console.log(formState);
    // updateInstitution({ id: formState.idInstitution, data: formState });
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

  const interval = 1300;

  const clearOrCheck = (e) => {
    let { name, value } = e.target;

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
  return (
    <div class="body">
      <div
        class={`container ${active ? "right-panel-active" : ""}`}
        id="container"
      >
        <div class="form-container sign-up-container">
          <form action="#">
            <h1>Enregistrement</h1>
            {/* <div class="social-container">
              <a href="#" class="social">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-google-plus-g"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-linkedin-in"></i>
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

              <Grid item sm={12}>
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
                  value={formState?.password || ""}
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

              <Grid item sm={12} className={classes.gridContainer}>
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
        <div class="form-container sign-in-container">
          <form action="#">
            <h1>Connexion</h1>
            <Grid container>
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
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Mot de passe"
                  name="password"
                  margin="dense"
                  value={formState?.password || ""}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12} className={classes.gridContainer}>
                <Button
                  color="primary"
                  variant="contained"
                  className={classes.addButton}
                  // size="large"
                  onClick={handleSubmit}
                >
                  Connexion
                </Button>
              </Grid>
            </Grid>
            {/* <div class="social-container">
              <a href="#" class="social">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-google-plus-g"></i>
              </a>
              <a href="#" class="social">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
            <span>or use your account</span> 
            <input type="email" placeholder="Email" />
            <input type="password" placeholder="Password" />
            <a href="#">Forgot your password?</a>
            <button>Sign In</button> */}
          </form>
        </div>
        <div class="overlay-container">
          <div class="overlay">
            <div class="overlay-panel overlay-left">
              <h1>Déja enregistré ? </h1>
              <p>Connectez vous en cliquant sur le boutton ci-dessous.</p>
              <button
                class="ghost"
                id="signIn"
                onClick={() => setActive(false)}
              >
                Connexion
              </button>
            </div>
            <div class="overlay-panel overlay-right">
              <h1>Premier pas !</h1>
              <p>
                Enregistrez votre institution en cliquant sur le boutton
                ci-dessous.
              </p>
              <button class="ghost" id="signUp" onClick={() => setActive(true)}>
                Entregistrer l'institution
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
