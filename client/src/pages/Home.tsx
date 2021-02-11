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
import { initialStateUserAuthByAsync, UserState } from '../store/user';
import { TitleComponent } from '../components/TitleComponent';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AiOutlineSearch, AiFillHeart } from "react-icons/ai";
import { RiQuestionAnswerFill } from "react-icons/ri";
import { HTTPGetAllJob } from '../utils/http';
import parse from 'html-react-parser';
import EmptyData from '../components/EmptyData'
import './home.css'
import moment from 'moment';
import profilAccountDefault from '../assets/avatar3.png'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";

const Recruiter = ({dataPost, isLoading}: any): any => {
  // console.log(isLoading) 
  return(
    <div>
      <ReactPlaceholder 
      className="mt-2" 
      type='media' 
      rows={3} 
      ready={isLoading === true ? false : true}
      delay={1000} 
      showLoadingAnimation={true}>
      {
        dataPost.length === 0
        ? 
          <EmptyData />
        :
        <div className=" 
          lg:grid-cols-lg-4rows-content
          md:grid-cols-md-3rows-content md:my-4 md:mb-4
          sm:grid sm:grid-cols-2
          mb-20 mt-5
        ">
          {
            dataPost.map((item: any, index: number) => {
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
                            <img 
                              src={profilAccountDefault} 
                              alt="foto-profil" 
                              className="h-8 w-8 mr-1 rounded-full shadow-md"
                            />
                          : item.user.photo
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
      </ReactPlaceholder>
    </div>
  )
}

const JobSeeker = () => (
  <div className="grid lg:grid-cols-lg-3rows-content">
    <div className="">
      <div className="bg-blue-100 relative h-auto my-8 mx-4 py-8 px-4">
        <div className=" text-sm font-semibold text-gray-700 tracking-wide mb-1">Posisi Pekerjaan</div>
        <input className="w-full mb-2 text-sm py-2 px-2 shadow rounded-lg border-gray-300 focus:outline-none focus:border-blue-500" type="" placeholder="frontend developer" />

        <div className=" text-sm font-semibold text-gray-700 tracking-wide mb-1">Kota</div>

        <div className="z-10 relative">
          <Typeahead
            id="domisili"
            placeholder="domisili"
            onChange={(selected) => {
              console.log(selected)
              // setvalueKota(selected[0].label.toLowerCase())
            }}
            options={dataKota}
            // defaultInputValue={valueKota}
          />
        </div>

        <button className=" bg-blue-500 relative z-0 hover:bg-blue-600 text-sm rounded-lg text-white shadow mt-2 w-full py-2 px-4 no-underline">
          <AiOutlineSearch className="absolute left-8 text-lg" />   Cari
        </button>
      </div>
    </div>
    <div className="px-8 py-8 bg-gray-50 -z-10 grid gap-4 lg:grid-cols-1 md:grid-cols-1 ">
      {/* {
        postJobs.map((item: any, index: number) => {
          return ( */}
            <div
              key={`indexPost-${0}`}
              className="px-5 py-4  bg-white dark:bg-gray-800 shadow rounded-lg w-full"
            >
              <div className="flex mb-4">
                <img className="w-12 h-12 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" />
                <div className="ml-2 mt-0.5">
                  <span className="block font-medium text-base leading-snug text-black dark:text-gray-100">Loyce Kuvalis</span>
                  <span className="block text-sm text-gray-500 dark:text-gray-400 font-light leading-snug">16 December at 08:25</span>
                </div>
              </div>
              <p className="text-gray-800 dark:text-gray-100 leading-snug md:leading-normal">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
              <div className="flex justify-between items-center mt-5">
                <div className="flex ">
                  <span className="ml-1 text-gray-500 dark:text-gray-400  font-light">8</span>
                </div>
                <div className="ml-1 text-gray-500 dark:text-gray-400 font-light">33 comments</div>
              </div>
            </div>
          {/* )
        })
      } */}
    </div>
  </div>
)

const Home = () => {
  const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
  const userRedux = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()

  const [postJobs, setpostJobs] = useState([1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])

  const yearNow = Moment(new Date()).format('YYYY');

  const [valueKota, setvalueKota] = useState('');
  const [isLoading, setisLoading] = useState(true)
  const [dataRecruiter, setdataRecruiter] = useState<any[]>([]);

  useEffect(() => {
    document.title = 'Cari Gawe - Beranda'
  }, [])

  const httpGetAllJob = async (token: string) => {
    try {
      const responseGetAllJob = await HTTPGetAllJob({
        token: token
      })
      setdataRecruiter(responseGetAllJob.data.data)
      // setTimeout(() => {
        setisLoading(false)
      // }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // console.log(valueKota)
  }, [valueKota])

  useEffect(() => {
    if (userRedux.token !== '') {
      httpGetAllJob(userRedux.token)
      setTimeout(() => {
        dispatch(setLoadingScreenHome({
          show: false
        }))
      }, 2000)
    } else {
      // setTimeout(() => {
      //     dispatch(setLoadingScreenHome({
      //         show: false
      //     }))
      // }, 2000)
      initialStateUserAuthByAsync(dispatch)
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
        <Header sudahDiPage="home"/>

        {
          userRedux.profile.recruiter
          ? <Recruiter dataPost={dataRecruiter} isLoading={isLoading}/>
          : <JobSeeker />
        }

        <Footer />
      </>
    )
  }
}

export default Home;