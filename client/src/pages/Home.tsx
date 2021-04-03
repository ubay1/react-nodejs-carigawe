/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useMemo, useReducer, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import '../styles/pulse.css';
import Moment from 'moment'
import LoadingGif from '../assets/loading.gif';
import { dataKota } from '../utils/interface';
import '../styles/global.css';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/rootReducer';
import { AppDispatch } from '../store';
import Lottie from 'lottie-react';
import LoadingScreen from '../assets/loading_screen.json';
import { setLoadingScreenHome } from '../store/loadingScreenHome';
// initialStateUserAuthByAsync, 
import { initialStateUserAuthByAsync, UserState } from '../store/user';
import { TitleComponent } from '../components/TitleComponent';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AiOutlineSearch, AiFillHeart,AiFillLike, } from "react-icons/ai";
import { RiQuestionAnswerFill, RiMapPin2Line, RiHeartLine, RiHeartFill } from "react-icons/ri";
import { HTTPGetAllJob, HTTPGetAllJobSocket, HTTPGetAllJobSocketUser, HTTPLikeJob, HTTPUnlikeJob } from '../utils/http';
import parse from 'html-react-parser';
import EmptyData from '../components/EmptyData'
import './home.css'
import moment from 'moment';
import profilAccountDefault from '../assets/avatar3.png'
import profilAccountDefault2 from '../assets/avatar6.png'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Cookies from 'js-cookie';
import socket from '../utils/socket'
import { Slide, toast } from 'react-toastify';
import { DevUrl } from '../utils/helper';
import { CobaContext } from '../components/CobaContext';
import classes from '*.module.css';
import { Avatar, Badge, Box, Button, Card, CardActions, CardContent, CardHeader, CardMedia, CircularProgress, createMuiTheme, createStyles, Divider, Fab, IconButton, InputAdornment, makeStyles, TextField, Theme, ThemeProvider, Tooltip, Typography, Zoom } from '@material-ui/core';
// import AvatarGroup from '@material-ui/lab/AvatarGroup';
// import { initState, reducer } from '../components/CobaReducer';
import { MdForum, MdLaptopMac, MdThumbUp } from "react-icons/md";
import { GrUserWorker } from "react-icons/gr";
import { blue } from '@material-ui/core/colors';
import { MdMoreVert, MdFavoriteBorder, MdFavorite } from "react-icons/md";

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
    }
  },
});

const Recruiter = ({dataJob, isLoading}: any): any => {
  return(
    <div className="relative top-16">
      {
        isLoading === true
        ? 
          <div className="flex items-center justify-center mb-14">
            <Loader
              type="Rings"
              color="#00BFFF"
              height={100}
              width={100}
              // timeout={3000} //3 secs
            />
          </div>
        :
        dataJob.length === 0
        ? 
        <div
          className="
            h-screen-8
            flex flex-col items-center justify-center
          "
        >
          <EmptyData />
        </div>
        :
        <div className=" 
          lg:grid-cols-lg-3cols-content
          md:grid-cols-lg-2cols-content md:my-6 md:mb-24
          sm:grid-cols-1
          xs:grid-cols-1
          xs:grid
          sm:mt-6
          gap-y-4
          mb-40 mt-6
          h-full
        ">
          {
            dataJob.map((item: any, index: number) => {
              const isExpired = moment().isAfter(item.expiredAt)
              return(
                <Card className="mb-2 mx-2" key={index}>
                  <CardHeader
                    avatar={
                      item.photo !== ''
                        ?
                        <Avatar aria-label="recipe" src={`${DevUrl}/profile/${item.user.photo}`} />
                        :
                        <Avatar aria-label="recipe" className="bg-red-500">
                          {
                            item.user.name.slice(0, 1)
                          }
                        </Avatar>
                    }

                    action={
                      isExpired === true
                        ?
                        <div className="text-white text-xs bg-red-500 p-2 mt-3 rounded-sm shadow">
                          sudah tutup
                        </div>
                        :
                        <div className="text-white text-xs bg-green-500 p-2 mt-3 rounded-sm shadow">
                          masih buka
                        </div>
                    }

                    title={item.user.name.charAt(0).toUpperCase() + item.user.name.slice(1)}
                    subheader={moment(item.createdAt).format('MMM DD, YYYY')}
                  />

                  {
                    item.image_content !== ''
                      ?
                      <CardMedia
                        className="h-36"
                        image={`${DevUrl}/jobs/${item.image_content}`}
                        title={`Loker ${item.title}`}
                      />
                      :
                      <div className="text-white bg-gradient-to-b from-blue-400 
                        to-blue-500  rounded-t-lg flex items-center justify-center h-full">
                        <div className="font_damion text-4xl opacity-40 ">
                          Cari Gawe
                          </div>
                      </div>
                  }


                  {/* grid grid-rows-lg-7rows-home-list-job */}
                  <CardContent>
                    <Typography color="textPrimary" component="div" className="flex items-center justify-between">
                      <div className="flex items-center justify-start line-clamp-1">
                        <div className="text-xl font-semibold">{item.title}</div>
                      </div>
                    </Typography>
                    <div className="flex items-center justify-start text-sm rounded-sm mb-1">
                      <RiMapPin2Line /> {item.city}
                    </div>
                    <Divider className="mb-2" />
                    <Typography variant="body2" color="textSecondary" component="div" className="line-clamp-3">
                      {
                        parse(item.content)
                      }
                    </Typography>
                    <div className="">
                      <button id={`btn-readmore-${index}`} className="
                          text-xs p-1 rounded
                          text-blue-500 
                          bg-blue-100
                          focus:outline-none
                          hover:shadow-inner
                          "
                        onClick={() => {
                        }}
                      >
                        Lihat selengkapnya
                          </button>
                    </div>
                  </CardContent>

                </Card>
              )
            })
          }
        </div>
      }
    </div>
  )
}

