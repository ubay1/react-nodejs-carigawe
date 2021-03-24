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
import { HTTPGetUser, HTTPLoginUser } from '../../utils/http';
import Cookies from 'js-cookie';
// initialStateUserAuthByAsync
import { initialStateUserAuthByAsync, setAuthStatus, setReduxUsersProfile } from '../../store/user';
import { RootState } from '../../store/rootReducer';
import { setLoadingScreenHome } from '../../store/loadingScreenHome';
import Lottie from 'lottie-react';
import LoadingScreen from '../../assets/loading_screen.json';
import socket from '../../utils/socket'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, TextField, Paper, Grid, Box, Container, Hidden, Typography, FilledInput, FormControl, InputAdornment, InputLabel, OutlinedInput, IconButton, Divider, createMuiTheme, ThemeProvider, CircularProgress, FormHelperText} from '@material-ui/core';
import { ImEye } from "react-icons/im";
import { RiEyeCloseLine} from "react-icons/ri";
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
      left: '50%',
      marginTop: 10,
      // marginLeft: '48%',
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

const Login = () => {
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
    document.title = 'Cari Gawe - Masuk'
    setTimeout(() => {
      dispatch(setLoadingScreenHome({
        show: false
      }))
    }, 2000)
  }, [])

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: values => {
      // console.log(JSON.stringify(values, null, 2));
      httpLoginUser(values)
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("format email tidak sesuai")
        .required("email wajib diisi"),
      password: Yup.string()
        .required("password wajib diisi"),
    })
  });

  const httpLoginUser = async (params: any) => {
    try {
      dispatch(setLoading({
        show: true,
        timeout: 300000
      }))
      setSuccess(false);
      setLoadingCircular(true);
      
      const responseLoginUser = await HTTPLoginUser({
        email: params.email,
        password: params.password,
      })

      if (responseLoginUser.status === 200) {

        const responseGetUser = await HTTPGetUser({
          token: responseLoginUser.data.accessToken
        })

        dispatch(setAuthStatus({
          token: responseLoginUser.data.accessToken
        }))

        dispatch(setReduxUsersProfile({
          id: responseGetUser.data.data.id,
          email: responseGetUser.data.data.email,
          email_verif: responseGetUser.data.data.email_verif,
          job_seeker: responseGetUser.data.data.job_seeker,
          recruiter: responseGetUser.data.data.recruiter,
          name: responseGetUser.data.data.name,
          phone: responseGetUser.data.data.phone,
          photo: responseGetUser.data.data.photo,
          background_image: responseGetUser.data.data.background_image,
          gender: responseGetUser.data.data.gender,
        }))

        setTimeout(() => {
          dispatch(setLoading({
            show: false,
            timeout: 0
          }))
          setSuccess(true);
          setLoadingCircular(false);
          toast(responseLoginUser.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            type: 'success',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            transition: Slide
          })
          history.push('/')
        }, 2000)

        // Join chatroom
        const username = responseGetUser.data.data.name
        const room = 'room_beranda'
        socket.emit('joinRoom', { username, room });
        // socket.on('roomUsers', ({ room, users }: any) => {
        //   console.log(users)
        // });

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
          <Box height="100vh" display="flex" flexDirection="column" justifyContent="center">
            <Container>
              <Grid container spacing={2}
                direction="row"
                justify="center"
                alignItems="center"
              >
                <Hidden xsDown only="sm">
                  <Grid item xs={12} sm={6} md={6} lg={6}>
                    {/* <Paper className={classes.paper}> */}
                    <AnimationAuth />
                    {/* </Paper> */}
                  </Grid>
                </Hidden>
                <Grid item xs={12} sm={12} md={6} lg={4}>
                  <Paper className="p-6 text-center rounded-xl" square={true} elevation={3}>
                    <Typography component="div">
                      <Box textAlign="center" mb={2}>
                        <Link to="/" 
                          className="focus:outline-none 
                          font_damion text-5xl text-blue-600 font-semibold"
                        >Cari Gawe</Link>
                      </Box>
                    </Typography>
                    <form onSubmit={formik.handleSubmit} noValidate autoComplete="on">
                      <FormControl className="mb-3 mt-2" error={formik.errors.email ? true : false} variant="outlined" fullWidth>
                        <InputLabel htmlFor="outlined-adornment-email">Email</InputLabel>
                        <OutlinedInput
                          id="outlined-adornment-email"
                          onChange={formik.handleChange}
                          value={formik.values.email}
                          name="email"
                          labelWidth={70}
                          label="Email"
                          className="mb-3"
                        />
                        <FormHelperText>{formik.errors.email ? formik.errors.email : ''}</FormHelperText>
                      </FormControl>
                      
                      <FormControl className="mb-3" error={formik.errors.password ? true : false} variant="outlined" fullWidth>
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
                        />
                        <FormHelperText>{formik.errors.password ? formik.errors.password : ''}</FormHelperText>
                      </FormControl>
                
                      <div className="mt-2 relative">
                          <Button variant="contained" fullWidth
                            color="primary"
                            className='focus:outline-none  capitalize'
                            size="large"
                            type="submit"
                            disabled={loadingCircular}
                            // onClick={handleButtonClick}
                          >
                            Masuk
                          </Button>
                        { loadingCircular &&
                          <CircularProgress 
                            size={24}
                            className={classes.buttonProgress}
                          />
                        }
                      </div>
                    </form>


                    <Typography component="div">
                      <Box textAlign="center" m={1}>
                        <Link to="/"
                          className="focus:outline-none 
                          text-blue-500 text-sm"
                        >Lupa Kata Sandi ?</Link>
                      </Box>
                    </Typography>
                    <Divider />
                    <div className="mt-2">
                      <Link to="/register">
                        <Button variant="contained" color="secondary"
                          className='focus:outline-none m-2 capitalize'
                          style={{
                            color: '#fff'
                          }}
                          size="large"
                          type="submit"
                        >
                          Buat Akun
                        </Button>
                      </Link>
                    </div>

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

export default Login;