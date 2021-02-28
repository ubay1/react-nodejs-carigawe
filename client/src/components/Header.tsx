/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useHistory } from 'react-router-dom'
import { AppDispatch } from '../store'
import { RootState } from '../store/rootReducer'
import { RiSuitcaseLine, RiCloseLine, RiMenuLine, RiSendPlaneFill, RiCheckLine, RiArrowRightSLine, RiUserLine, RiHome3Line, RiLogoutCircleRLine, RiLoginCircleLine, RiEdit2Line } from "react-icons/ri";
import { IoEllipsisVertical, IoSearch } from "react-icons/io5";
// import { expiredToken } from '../store/user'
import { setLoading } from '../store/loading'
import { setPageActive } from '../store/pageActive'
import { Slide, toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { expiredToken } from '../store/user'
import socket from '../utils/socket'

interface ITypeHeader {
  sudahDiPage?: string;
  actionSearchJob?: any;
}

const Header = (props: ITypeHeader) => {
  const [menuHide, setmenuHide] = useState(true)
  const [diPageMana, setdiPageMana] = useState("")
  const history = useHistory();

  const userRedux = useSelector((state: RootState) => state.user)
  const pageActive = useSelector((state: RootState) => state.pageActive)
  const dispatch: AppDispatch = useDispatch()


  return (
    <div className="
      lg:grid lg:grid-cols-lg-2cols-content
      md:grid md:grid-cols-lg-3cols-content md:justify-between
      flex justify-between
      fixed top-0
      bg-white shadow-md z-120 p-4  w-full
      "
      id="myHeader"
    >
      {/* logo */}
      <div className="flex items-center flex-no-shrink text-black line-clamp-1"
      >
        <Link 
          className="text-4xl text-blue-600 tracking-wide font-semibold font_damion md:text-3xl" 
          to="/"
          onClick={() => {
            dispatch(setPageActive({
              ispage: 'beranda'
            }))
          }}
        >
          Cari Gawe
        </Link>
      </div>

      {/* button menu responsive untuk hp */}
      <div
        className="
            md:hidden 
            flex justify-end items-center
        ">
        <button
          id="nav-toggle"
          className={`items-center p-2 border rounded-full mr-2 text-white 
          bg-gradient-to-bl from-blue-400 to-blue-500 hover:bg-gradient-to-bl 
          hover:from-blue-500 
          hover:to-blue-400 shadow-blue border-transparent hover:border-transparent 
          ${userRedux.profile.recruiter ? 'hidden' : 'flex '}
          `}
          onClick={() => {
            props.actionSearchJob('test')
          }}
        >
          <IoSearch className="text-xl" />
        </button>
        <button
          id="nav-toggle"
          className="flex items-center p-2 border rounded-md text-white bg-gradient-to-bl from-blue-400 to-blue-500 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400 shadow-blue border-transparent hover:border-transparent focus:outline-none"
          onClick={() => {
            setmenuHide(!menuHide)
          }}
        >
          {
            menuHide === true
              ? <RiMenuLine className="text-xl text-white" />
              : <RiCloseLine className="text-xl text-white" />
          }
        </button>
      </div>

      {/* button buat lowongan / lowongan terbaru untuk tablet */}
      <div
        className="
          hidden
          text-black
          md:flex md:items-center md:flex-no-shrink 
          lg:hidden
        ">
        <ul
          className="
            md:list-reset md:mb-0
            flex items-center justify-center
            mb-2
          "
        >
          <li className="mr-0">
            {
              userRedux.profile.recruiter
              ?
                props.sudahDiPage === 'createjob' ?
                <div></div>
                : <Link
                to="/recruiter/create-job"
                className="flex items-center justify-center bg-gradient-to-bl from-blue-400 to-blue-500 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400 hover:bg-blue-600 text-sm rounded-lg text-white shadow-blue py-2 px-4 no-underline"
                onClick={() => {
                  dispatch(setPageActive({
                    ispage: 'createjobs'
                  }))
                }}
              >
                <RiSuitcaseLine className="text-lg mr-3" /> Buat Lowongan
              </Link>
                :
                <button className="flex items-center justify-center bg-gradient-to-bl from-blue-400 to-blue-500 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400 hover:bg-blue-600 text-sm rounded-lg text-white shadow-blue py-2 px-4 no-underline" >
                  <RiSuitcaseLine className="text-lg mr-3" /> Lowongan Terbaru
                </button>
            }
          </li>
        </ul>
      </div>

      {/* button menu responsive untuk tablet */}
      <div
        className="
            hidden
            lg:hidden 
            md:flex md:justify-end
        ">
        <button
          id="nav-toggle"
          className="flex items-center p-2 border rounded-lg text-white bg-gradient-to-bl from-blue-400 to-blue-500 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400 shadow-blue border-transparent hover:border-transparent focus:outline-none"
          onClick={() => {
            setmenuHide(!menuHide)
          }}
        >
          {
            menuHide === true
              ? <RiMenuLine className="text-xl text-white" />
              : <RiCloseLine className="text-xl text-white" />
          }
        </button>
      </div>

      {/* menu responsive untuk nampilin list menu */}
      <div
        className={`
          lg:flex lg:flex-row lg:items-center lg:justify-between lg:w-full lg:static lg:bg-transparent lg:shadow-none lg:p-0 lg:top-0
          md:w-36
          z-110
          w-36
          bg-white p-2 rounded-md shadow-lg
          flex-col-reverse absolute right-4 top-16
          ${menuHide === true ? 'hidden' : 'flex'}
          `
        }
      >
        {/* buat lowongan / update lowongan terbaru  */}
        <ul
          className="
            lg:list-reset lg:mb-0
            lg:flex lg:items-center lg:justify-center
            mb-2
            hidden
          "
        >
          <li className="mr-0">
            {
              userRedux.profile.recruiter
              ?
                props.sudahDiPage === 'createjob' ?
                <div></div>
                :
                <Link
                  to="/recruiter/create-job"
                  className="flex items-center justify-center bg-gradient-to-bl from-blue-400 to-blue-500 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400 hover:bg-blue-600 text-sm rounded-lg text-white shadow-blue py-2 px-4 no-underline"
                  onClick={() => {
                    dispatch(setPageActive({
                      ispage: 'createjobs'
                    }))
                  }}
                >
                  <RiSuitcaseLine className="text-lg mr-3" /> Buat Lowongan
                </Link>
                :
                <button
                  className="
                    flex items-center justify-center bg-gradient-to-bl from-blue-400 to-blue-500 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400 hover:bg-blue-600 text-sm rounded-lg text-white shadow-blue py-2 px-4 no-underline
                  "
                >
                  <RiSuitcaseLine className="text-lg mr-3" /> Lowongan Terbaru
                </button>
            }
          </li>
        </ul>

        {/* list menu untuk table dan hp*/}
        <ul
          className={`
            lg:list-reset lg:mb-0
            lg:flex-row 
            flex flex-col items-center justify-center
          `}>
          {
            userRedux.token !== ''
              ?
              <>
                <li className="w-full ">
                  <Link to="/"
                    className={`
                    lg:px-4
                    md:flex md:flex-row md:justify-start md:items-center 
                    hidden
                    py-2 
                    w-full
                    rounded-md
                    hover:bg-gray-100
                    ${pageActive.ispage === 'beranda' ? 'bg-blue-50 text-blue-500 shadow-inner font-semibold hover:bg-blue-50' : 'bg-transparent'}
                    `}
                    onClick={() => {
                      dispatch(setPageActive({
                        ispage: 'beranda'
                      }))
                    }}
                  >
                    <RiHome3Line
                      className={`
                      text-xl mx-4 lg:text-2xl lg:mx-0
                      
                      `} />
                    <span className={`text-sm 
                    ${pageActive.ispage !== 'beranda' ? 'lg:hidden': ''} pl-2`
                    } title="beranda"> Beranda </span>
                  </Link>
                </li>
                <li className="w-full ">
                  <Link to="/profil"
                    className={`
                    lg:px-4
                    md:flex md:flex-row md:justify-start md:items-center 
                    hidden
                    py-2 
                    w-full
                    rounded-md
                    hover:bg-gray-100
                    ${pageActive.ispage === 'profil' ? 'bg-blue-50 text-blue-500 shadow-inner font-semibold hover:bg-blue-50' : 'bg-transparent'}
                    `}
                    onClick={() => {
                      dispatch(setPageActive({
                        ispage: 'profil'
                      }))
                    }}
                  >
                    <RiUserLine
                      className={`
                      text-xl mx-4 lg:text-2xl lg:mx-0
                      
                      `} />
                    <span className={`text-sm 
                    ${pageActive.ispage !== 'profil' ? 'lg:hidden': ''} pl-2`
                    } title="profil"> Profil </span>
                  </Link>
                </li>
                <li className="w-full ">
                  <button
                    className={`
                    lg:px-4
                    flex flex-row justify-start items-center 
                    py-2 
                    w-full
                    rounded-md
                    hover:bg-gray-100
                    focus:outline-none
                    `}

                    onClick={() => {
                      Cookies.remove('token')
                      dispatch(setLoading({
                        show: true,
                        timeout: 300000
                      }))

                      setTimeout(() => {
                        toast('Anda telah keluar', {
                          position: "bottom-right",
                          autoClose: 5000,
                          type: 'info',
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          transition: Slide
                        })
                        
                        window.location.replace('/login')
                        
                        // socket.emit('disconnect', )
                        
                        // history.push('/login')
                        // pakai cara ini agar ngemmit disconnect ke server

                        dispatch(setPageActive({
                          ispage: 'beranda'
                        }))
                        expiredToken(dispatch)
                        dispatch(setLoading({
                          show: false,
                          timeout: 0
                        }))
                      }, 2000)
                    }}
                  >
                    <RiLogoutCircleRLine
                      className={`
                      text-xl mx-4 lg:text-2xl lg:mx-0
                      
                      `} />
                    <span className="text-sm lg:hidden" title="keluar"> Keluar </span>
                  </button>
                </li>
              </>
              :
              <>
                <li className="w-full">
                  <Link to="/login"
                    className="
                      lg:px-4
                      flex flex-row justify-start items-center 
                      py-2 
                      w-full
                      rounded-md
                    hover:bg-gray-100
                    "
                  >
                    <RiLoginCircleLine className="text-xl mx-4 lg:text-2xl lg:mx-0
                    " />
                    <span className="text-sm lg:hidden"> Masuk </span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/register"
                    className="
                      lg:px-4
                      flex flex-row justify-start items-center 
                      py-2 
                      w-full
                      rounded-md
                    hover:bg-gray-100
                    "
                  >
                    <RiEdit2Line className="text-xl mx-4 lg:text-2xl lg:mx-0
                    " />
                    <span className="text-sm lg:hidden"> Daftar </span>
                  </Link>
                </li>
              </>
          }
        </ul>
      </div>

    </div>
  )
}

export default Header;