const JobSeeker = ({dataJob, isLoading, token, profile}: any) => {
  const {totalLike, setTotalLike}= useContext(CobaContext)
  // const [count, dispatch]= useReducer(reducer, initState)
  const [loadingCircular, setLoadingCircular] = React.useState(false);
  const classes = useStyles();
  const history = useHistory();

  const httpLikeJob = async (job_id: any, user_id?: any) => {
    try {
      const responseLikeJob = await HTTPLikeJob({
        token: token,
        job_id: job_id
      })
      const responseGetAllJobSocket = await HTTPGetAllJobSocket()
      const responseGetAllJobSocketUser = await HTTPGetAllJobSocketUser({
        token: token
      })
    } catch (error) {
      toast('Silahkan login terlebih dahulu', {
        position: "bottom-right",
        autoClose: 5000,
        type: 'error',
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        transition: Slide
      })
      history.push('/login')
      // console.log(error)
    }
  }

  const httpUnlikeJob = async (like_id: any) => {
    try {
      const responseLikeJob = await HTTPUnlikeJob({
        token: token,
        like_id: like_id
      })
      const responseGetAllJobSocket = await HTTPGetAllJobSocket()
      const responseGetAllJobSocketUser = await HTTPGetAllJobSocketUser({
        token: token
      })
    } catch (error) {
      console.log(error)
    }
  }

  return( 
    <div className="relative top-12">
      {
        isLoading === true
        ? 
          <div className="flex items-center justify-center mb-14">
            <Loader
              type="Rings"
              color="#00BFFF"
              height={100}
              width={100}
              // timeout={3000} //3 secs
            />
          </div>
        :
        dataJob.length === 0
        ? 
        <div
          className="
            h-screen-8
            flex flex-col items-center justify-center
          "
        >
          <EmptyData />
        </div>
        :
        <div className="md:flex md:justify-between md:items-start">
          {/* search job */}
          <div className="md:w-3/12 md:block hidden fixed" id="searchJobId">
            <Box height="100vh" className="bg-white">
              <Card className="mt-4 h-full" square={true}>
                <CardContent>
                  <Typography className="bg-blue-100 text-blue-500 font-bold rounded text-center p-2 shadow-inner" gutterBottom>
                    Cari Loker
                  </Typography>

                  <TextField
                    color="primary"
                    variant="standard"
                    fullWidth
                    className="my-2"
                    id="input-with-icon-textfield"
                    label="Posisi Pekerjaan"
                    size="small"
                    placeholder="programmer .."
                  />

                  <div className="z-10 relative mt-4">
                    <Typeahead
                      id="domisili"
                      placeholder="Kota.."
                      onChange={(selected) => {
                        console.log(selected)
                        // setvalueKota(selected[0].label.toLowerCase())
                      }}
                      options={dataKota}
                    // defaultInputValue={valueKota}
                    />
                  </div>

                  <div className="mt-2 relative">
                    <Button variant="contained" fullWidth
                      color="primary"
                      className='focus:outline-none  capitalize'
                      size="large"
                      type="submit"
                      disabled={loadingCircular}
                    // onClick={handleButtonClick}
                    >
                      Cari
                      </Button>
                    {loadingCircular &&
                      <CircularProgress
                        size={24}
                        className={classes.buttonProgress}
                      />
                    }
                  </div>
                </CardContent>
              </Card>
            </Box>
          </div>
          
          {/* list job */}
          <div className={`
            md:w-3/6
            md:py-8
            md:px-6 
            sm:mt-0
            px-4
            pt-8
            pb-20
            h-full
            m-auto
          `}>
            {
              dataJob.map((item: any, index: number) => {
                const isExpired = moment().isAfter(item.expiredAt)
                return (
                  <Card className="mb-4" key={index}>
                    <CardHeader
                      avatar={
                        item.photo !== ''
                        ?
                        <Avatar aria-label="recipe" src={`${DevUrl}/profile/${item.user.photo}`} />
                        :
                        <Avatar aria-label="recipe" className="bg-red-500">
                          {
                            item.user.name.slice(0,1)
                          }
                        </Avatar>
                      }

                      action={
                        isExpired === true
                        ?
                        <div className="text-white text-xs bg-red-500 p-2 mt-3 rounded-sm shadow">
                          sudah tutup
                        </div>
                        :
                        <div className="text-white text-xs bg-green-500 p-2 mt-3 rounded-sm shadow">
                          masih buka
                        </div>
                      }
                      
                      title={item.user.name.charAt(0).toUpperCase() + item.user.name.slice(1)}
                      subheader={moment(item.createdAt).format('MMM DD, YYYY')}
                    />
                    {
                      item.image_content !== ''
                        ?
                        <CardMedia
                          className="h-52"
                          image={`${DevUrl}/jobs/${item.image_content}`}
                          title={`Loker ${item.title}`}
                        />
                        :
                        <div className="text-white bg-gradient-to-b from-blue-400 
                        to-blue-500  rounded-t-lg flex items-center justify-center h-full">
                          <div className="font_damion text-4xl opacity-40 ">
                            Cari Gawe
                          </div>
                        </div>
                    }
                    <CardContent>
                      <Typography color="textPrimary" component="div" className="flex items-center justify-between">
                        <div className="flex items-center justify-start line-clamp-1">
                          <div className="text-xl font-semibold">{item.title}</div> 
                        </div>
                        {
                          token !== '' ?
                            item.likes.length !== 0 ?
                              item.likes.map((itemLike: any, index: number) => {
                                // console.log(profile)
                                if (itemLike.user.name === profile.name) {
                                  return (
                                    <Fab size="small" className="focus:outline-none bg-transparent shadow-none hover:bg-gray-100"
                                      key={index}
                                      onClick={()=>{
                                        httpUnlikeJob(itemLike.like_id)
                                      }}
                                    >
                                      <MdFavorite size={24} color="red" />
                                    </Fab>
                                  )
                                }
                              })
                              :
                              <Fab size="small" className="focus:outline-none bg-transparent shadow-none hover:bg-gray-100"
                                onClick={() => {
                                  httpLikeJob(item.id)
                                }}
                              >
                                <MdFavorite size={24} color="grey" />
                              </Fab>
                            :
                            <Fab size="small" className="focus:outline-none bg-transparent shadow-none hover:bg-gray-100"
                              onClick={() => {
                                httpLikeJob(item.id)
                              }}
                            >
                              <MdFavorite size={24} color="grey" />
                            </Fab>
                        }
                      </Typography>
                      <div className="flex items-center justify-start text-sm rounded-sm mb-1">
                        <RiMapPin2Line /> {item.city}
                      </div>
                      <Divider className="mb-2" />
                      <Typography variant="body2" color="textSecondary" component="div" className="line-clamp-3">
                        {
                          parse(item.content)
                        }
                      </Typography>
                      <div className="">
                        <button id={`btn-readmore-${index}`} className="
                          text-xs p-1 rounded
                          text-blue-500 
                          bg-blue-100
                          focus:outline-none
                          hover:shadow-inner
                          "
                          onClick={() => {
                          }}
                        >
                          Lihat selengkapnya
                          </button>
                      </div>
                    </CardContent>
                    <CardActions>
                      <div className="bg-gradient-to-bl from-blue-400 to-blue-500 p-1 ml-2 rounded-full">
                        <MdThumbUp className=" text-white text-xs "/>
                      </div>
                      {
                        token !== '' ?
                          item.likes.length === 0 ?
                            <p className="text-xs">0 orang menyukai</p>
                          :
                          item.likes.length === 1 ?
                            item.likes.map((itemLike: any, index: number) => {
                              if (itemLike.user.name === profile.name) {
                                return(
                                  <p key={index} className="text-xs">Anda menyukai</p>
                                )
                              } else {
                                return(
                                  <p className="text-xs">1 orang menyukai</p>
                                )
                              }
                            })
                          : item.likes.map((itemLike: any, index: number) => {
                              if (itemLike.user.name === profile.name) {
                                return (
                                  <p key={index} className="text-xs">Anda dan {item.likes.length - 1} menyukai</p>
                                )
                              } else {
                                return (
                                  <p className="text-xs">{item.likes.length} orang menyukai</p>
                                )
                              }
                            })
                        : 
                        <p className="text-xs">{item.likes.length} orang menyukai</p>
                      }
                    </CardActions>
                  </Card>
                )
              })
            }
          </div>

          {/* job terpopuler */}
          <div className="md:w-3/12 md:block hidden fixed right-0" id="searchJobId">
            <Box height="100vh" className="bg-white">
              <Card className="mt-4 h-full" square={true}>
                <CardContent>
                  <Typography className="bg-blue-100 text-blue-500 font-bold rounded text-center p-2 shadow-inner" gutterBottom>
                    Lowongan terpopuler
                  </Typography>  
                </CardContent>
              </Card>
            </Box>
          </div>
        </div>
      }
    </div>
  )
}

