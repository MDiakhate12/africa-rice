import React, { useContext, useState } from 'react'
import clsx from 'clsx'
import { Box, Button, Grid, TextField, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { GlobalContext } from '../../../store/GlobalProvider'
import './LoginRegisterForm.css'

const { ipcRenderer } = window.require('electron')
const { events, eventResponse } = require('../../../store/utils/events')

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  addButton: {
    width: '100%',
    background: theme.gradient.primary_reverse,
  },
  gridContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  fab: {
    position: 'sticky',
  },
  formDialog: {
    maxWidth: '30%',
  },
  textField: {
    fontSize: '10px',
  },
}))

export default function LoginRegisterForm() {
  const [active, setActive] = useState(true)
  const [error, setError] = useState()

  const classes = useStyles()

  const [formState, setFormState] = useState({})

  const { institution } = useContext(GlobalContext)

  const handleChange = (e) => {
    let { name, value } = e.target
    setFormState((state) => {
      return {
        ...state,
        [name]: value,
      }
    })
  }

  const handleSubmit = (e) => {
    console.log(formState)
    ipcRenderer.send(events.auth.register, formState)
    ipcRenderer.once(eventResponse.auth.registered, (ev, data) => {
      console.log(data)
      if (data.status === 'error') {
        setError(data.message)
      }
    })
    // updateInstitution({ id: formState.idInstitution, data: formState });
  }

  return (
    <div class="body">
      <div
        class={`container ${active ? 'right-panel-active' : ''}`}
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

            <Grid container>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Nom complet"
                  name="nomComplet"
                  margin="dense"
                  value={formState?.nomComplet || ''}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Sigle"
                  name="sigle"
                  margin="dense"
                  value={formState?.sigle || ''}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Addresse"
                  name="addresse"
                  margin="dense"
                  value={formState?.addresse || ''}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Téléphone"
                  name="telephone"
                  margin="dense"
                  value={formState?.telephone || ''}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  margin="dense"
                  value={formState?.email || ''}
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
                  value={formState?.password || ''}
                  className={clsx(classes.margin, classes.textField)}
                  // variant="filled"
                  onChange={handleChange}
                />
              </Grid>

              <Grid item sm={12}>
                <TextField
                  fullWidth
                  label="Répéter le mot de passe"
                  name="password2"
                  margin="dense"
                  value={formState?.password2 || ''}
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
                  Enregistrer
                </Button>
              </Grid>
              <Grid item sm={12}>
                {error ? <p style={{ color: 'red' }}>{error}</p> : ''}
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
                  value={formState?.email || ''}
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
                  value={formState?.password || ''}
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
  )
}
