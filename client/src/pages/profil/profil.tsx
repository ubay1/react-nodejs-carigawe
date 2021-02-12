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
import { initialStateUserAuthByAsync } from '../../store/user'
import Lottie from 'lottie-react';
import LoadingScreen from '../../assets/loading_screen.json';
import profilAccountDefault from '../../assets/avatar3.png';
import profilAccountDefault2 from '../../assets/avatar6.png';
import { HTTPGetAllJob, HTTPGetAllJobUser } from '../../utils/http'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import moment from 'moment'
import parse from 'html-react-parser';
import { AiFillHeart } from 'react-icons/ai'
import { RiQuestionAnswerFill } from 'react-icons/ri'
import EmptyData from '../../components/EmptyData'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const AllPost = ({dataPost, isLoading}: any): any => {
  console.log(dataPost) 
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
        dataPost.length === 0
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
          md:grid-cols-md-3cols-content md:my-4 md:mb-4
          sm:grid sm:grid-cols-2
          mb-20 mt-5
        ">
          {
            dataPost.map((item: any, index: number) => {
              // console.log(dataPost)
              return(
                <div
                  key={`indexPost-${index}`}
                  className="px-5 py-4 mx-2 my-2 bg-white shadow rounded-lg"
                >
                  <div className="flex mb-4">
                    <div className="mt-0.5 overflow-x-auto w-full">
                      <div 
                        className="
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
                                className="h-8 w-8 mr-1 rounded-full shadow-md"
                              />
                            :
                              <img 
                                src={profilAccountDefault2} 
                                alt="foto-profil" 
                                className="h-8 w-8 mr-1 rounded-full shadow-md"
                              />
                          :
                            <img 
                              src={item.user.photo} 
                              alt="foto-profil" 
                              className="h-8 w-8 mr-1 rounded-full shadow-md"
                            />
                        }
                        <div className="block font-bold text-md leading-snug text-black">
                          <p className="text-md">{ item.user.name }</p>
                          <p className="block text-xs text-gray-500 font-light leading-snug"> 
                          { moment(item.createdAt).format('YYYY-MM-DD hh:mm:ss')}
                          </p>
                        </div>
                      </div>

                      <div id={`text-loker-${index}`} className="text-sm my-4 line-clamp-2">
                        {
                          parse(item.content)
                        }
                      </div>
                      
                      <button id={`btn-readmore-${index}`} className="
                      bg-gradient-to-bl from-blue-400 to-blue-500 
                      hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400
                      cursor-pointer text-white shadow-md p-2 rounded-lg text-xs
                      focus:outline-none
                      "
                      onClick={() => {
                      }}
                      >
                        Read more
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-5">
                    <div className="flex flex-row items-center">
                      <AiFillHeart className="text-red-500 text-md cursor-pointer" />
                      <div className="ml-1 text-sm text-gray-500  font-light">
                        8
                      </div>
                    </div>
                    <div className="flex flex-row items-center">
                      <RiQuestionAnswerFill className="text-blue-500 text-md cursor-pointer" />
                      <div className="ml-1 text-sm text-gray-500 dark:text-gray-400 font-light ">
                        33
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
      httpGetAllJobUser(userRedux.token)
      setTimeout(() => {
        dispatch(setLoadingScreenHome({
          show: false
        }))
      }, 2000)
    } else {
      initialStateUserAuthByAsync(dispatch)
    }
  }, [dispatch, history, userRedux.token])

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

        <div className="">
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

        <div className="flex justify-center items-center my-4 font-bold ">
          <h1 className=" p-1 border-b-4 border-blue-400">Semua Postingan</h1>
        </div>
        <AllPost dataPost={allPostJob} isLoading={isLoading}/>

        <Footer />
      </>
    )
    }
}

export default Profil;

function setdataRecruiter(data: any) {
  throw new Error('Function not implemented.')
}
