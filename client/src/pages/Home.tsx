/* eslint-disable react/jsx-no-target-blank */
/* eslint-disable array-callback-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
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
import { RiQuestionAnswerFill, RiMapPin2Line } from "react-icons/ri";
import { HTTPGetAllJob } from '../utils/http';
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
          lg:grid-cols-lg-4cols-content
          md:grid-cols-md-3cols-content md:my-6 md:mb-24
          xs:grid-cols-2
          xs:grid sm:grid-cols-2
          sm:mt-6
          gap-y-4
          mb-40 mt-6
          h-full
        ">
          {
            dataJob.map((item: any, index: number) => {
              const isExpired = moment().isAfter(item.expiredAt)
              return(
                <div
                  key={`indexPost-${index}`}
                  className="
                  md:my-0
                  sm:my-0 
                  mx-2 
                  mb-4 
                  bg-white 
                  shadow-md 
                  rounded-lg
                  h-full
                  "
                >

                  {/* gambar content */}
                  <div className="h-32 relative rounded-t-lg">
                    {
                      item.image_content !== ''
                      ? 
                      <div className="bg-black h-full w-full rounded-t-lg">
                        <img 
                          src={`${DevUrl}/jobs/${item.image_content}`} 
                          alt=""
                          className="h-full w-full object-cover rounded-t-lg opacity-60"
                        />
                      </div>
                      : 
                      <div className="text-white bg-gradient-to-b from-blue-400 to-blue-500 
                      rounded-t-lg flex items-center justify-center h-full">
                        <div className="font_damion text-4xl opacity-40 ">
                          Cari Gawe
                        </div>
                      </div>
                    }
                  
                    {/* nama user dan tgl postingan */}
                    <div className="absolute bottom-0">
                      <div 
                        className="
                        m-2
                        h-full
                        flex flex-row items-center justify-start
                        mb-2
                      ">    
                        {
                          item.user.photo === ''
                          ? 
                            item.user.gender === 'L'
                            ?
                              <img 
                                src={profilAccountDefault} 
                                alt="foto-profil" 
                                className="h-10 w-10 mr-1 rounded-full shadow-md"
                              />
                            :
                              <img 
                                src={profilAccountDefault2} 
                                alt="foto-profil" 
                                className="h-10 w-10 mr-1 rounded-full shadow-md"
                              />
                          :
                            <img 
                              src={`${DevUrl}/profile/${item.user.photo}`} 
                              alt="foto-profil" 
                              className="h-10 w-10 mr-1 rounded-full shadow-md object-cover"
                            />
                        }
                        <div className="ml-2 mt-0.5">
                          <span className="block font-medium text-base leading-snug text-white dark:text-gray-100">{item.user.name}</span>
                          <span className="block text-xs text-white font-light leading-snug">{moment(item.createdAt).format('DD MMM YYYY HH:mm:ss')}</span>
                        </div>
                      </div>
                    </div>

                    {/* aktif / tidak */}
                    {
                      isExpired === true 
                      ? 
                        <div className="absolute top-0 right-0 p-1 text-white text-sm
                         bg-red-500 rounded-tr-lg">
                          sudah tutup
                        </div>
                      : 
                        <div className="absolute top-0 right-0 p-1 text-white text-sm
                        bg-green-500 rounded-tr-lg">
                          masih buka 
                        </div> 
                    }
                  </div>


                  {/* grid grid-rows-lg-7rows-home-list-job */}
                  <div className="mt-0 p-2">
                    <div className="flex flex-col justify-start mb-2">
                      <div className="text-md uppercase font-bold line-clamp-1">
                        {item.title}
                      </div> 
                      <div className="text-sm flex flex-row items-center">
                        <RiMapPin2Line /> {item.city}
                      </div>
                    </div>
                    <hr/>
                    
                    {/* isi postingan */}
                    <div className="mt-2 overflow-hidden w-full">
                      <div id={`text-loker-${index}`} 
                      className="text-base line-clamp-3
                      ">
                        {
                          parse(item.content)
                        }
                      </div>
                    </div>
                    
                    {/* button read more*/}
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

                    {/* button like & comment*/}
                  </div>

                </div>
              )
            })
          }
        </div>
      }
    </div>
  )
}

