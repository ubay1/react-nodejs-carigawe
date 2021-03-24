/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import image_login from '../assets/image_login.png';
import AnimationAuth from '../../components/AnimationAuth';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Slide, toast } from 'react-toastify';
import { setLoading } from '../../store/loading';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../store';
import { HTTPGetUser, HTTPLoginUser, HTTPRegisterUser } from '../../utils/http';
import Cookies from 'js-cookie';
// initialStateUserAuthByAsync
import { initialStateUserAuthByAsync, setAuthStatus, setReduxUsersProfile } from '../../store/user';
import { RootState } from '../../store/rootReducer';
import { setLoadingScreenHome } from '../../store/loadingScreenHome';
import Lottie from 'lottie-react';
import LoadingScreen from '../../assets/loading_screen.json';
import socket from '../../utils/socket'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, TextField, Paper, Grid, Box, Container, Hidden, Typography, FilledInput, FormControl, InputAdornment, InputLabel, OutlinedInput, IconButton, Divider, createMuiTheme, ThemeProvider, CircularProgress, FormControlLabel, Radio, FormLabel, RadioGroup, FormHelperText } from '@material-ui/core';
import { ImEye } from "react-icons/im";
import { RiEyeCloseLine } from "react-icons/ri";
// import clsx from 'clsx';
import { blue, green } from '@material-ui/core/colors';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    buttonProgress: {
      color: blue[600],
      position: 'absolute',
      // top: '50%',
      // left: '50%',
      marginTop: -40,
      marginLeft: 0,
    },
  }),
);

const theme = createMuiTheme({
  palette: {
    primary: {
      // Purple and green play nicely together.
      main: '#2563eb',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#42b72a',
    },
  },
});

