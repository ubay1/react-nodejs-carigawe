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
          md:grid-cols-md-3cols-content md:my-4 md:mb-24
          xs:grid-cols-2
          xs:grid sm:grid-cols-2
          sm:mt-4
          gap-y-4
          mb-40 mt-6
        ">
          {
            dataJob.map((item: any, index: number) => {
              const isExpired = moment().isAfter(item.expiredAt)
              return(
                <div
                  key={`indexPost-${index}`}
                  className="
                  sm:my-2 
                  mx-2 mb-4 
                  bg-white shadow rounded-lg
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
                          src={item.image_content} 
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
                              src={item.user.photo} 
                              alt="foto-profil" 
                              className="h-10 w-10 mr-1 rounded-full shadow-md"
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
                    <div className="mt-3 overflow-hidden w-full">
                      <div id={`text-loker-${index}`} 
                      className="text-xs line-clamp-3
                      ">
                        {
                          parse(item.content)
                        }
                      </div>
                    </div>
                    
                    {/* button read more*/}
                    <div className="">
                      <button id={`btn-readmore-${index}`} className="
                        text-blue-500 text-xs underline
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
          <div className="md:w-3/12 hidden md:block" id="searchJobId">
            <div className="relative h-auto my-8 mx-2">
              {/* <div className=" text-xs text-gray-500 mb-1">
                Posisi Pekerjaan
              </div> */}
              <input className="w-full h-12 py-2 
            border-b border-gray-300 focus:outline-none focus:border-blue-500" type="" placeholder="Posisi pekerjaan.." />

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
              rounded-lg text-white shadow mt-2 w-full py-2 px-4 no-underline">
                <AiOutlineSearch className="absolute left-8 text-lg" />   Cari
              </button>
            </div>
          </div>
          
          {/* list job */}
          <div className={`
            px-6 py-8
            border-l-2 border-r-2 border-gray-100 
            bg-gray-50 
            h-full
            md:w-3/6
            sm:mt-0
          `}>
            {
              dataJob.map((item: any, index: number) => {
              const isExpired = moment().isAfter(item.expiredAt)
                return (
                  <div
                    key={`indexPostJobSeeker-${index}`}
                    className="mb-6 bg-white dark:bg-gray-800 shadow rounded-lg w-full h-auto
                    "
                  >
                    {/* image content */}
                    <div className="h-40 relative bg-black rounded-t-lg">
                      {
                        item.image_content !== ''
                        ? 
                        <img 
                          src={item.image_content} 
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
                                  src={item.user.photo} 
                                  alt="foto-profil" 
                                  className="h-12 w-12 mr-1 rounded-full shadow-md"
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
                    <div className="mt-3 overflow-hidden w-full">
                      <div id={`text-loker-${index}`} 
                      className="text-xs line-clamp-3
                      ">
                        {
                          parse(item.content)
                        }
                      </div>
                    </div>
                    
                    {/* button read more*/}
                    <div className="">
                      <button id={`btn-readmore-${index}`} className="
                        text-blue-500 text-xs underline
                        "
                        onClick={() => {
                        }}
                        >
                          Lihat selengkapnya
                      </button>
                    </div>

                      {/* button like & comment*/}
                      <div className="flex justify-between items-center mt-5 mb-2 ">
                        <div className="flex flex-row items-center">
                          <AiFillLike className="text-blue-500 text-md cursor-pointer" />
                          <div className="ml-1 text-sm text-gray-500  font-light">
                            0
                          </div>
                        </div>
                        <div className="flex flex-row items-center">
                          <RiQuestionAnswerFill className="text-blue-500 text-md cursor-pointer" />
                          <div className="ml-1 text-sm text-gray-500 dark:text-gray-400 font-light ">
                            0
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            } 
          </div>

          {/* job terpopuler */}
          <div className="md:w-3/12">
            <div className="relative h-auto my-8 mx-2">
              ini populer job
            </div>
          </div>
        </div>
      }
    </div>
  )
}

const Home = (props: any) => {
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

  // function berjalan ketika di smartphone,
  // akan menampilkan pencarian pekerjaan
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