const JobSeeker = ({dataJob, isLoading}: any) => {
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
        <div className="md:flex md:justify-between md:items-start">
          {/* search job */}
          <div className="md:w-3/12 md:block hidden" id="searchJobId">
            <div className="relative h-auto bg-white shadow-md rounded-lg p-2 my-8 ml-2">
              <div className="bg-blue-100 text-blue-500 font-bold rounded text-center p-2 shadow-inner">
                Cari loker
              </div>
              <input className="
                mt-4
                w-full h-12 py-2 bg-transparent
                border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                type="" placeholder="Posisi pekerjaan.." 
              />

              {/* <div className=" text-xs text-gray-500 mb-1">Kota</div> */}

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

              <button className=" bg-gradient-to-bl from-blue-400 to-blue-500 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400 relative z-0 text-sm 
              rounded-lg text-white shadow-blue mt-4 w-full py-2 px-4 mb-2 no-underline focus:outline-none">
                <AiOutlineSearch className="absolute left-8 text-lg" />   Cari
              </button>
            </div>
          </div>
          
          {/* list job */}
          {/* border-gray-100  bg-gray-100 
          border-l-2 border-r-2  */}
          <div className={`
            md:w-3/6
            md:py-8
            md:px-6 
            sm:mt-0
            px-4
            pt-8
            pb-20
            h-full
          `}>
            {
              dataJob.map((item: any, index: number) => {
              const isExpired = moment().isAfter(item.expiredAt)
                return (
                  <div
                    key={`indexPostJobSeeker-${index}`}
                    className="
                    mb-6 
                    bg-white 
                    shadow-md 
                    rounded-lg 
                    w-full h-auto
                    "
                  >
                    {/* image content */}
                    <div className="h-40 relative bg-black rounded-t-lg">
                      {
                        item.image_content !== ''
                        ? 
                        <img 
                          src={`${DevUrl}/jobs/${item.image_content}`} 
                          alt=""
                          className="h-full w-full object-cover rounded-t-lg opacity-60"
                        />
                        : 
                        <div className="text-white bg-gradient-to-b from-blue-400 
                        to-blue-500  rounded-t-lg flex items-center justify-center h-full">
                        <div className="font_damion text-4xl opacity-40 ">
                          Cari Gawe
                        </div>
                      </div>
                      }
                    
                      {/* nama user dan tgl postingan */}
                      <div className="absolute bottom-0 w-full">
                          <div className=" m-2 h-full flex flex-row items-center 
                          justify-start mb-2">    
                            {
                              item.user.photo === ''
                              ? 
                                item.user.gender === 'L'
                                ?
                                  <img 
                                    src={profilAccountDefault} 
                                    alt="foto-profil" 
                                    className="h-12 w-12 mr-1 rounded-full shadow-md"
                                  />
                                :
                                  <img 
                                    src={profilAccountDefault2} 
                                    alt="foto-profil" 
                                    className="h-12 w-12 mr-1 rounded-full shadow-md"
                                  />
                              :
                                <img 
                                  src={`${DevUrl}/profile/${item.user.photo}`} 
                                  alt="foto-profil" 
                                  className="h-12 w-12 mr-1 rounded-full shadow-md object-cover"
                                />
                            }
                            <div className="ml-2 mt-0.5">
                              <span className="block font-medium text-base leading-snug text-white dark:text-gray-100">{item.user.name}</span>
                              <span className="block text-sm text-white font-light leading-snug">{moment(item.createdAt).format('DD MMM YYYY HH:mm:ss')}</span>
                            </div>
                          </div>
                      </div>
                    
                      {/* aktif / tidak */}
                      {
                        isExpired === true 
                        ? 
                          <div className="absolute top-0 right-0 p-1 text-white text-sm
                          bg-red-500 rounded-tr-lg">
                            sudah tutup
                          </div>
                        : 
                          <div className="absolute top-0 right-0 p-1 text-white text-sm
                          bg-green-500 rounded-tr-lg">
                            masih buka 
                          </div> 
                      }
                    </div>

                    <div className="mt-0 ">
                      <div className="flex flex-col justify-start p-2">
                        <div className="text-md uppercase font-bold line-clamp-1">
                          {item.title}
                        </div> 
                        <div className="text-sm flex flex-row items-center mb-2">
                          <RiMapPin2Line /> {item.city}
                        </div>
                        <hr/>
                      </div>
                    
                      {/* isi postingan */}
                      <div className="overflow-hidden w-full px-2">
                        <div id={`text-loker-${index}`} 
                        className="text-base line-clamp-3
                        ">
                          {
                            parse(item.content)
                          }
                        </div>
                      </div>
                      
                      {/* button read more*/}
                      <div className="px-2">
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

                      {/* button like & comment*/}
                      <div className="grid grid-cols-2 border-t border-gray-200 mt-6 bg-transparent">
                        <button className="flex flex-row justify-center items-center py-2 bg-gray-50 hover:bg-gray-100 focus:outline-none rounded-bl-lg">
                          <AiFillLike className="text-blue-500 text-md" />
                          <div className="ml-1 text-sm text-gray-500  font-semibold">
                            20 suka
                          </div>
                        </button>
                        <button className="flex flex-row justify-center items-center py-2 bg-gray-50 hover:bg-gray-100 focus:outline-none rounded-br-lg">
                          <RiQuestionAnswerFill className="text-blue-500 text-md"/>
                          <div className="ml-1 text-sm text-gray-500 font-semibold ">
                            20 komentar
                          </div>
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })
            } 
          </div>

          {/* job terpopuler */}
          <div className="md:w-3/12 md:block hidden" id="searchJobId">
            <div className="relative h-auto bg-white shadow-md rounded-lg p-2 my-8 mr-2">
              <div className="bg-blue-100 text-blue-500 font-bold rounded text-center p-2 shadow-inner line-clamp-1">
                Lowongan terpopuler
              </div>
            </div>
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

  useEffect(() => {
    
    document.title = 'Cari Gawe - Beranda'
    httpGetAllJob()
  }, [])
  
  // Get room and users
  socket.on('roomUsers', ({ room, users }: any) => {
    console.log(users)
  });

  // get new data job
  socket.on('getNewDataJob', (data: any) => {
    // toast('ada lowongan terbaru nih', {
    //   position: "bottom-right",
    //   autoClose: 5000,
    //   type: 'info',
    //   hideProgressBar: false,
    //   closeOnClick: true,
    //   pauseOnHover: true,
    //   transition: Slide
    // })
    console.log('ada lowongan terbaru nih')
    setdataJob(data)
  })

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
      <>
        <Header sudahDiPage="home" actionSearchJob={eventSearchJob}/>

        {/* <button onClick={props.handleLogin}>Log In</button> */}
        {
          userRedux.profile.recruiter
          ? <Recruiter dataJob={dataJob} isLoading={isLoading}/>
          : <JobSeeker dataJob={dataJob} isLoading={isLoading} />
        }

        <Footer />
      </>
    )
  }
}

export default Home;