const Home = (props: any) => {
  toast.configure()
  const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
  const userRedux = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()

  const yearNow = Moment(new Date()).format('YYYY');

  const [valueKota, setvalueKota] = useState('');
  const [isLoading, setisLoading] = useState(true)
  const [dataRecruiter, setdataRecruiter] = useState<any[]>([]);
  const [dataJob, setdataJob] = useState<any[]>([]);

  const {totalLike, setTotalLike}= useContext(CobaContext)
  
  useEffect(() => {
    document.title = 'Cari Gawe - Beranda'
    httpGetAllJob()
  }, [])

  useEffect(() => {
    // get new data job
    socket.on('getNewDataJob', (data: any) => {
      console.log('ada lowongan terbaru nih')
      setdataJob(data)
    })
    // Get room and users
    socket.on('roomUsers', ({ room, users }: any) => {
      console.log(users)
    });
    return () => {
      socket.off('getNewDataJob')
      socket.off('roomUsers')
    }
  }, [socket])

  const httpGetAllJob = async () => {
    try {
      const responseGetAllJob = await HTTPGetAllJob()
      setdataJob(responseGetAllJob.data.data)
      // setTimeout(() => {
        setisLoading(false)
      // }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  /**********************************************
   *  function berjalan ketika di smartphone, *
   *  akan menampilkan pencarian pekerjaan    *
   **********************************************/
  function eventSearchJob(data: any) {
    var el = document.getElementById('searchJobId')
    el?.classList.toggle('hidden')
  }

  useEffect(() => {
    // console.log(valueKota)
  }, [valueKota])

  useEffect(() => {
    if (userRedux.token !== '') {
      // console.log('ada token di home = ', userRedux.token)
      setTimeout(() => {
        dispatch(setLoadingScreenHome({
          show: false
        }))
      }, 2000)
    } else {
      // console.log('gaada token di home')
      initialStateUserAuthByAsync(dispatch)
      setTimeout(() => {
        dispatch(setLoadingScreenHome({
          show: false
        }))
      }, 2000)
    }
  }, [dispatch, userRedux.token])

  if (loadingScreenHomeRedux.show === true) {
    return (
      <div className="flex items-center justify-center flex-col h-screen">
        <Lottie animationData={LoadingScreen} style={{ width: 200 }} />
      </div>
    )
  } else {
    return (
      <ThemeProvider theme={theme}>
        <Header sudahDiPage="home" actionSearchJob={eventSearchJob}/>

        {/* <button onClick={props.handleLogin}>Log In</button> */}
        {
          userRedux.profile.recruiter
          ? <Recruiter dataJob={dataJob} isLoading={isLoading}/>
          : <JobSeeker dataJob={dataJob} isLoading={isLoading} profile={userRedux.profile} token={userRedux.token}/>
        }

        <Footer />
      </ThemeProvider>
    )
  }
}

export default Home;