const Register = () => {
  toast.configure()
  const dispatch: AppDispatch = useDispatch()
  const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
  const userRedux = useSelector((state: RootState) => state.user)
  const history = useHistory();
  const classes = useStyles();
  const [showPassword, setshowPassword] = useState(false)
  const [loadingCircular, setLoadingCircular] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  const timer = React.useRef<number>();

  useEffect(() => {
    document.title = 'Cari Gawe - Daftar'
    setTimeout(() => {
      dispatch(setLoadingScreenHome({
        show: false
      }))
    }, 2000)
  }, [])

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      gender: '',
      email: '',
      password: '',
      roles_jobs: ''
    },
    onSubmit: values => {
      httpRegisterUser(values)

    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("nama wajib diisi"),
      phone: Yup.number()
        .required("no.tlp wajib diisi"),
      gender: Yup.string()
        .required("jenis kelamin wajib diisi"),
      email: Yup.string()
        .email("Invalid email format")
        .required("email wajib diisi"),
      password: Yup.string()
        .min(8, "Minimum 8 characters")
        .required("password wajib diisi"),
      roles_jobs: Yup.string()
        .required("daftar pekerja wajib diisi"),
    })
  });

  const httpRegisterUser = async (params: any) => {
    try {
      dispatch(setLoading({
        show: true,
        timeout: 300000
      }))
      setSuccess(false);
      setLoadingCircular(true);

      const responseRegisterUser = await HTTPRegisterUser({
        name: params.name,
        phone: params.phone,
        gender: params.gender,
        email: params.email,
        password: params.password,
        roles_jobs: params.roles_jobs
      })

      if (responseRegisterUser.status === 200) {
        setTimeout(() => {
          dispatch(setLoading({
            show: false,
            timeout: 0
          }))
          setSuccess(true);
          setLoadingCircular(false);
          toast(responseRegisterUser.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            type: 'success',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            transition: Slide
          })
          history.push('/login')
        }, 2000)
      }
    } catch (error) {
      setTimeout(() => {
        toast(error.data.errors, {
          position: "bottom-right",
          autoClose: 5000,
          type: 'error',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          transition: Slide
        })
        dispatch(setLoading({
          show: false,
          timeout: 0
        }))
        setSuccess(true);
        setLoadingCircular(false);
      }, 2000);
    }
  }

  const handleClickShowPassword = () => {
    setshowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  if (loadingScreenHomeRedux.show === true) {
    return (
      <div className="flex items-center justify-center flex-col h-screen">
        {/* <img src={LoadingGif} alt="laodinggif"/> */}
        {/* <div>Loading ..</div> */}
        <Lottie animationData={LoadingScreen} style={{ width: 200 }} />
      </div>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <div className={classes.root}>
          <Box height="100vh" className="flex flex-col justify-start sm:justify-center">
            <Container>
              <Grid container spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Hidden xsDown only="sm">
                  <Grid item xs={12} sm={4} md={6} lg={6}>
                    {/* <Paper className={classes.paper}> */}
                    <AnimationAuth />
                    {/* </Paper> */}
                  </Grid>
                </Hidden>
                <Grid item xs={12} sm={12} md={6} lg={4} className={`
                  ${formik.errors.name || formik.errors.phone || formik.errors.gender || formik.errors.email || formik.errors.password || formik.errors.roles_jobs ? 'mt-2 md:mt-0' : 'mt-2 md:mt-2'}
                `}>
                  <Paper className="p-6 text-center rounded-xl" square={true} elevation={3}>
                    {/* <Typography component="div">
                      <Box textAlign="center" mb={2}>
                        <Link to="/"
                          className="focus:outline-none 
                          font_damion text-4xl sm:text-5xl text-blue-600 font-semibold"
                        >Cari Gawe</Link>
                      </Box>
                    </Typography> */}
                    <form onSubmit={formik.handleSubmit} noValidate autoComplete="on">
                      <div className="sm:flex sm:justify-start sm:items-center">
                          <TextField
                            id="filled-full-width"
                            label="Nama Lengkap"
                            name="name"
                            className="w-full mt-0 mb-3 sm:mb-0 sm:mr-1 sm:w-1/2 "
                            placeholder="masukan nama lengkap"
                            margin="normal"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            variant="outlined"
                            error={formik.errors.name ? true : false}
                            helperText={formik.errors.name ? formik.errors.name : ''}
                          />

                          <TextField
                            id="filled-full-width"
                            label="Nomor telepon"
                            name="phone"
                            className="w-full mt-0 mb-3 sm:mb-0 sm:ml-1 sm:w-1/2"
                            placeholder="masukan nomor telepon"
                            margin="normal"
                            onChange={formik.handleChange}
                            value={formik.values.phone}
                            variant="outlined"
                            error={formik.errors.phone ? true : false}
                            helperText={formik.errors.phone ? formik.errors.phone : ''}
                          />
                      </div>

                      <div className="mt-4 mb-2 ml-1 text-left flex justify-start items-center">
                        <FormControl className="" error={formik.errors.gender ? true : false} component="fieldset">
                          <FormLabel component="legend">Jenis Kelamin</FormLabel>
                          <RadioGroup row  aria-label="gender" name="gender">
                            <FormControlLabel
                              value="L"
                              control={<Radio color="primary" />}
                              label="Laki"
                              name="gender"
                              labelPlacement="end"
                              onChange={formik.handleChange}
                            />
                            <FormControlLabel
                              value="P"
                              control={<Radio color="primary" />}
                              label="Perempuan"
                              name="gender"
                              labelPlacement="end"
                              onChange={formik.handleChange}
                            />
                          </RadioGroup>
                          <FormHelperText>{formik.errors.gender ? formik.errors.gender : ''}</FormHelperText>
                        </FormControl>
                      </div>

                      <div className="sm:flex sm:justify-start sm:items-center">
                        <FormControl 
                          className="w-full mt-0 mb-3 sm:mb-0 sm:mr-1 sm:w-1/2" 
                          error={formik.errors.email ? true : false} variant="outlined"
                        >
                            <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-email"
                              onChange={formik.handleChange}
                              value={formik.values.email}
                              name="email"
                              labelWidth={70}
                              label="Email"
                              className="mb-0"
                            />
                            <FormHelperText>{formik.errors.email ? formik.errors.email : ''}</FormHelperText>
                          </FormControl>

                          <FormControl 
                            className="w-full mt-0 mb-3 sm:mb-0 sm:ml-1 sm:w-1/2"
                            error={formik.errors.password ? true : false} variant="outlined"
                          >
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                              id="outlined-adornment-password"
                              type={showPassword ? 'text' : 'password'}
                              onChange={formik.handleChange}
                              value={formik.values.password}
                              name="password"
                              endAdornment={
                                <InputAdornment position="end">
                                  <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                  >
                                    {showPassword ? <ImEye /> : <RiEyeCloseLine />}
                                  </IconButton>
                                </InputAdornment>
                              }
                              labelWidth={70}
                              label="Password"
                              className="mb-0"
                            />
                            <FormHelperText>{formik.errors.password ? formik.errors.password : ''}</FormHelperText>
                          </FormControl>
                      </div>

                      <div className="mt-4 ml-1 text-left flex justify-start items-center">
                        <FormControl className="" error={formik.errors.roles_jobs ? true : false} component="fieldset">
                          <FormLabel component="legend">Daftar Sebagai</FormLabel>
                          <RadioGroup row aria-label="roles_jobs" name="roles_jobs">
                            <FormControlLabel
                              value="recruiter"
                              control={<Radio color="primary" />}
                              label="Perekrut"
                              name="roles_jobs"
                              labelPlacement="end"
                              onChange={formik.handleChange}
                            />
                            <FormControlLabel
                              value="job_seeker"
                              control={<Radio color="primary" />}
                              label="Pencari Kerja"
                              name="roles_jobs"
                              labelPlacement="end"
                              onChange={formik.handleChange}
                            />
                          </RadioGroup>
                          <FormHelperText>{formik.errors.roles_jobs ? formik.errors.roles_jobs : ''}</FormHelperText>
                        </FormControl>
                      </div>

                      <div className="mt-2">
                        <Button variant="contained" fullWidth
                          color="primary"
                          className='focus:outline-none m-2 capitalize'
                          size="large"
                          type="submit"
                          disabled={loadingCircular}
                        >
                          Daftar
                          </Button>
                        {loadingCircular && <CircularProgress size={24} className={classes.buttonProgress} />}
                      </div>
                    </form>


                    <Typography component="div">
                      <Box textAlign="center" m={0}>
                        Sudah punya akun ?
                        <Link to="/login"
                          className="focus:outline-none 
                          text-blue-500 text-sm"
                        > Masuk</Link>
                      </Box>
                    </Typography>

                  </Paper>
                </Grid>
                <Hidden mdDown>
                  <Grid item lg={2}>
                  </Grid>
                </Hidden>
              </Grid>
            </Container>
          </Box>
        </div>
      </ ThemeProvider>
    )
  }
}

export default Register;