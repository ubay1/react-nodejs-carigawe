/* eslint-disable @typescript-eslint/no-unused-vars */
import Moment from 'moment'
import { useSelector } from 'react-redux'
import { RootState } from '../store/rootReducer'

import { RiHome3Line, RiUserLine, RiAddFill } from "react-icons/ri";

const Footer = () => {
  const userRedux = useSelector((state: RootState) => state.user)

  const yearNow = Moment(new Date()).format('YYYY');

  // <div className="h-full py-8 bg-blue-400 flex items-center justify-center text-center text-sm text-white">
  //   © {yearNow} Cari Gawe
  // </div>
  return(
    <div
      className="
      bg-white fixed bottom-0 
        p-2 px-4 w-full
        flex justify-between items-center
        md:hidden
      "
      style={{
        boxShadow: '0px -2px 4px rgba(0,0,0,.1)'
      }}
    >
      <div className="flex flex-col items-center">
        <RiHome3Line className="text-2xl"/>
        <span className="text-sm">Beranda</span>
      </div>
      <div className="flex flex-col items-center">
        <RiAddFill className="
          text-4xl absolute top-2 cursor-pointer
          bg-gradient-to-bl from-blue-300 to-blue-500 
          hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-300
          rounded-full text-white shadow-lg
          "
        />
        {/* <span className="text-sm">Buat Loker</span> */}
      </div>
      <div className="flex flex-col items-center">
        <RiUserLine className="text-2xl"/>
        <span className="text-sm">Profil</span>
      </div>
    </div>
  )
}

export default Footer;