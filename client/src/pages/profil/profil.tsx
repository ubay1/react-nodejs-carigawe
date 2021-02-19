/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { AppDispatch } from '../../store'
import { setLoadingScreenHome } from '../../store/loadingScreenHome'
import { setPageActive } from '../../store/pageActive'
import { RootState } from '../../store/rootReducer'
// import { initialStateUserAuthByAsync } from '../../store/user'
import Lottie from 'lottie-react';
import LoadingScreen from '../../assets/loading_screen.json';
import profilAccountDefault from '../../assets/avatar3.png';
import profilAccountDefault2 from '../../assets/avatar6.png';
import { HTTPGetAllJob, HTTPGetAllJobUser } from '../../utils/http'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import moment from 'moment'
import parse from 'html-react-parser';
import { AiFillHeart, AiFillLike } from 'react-icons/ai'
import { RiMapPin2Line, RiQuestionAnswerFill } from 'react-icons/ri'
import EmptyData from '../../components/EmptyData'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { initialStateUserAuthByAsync } from '../../store/user'

const AllPost = ({dataJob, isLoading}: any): any => {
  // console.log(dataJob) 
  return(
    <div>
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
              mb-20
            "
          >
            <EmptyData />
          </div>
        :
        <div className=" 
          lg:grid-cols-lg-4cols-content
          md:grid-cols-md-3cols-content md:my-4 md:mb-10
          xs:grid-cols-2
          xs:grid sm:grid-cols-2
          sm:mt-4
          gap-y-4
          mb-24 mt-6
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
                  <div className="h-32 relative bg-black rounded-t-lg">
                    {
                      item.image_content !== ''
                      ? 
                      <img 
                        src={item.image_content} 
                        alt=""
                        className="h-full w-full object-cover rounded-t-lg opacity-60"
                      />
                      : ''
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


                  {/* grid grid-rows-lg-7rows-home-list-job */}
                  <div className="mt-2 p-2">
                      <div className="flex flex-col justify-start">
                        <div className="text-md uppercase font-bold line-clamp-1">
                          {item.title}
                        </div> 
                        <div className="text-sm flex flex-row items-center">
                          <RiMapPin2Line /> {item.city}
                        </div>
                      </div>
                    
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

                    {/* batas pengiriman */}
                    {/* <div className="mt-4 w-full">
                      <p className="text-gray-400 text-xs">kirimkan lamaran sebelum:</p>
                      <p className="font-bold  text-sm">{moment(item.expiredAt).format('YYYY-MM-DD HH:mm:ss')}</p>
                    </div> */}

                    {/* penempatan kerja */}
                    {/* <div className="mb-4 mt-2 w-full">
                      <p className="text-gray-400 text-xs">penempatan</p>
                      <p className="font-bold text-sm">{item.city}</p>
                    </div> */}
                    
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

                  {/* button like & comment*/}
                  <div className="flex justify-between items-center mt-2 mb-2 pb-4 xs:pb-0 px-4">
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
              )
            })
          }
        </div>
      }
    </div>
  )
}

const Profil = () => {
  const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
  const userRedux = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory();

  const [allPostJob, setallPostJob] = useState<any[]>([])
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    document.title = 'Cari Gawe - Profil'
    dispatch(setPageActive({ispage: 'profil'}))
  }, [])

  const httpGetAllJobUser = async (token: string) => {
    try {
      const responseGetAllJobUser = await HTTPGetAllJobUser({
        token: token
      })
      setallPostJob(responseGetAllJobUser.data.data)
      // setTimeout(() => {
        setisLoading(false)
      // }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (userRedux.token !== '') {
      // console.log('ada token di home = ', userRedux.token)
      httpGetAllJobUser(userRedux.token)
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
    return(
        <div className="flex items-center justify-center flex-col h-screen">
            <Lottie  animationData={LoadingScreen} style={{width: 200}} />
        </div>
    )
  } else {
    return (
      <>
        <Header sudahDiPage="profil" />

        <div className="relative top-16">
          <div className="bg-blue-100 h-full py-6 flex flex-col items-center justify-center">
            {
              userRedux.profile.photo === ''
              ?
                userRedux.profile.gender === 'L'
                ?  
                  <img 
                    src={profilAccountDefault} 
                    alt="foto-profil" 
                    className="h-24 w-24 rounded-full shadow-md"
                  />
                : 
                <img 
                  src={profilAccountDefault2} 
                  alt="foto-profil" 
                  className="h-24 w-24 rounded-full shadow-md"
                />
              : 
                <img 
                  src={userRedux.profile.photo} 
                  alt="foto-profil" 
                  className="h-24 w-24 rounded-full shadow-md"
                />
            }

            <div className="text-lg font-bold">{userRedux.profile.name}</div>
            <div className="text-sm">
              <div className="flex flex-col sm:flex-row  items-center">
                <div>{userRedux.profile.email}</div>
                {
                  userRedux.profile.email_verif === false
                  ? 
                  <div>
                    <button 
                      className="bg-gradient-to-bl from-red-400 to-red-500 
                      hover:bg-gradient-to-bl hover:from-red-500 hover:to-red-400
                      cursor-pointer text-white shadow-md p-1 rounded-md text-xs ml-1">
                      verif email
                    </button>
                  </div>
                  : <div></div>
                }
              </div>
            </div>
            <p className="text-sm">{userRedux.profile.phone}</p>
          </div>
        </div>

        <div className="flex justify-center items-center my-4 mt-20 font-bold ">
          <h1 className=" p-1 border-b-4 border-blue-400">Semua Postingan</h1>
        </div>
        <AllPost dataJob={allPostJob} isLoading={isLoading}/>

        <Footer />
      </>
    )
    }
}

export default Profil;

function setdataRecruiter(data: any) {
  throw new Error('Function not implemented.')
}
