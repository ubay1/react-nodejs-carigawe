/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AppDispatch } from '../store'
import { RootState } from '../store/rootReducer'
import { RiSuitcaseLine, RiCloseLine, RiMenuLine, RiSendPlaneFill, RiCheckLine, RiArrowRightSLine, RiUserLine, RiHome3Line, RiLogoutCircleRLine, RiLoginCircleLine, RiEdit2Line } from "react-icons/ri";
import {expiredToken} from '../store/user'
import {setLoading} from '../store/loading'
import { setPageActive } from '../store/pageActive'
import { Slide, toast } from 'react-toastify'

const Header = () => {
  const [menuHide, setmenuHide] = useState(true)

  const userRedux = useSelector((state: RootState) => state.user)
  const pageActive = useSelector((state: RootState) => state.pageActive)
  const dispatch: AppDispatch = useDispatch()

  const handleScroll = () => {
    const header = document.getElementById('myHeader')
    const offset = window.pageYOffset;
    if (offset > 0) {
      header?.classList.add('sticky')
      header?.classList.add('top-0')
    }
    else {
      header?.classList.remove('sticky')
      header?.classList.remove('top-0')
    }
  }

  useEffect(() => {
    if(userRedux.token === '') {
      dispatch(setLoading({
        show: true,
        timeout: 0
      }))
    }
  }, [dispatch, userRedux.token])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
  }, [])


  return (
    <div
      className="bg-white shadow-md  z-20 p-4  w-full pin-t 
                lg:grid lg:grid-cols-lg-2rows-content
                md:grid md:grid-cols-lg-3rows-content md:justify-between
                flex justify-center
                "
      id="myHeader"
    >
      <div className="
        flex items-center flex-no-shrink text-black 
        "
      >
        <Link className="text-4xl text-blue-600 tracking-wide font-semibold font_damion md:text-3xl" to="/">
          Cari Gawe
            </Link>
      </div>

      {/* ketika lebar medium/tablet */}
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
                <button className="pulse flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow-md py-2 px-4 no-underline" >
                  <RiSuitcaseLine className="text-lg mr-3" /> Buat Lowongan
                                </button>
                :
                <button className="pulse flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow-md py-2 px-4 no-underline" >
                  <RiSuitcaseLine className="text-lg mr-3" /> Lowongan Terbaru
                                </button>
            }
          </li>
        </ul>
      </div>

      {/* button menu responsive */}
      <div
        className="
            hidden
            lg:hidden 
            md:flex md:justify-end
        ">
        <button
          id="nav-toggle" 
          className="flex items-center p-2 border rounded-lg text-white bg-blue-500 shadow-md border-transparent hover:border-transparent focus:outline-none"
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

      <div
        className={`
          hidden
          lg:flex lg:flex-row lg:items-center lg:justify-between lg:w-full lg:static lg:bg-transparent lg:shadow-none lg:p-0 lg:top-0
          md:flex-col-reverse md:absolute md:right-4 md:top-16
          md:w-36 md:bg-white md:p-2 md:rounded-md md:shadow-lg
          ${menuHide === true ? 'md:hidden' : 'md:flex'}
          `
        }
      >
        {/* buat lowongan / update lowongan terbaru  */}
        <ul
          className="
            lg:list-reset lg:mb-0
            lg:flex lg:items-center lg:justify-center
            md:hidden
            flex items-center justify-center
            mb-2
          "
        >
          <li className="mr-0">
            {
              userRedux.profile.recruiter
                ?
                <button 
                  className="
                    pulse flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow-md py-2 px-4 no-underline
                  " 
                >
                  <RiSuitcaseLine className="text-lg mr-3" /> Buat Lowongan
                </button>
                :
                <button 
                  className="
                    pulse flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow-md py-2 px-4 no-underline
                  "
                >
                  <RiSuitcaseLine className="text-lg mr-3" /> Lowongan Terbaru
                </button>
            }
          </li>
        </ul>
        
        {/* lsit menu */}
        <ul
          className={`
            lg:list-reset lg:mb-0
            lg:flex-row 
            md:flex md:flex-col md:items-center md:justify-center
          `}>
          {
            userRedux.token !== ''
              ?
              <>
                <li className="w-full ">
                  <Link to="/" 
                    className={`py-2 
                    md:flex md:flex-row md:justify-start md:items-center 
                    lg:px-4
                    hover:bg-gray-100 rounded-md
                    ${pageActive.ispage === 'beranda' ? 'bg-blue-50' : 'bg-transparent'}
                    `}
                    onClick={() => {
                      dispatch(setPageActive({
                        ispage: 'beranda'
                      }))
                    }}
                  > 
                    <RiHome3Line 
                      className={`
                        text-xl md:mx-4 lg:text-2xl lg:mx-0
                        
                      `}/> 
                    <span className="text-sm lg:hidden"> Beranda </span>
                </Link>
                </li>

                <li className="w-full ">
                  <Link to="/" 
                    className={`py-2 
                    md:flex md:flex-row md:justify-start md:items-center
                    lg:px-4 
                    hover:bg-gray-100 rounded-md
                    ${pageActive.ispage === 'profil' ? 'bg-blue-50' : 'bg-transparent'}
                    `}
                    onClick={() => {
                      dispatch(setPageActive({
                        ispage: 'profil'
                      }))
                    }}
                  > 
                    <RiUserLine 
                      className={`
                        text-xl md:mx-4 lg:text-2xl lg:mx-0
                        
                      `}/> 
                    <span className="text-sm lg:hidden"> Profil </span>
                </Link>
                </li>
                <li className="w-full ">
                  <button
                    className={`py-2 
                    w-full
                    md:flex md:flex-row md:justify-start md:items-center 
                    lg:px-4
                    hover:bg-gray-100 rounded-md
                    `}

                    onClick={() => {
                      dispatch(setLoading({
                        show: true,
                        timeout: 300000
                      }))
                      
                      setTimeout(() => {
                        toast('Anda telah keluar', {
                          position: "bottom-right",
                          autoClose: 5000,
                          type: 'error',
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          transition: Slide
                        })
                        expiredToken(dispatch)
                      }, 2000)
                    }}
                  > 
                    <RiLogoutCircleRLine 
                      className={`
                        text-xl md:mx-4 lg:text-2xl lg:mx-0
                      `}/> 
                    <span className="text-sm lg:hidden"> Keluar </span>
                  </button>
                </li>

                {/* <li className="mr-0">
                  {
                    userRedux.profile.photo === ''
                      ?
                      <div
                        className="bg-blue-500 w-9 text-white text-xl cursor-pointer p-2 rounded-full">
                        <AiOutlineUser />
                      </div>
                      : 'ada foto'
                  }
                </li> */}
                {/* <li
                  className="
                    lg:hidden
                  "
                >
                  {userRedux.profile.name}
                </li>
                <li
                  className="
                    lg:hidden
                    text-xs
                  "
                >
                  {userRedux.profile.email}
                </li>
                <li
                  className="
                    lg:hidden
                    text-xs
                  "
                >
                  <button
                    className={`
                      p-1 rounded-md shadow font-semibold text-white
                      ${userRedux.profile.email_verif === false ? 'bg-red-400' : 'bg-green-400'}
                    `}
                  >
                    {
                      userRedux.profile.email_verif === false
                        ? <>
                          <div className="flex items-center justify-center">
                            <RiSendPlaneFill className="text-md mr-1" /> verifikasi
                          </div>
                          </>
                        : <>
                          <div className="flex items-center justify-center">
                            <RiCheckLine className="text-md mr-1" /> terverifikasi
                          </div>
                        </>
                    }
                  </button>
                </li> */}
              </>
              :
              <>
                <li className="w-full">
                  <Link to="/login"
                    className="
                      py-2 
                      w-full
                      md:flex md:flex-row md:justify-start md:items-center 
                      lg:px-4
                      hover:bg-gray-100 rounded-md
                    "
                  >
                    <RiLoginCircleLine className="text-xl md:mx-4 lg:text-2xl lg:mx-0"/> 
                    <span className="text-sm lg:hidden"> Masuk </span>
                  </Link>
                </li>
                <li className="w-full">
                  <Link to="/register"
                    className="
                      py-2 
                      w-full
                      md:flex md:flex-row md:justify-start md:items-center 
                      lg:px-4
                      hover:bg-gray-100 rounded-md
                    "
                  >
                    <RiEdit2Line className="text-xl md:mx-4 lg:text-2xl lg:mx-0"/> 
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