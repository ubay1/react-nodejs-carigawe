/* eslint-disable @typescript-eslint/no-unused-vars */
import Moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'

import { RiHome3Line, RiUserLine, RiAddFill, RiLoginCircleLine } from "react-icons/ri";
import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { AppDispatch } from '../store';
import { setPageActive } from '../store/pageActive';
import classes from '*.module.css';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { MdAccountCircle, MdAdd, MdAssignment, MdHome, MdInput, MdPerson } from 'react-icons/md';
import { Slide, toast } from 'react-toastify';

const Footer = () => {
  const userRedux = useSelector((state: RootState) => state.user)
  const pageActive = useSelector((state: RootState) => state.pageActive)
  
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory()
  
  const yearNow = Moment(new Date()).format('YYYY');

  // <div className="h-full py-8 bg-blue-400 flex items-center justify-center text-center text-sm text-white">
  //   © {yearNow} Cari Gawe
  // </div>
  const FuncNavigation = (value: any) => {
    
  }

  return(
    <BottomNavigation value={pageActive.ispage} 
      onChange={(event, value) => {
        if (value !== 'beranda') {
          if (userRedux.token !== '') {
            dispatch(setPageActive({
              ispage: value
            }))
            history.push(`/${value}`)
          } else {
            if (value === 'login') {
              history.push('/login')
            }
          }
        } else {
          dispatch(setPageActive({
            ispage: 'beranda'
          }))
          history.push('/')
        }
      }}
      className="fixed bottom-0 z-110 w-full md:hidden h-16"
      style={{
        boxShadow: '0px -2px 4px rgba(0,0,0,.1)'
      }}
      showLabels
    >
      <BottomNavigationAction
        className="py-4 text-sm focus:outline-none" label="Beranda" value="beranda" 
        icon={<MdHome className="text-2xl"/>} 
      />
      {
        userRedux.token !== '' && userRedux.profile.recruiter
          ?
          <div className="flex flex-col items-center">
            <BottomNavigationAction
              className="py-4 text-sm focus:outline-none" label="Buat Loker" value="createjobs"
              icon={<MdAdd className="text-2xl" />}
            />

            <BottomNavigationAction
              className="py-4 text-sm focus:outline-none" label="Profil" value="profil"
              icon={<MdAccountCircle className="text-2xl" />}
            />
          </div>
          : 
            userRedux.token !== '' && userRedux.profile.job_seeker
            ? 
            <BottomNavigationAction
              className="py-4 text-sm focus:outline-none" label="Profil" value="profil"
              icon={<MdPerson className="text-2xl" />}
            /> 
            :
            <BottomNavigationAction
              className="py-4 text-sm focus:outline-none" label="Masuk" value="login"
              icon={<MdInput className="text-2xl" />}
            />
      }
    </BottomNavigation>
  )
}

export default Footer;
