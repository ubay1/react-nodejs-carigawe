/* eslint-disable @typescript-eslint/no-unused-vars */
import Moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'

import { RiHome3Line, RiUserLine, RiAddFill, RiLoginCircleLine } from "react-icons/ri";
import React from 'react';
import { Link } from 'react-router-dom';
import { AppDispatch } from '../store';
import { setPageActive } from '../store/pageActive';

const Footer = () => {
  const userRedux = useSelector((state: RootState) => state.user)
  const pageActive = useSelector((state: RootState) => state.pageActive)
  
  const dispatch: AppDispatch = useDispatch()
  
  const yearNow = Moment(new Date()).format('YYYY');

  // <div className="h-full py-8 bg-blue-400 flex items-center justify-center text-center text-sm text-white">
  //   © {yearNow} Cari Gawe
  // </div>
  
  return(
    <div
      className={`
      bg-white fixed bottom-0 
        z-110
        p-2 px-4 w-full
        flex justify-between items-center
        md:hidden
      `}
      style={{
        boxShadow: '0px -2px 4px rgba(0,0,0,.1)'
      }}
    >
      <Link
        className={`flex flex-col items-center p-1 rounded-md 
          ${pageActive.ispage === 'beranda' ? 'bg-blue-50 text-blue-500 shadow-inner font-semibold hover:bg-blue-50' : 'bg-transparent'}
        `}
        to="/"
        onClick={() => {
          dispatch(setPageActive({
            ispage: 'beranda'
          }))
        }}
      >
        <RiHome3Line className="text-xl"/>
        <span className="text-xs">Beranda</span>
      </Link>

      {
        userRedux.token !== '' && userRedux.profile.recruiter
        ?
        <div className="flex flex-col items-center">
          <Link
            to="/recruiter/create-job"
            className="flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow-md py-2 px-4 no-underline"
            onClick={() => {
              dispatch(setPageActive({
                ispage: 'createjobs'
              }))
            }}
          >
            <RiAddFill className="
              text-4xl absolute top-2 cursor-pointer
              bg-gradient-to-bl from-blue-400 to-blue-500 
              hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400
              rounded-full text-white shadow-lg
              "
            />
          </Link>
          {/* <span className="text-sm">Buat Loker</span> */}
        </div>
        : userRedux.token !== '' && userRedux.profile.job_seeker
        ? <div></div> : <div></div>
      }

      {
        userRedux.token !== ''
        ?
          <Link to="/profil" 
            className={`flex flex-col items-center p-1 rounded-md
              ${pageActive.ispage === 'profil' ? 'bg-blue-50 text-blue-500 shadow-inner font-semibold hover:bg-blue-50' : 'bg-transparent'}
            `}
            onClick={() => {
              dispatch(setPageActive({
                ispage: 'profil'
              }))
            }}
          >
            <RiUserLine className="text-xl"/>
            <span className="text-xs">Profil</span>
          </Link>
        : 
          <Link to="/login" 
            className={`flex flex-col items-center p-1 rounded-md bg-transparent`}
          >
            <RiLoginCircleLine className="text-xl"/>
            <span className="text-xs">Login</span>
          </Link>
      }
    </div>
  )
}

export default Footer;
