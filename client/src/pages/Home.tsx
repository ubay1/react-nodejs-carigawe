/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pulse.css';
import Moment from 'moment'
import LoadingGif from '../assets/loading.gif';
import Autosuggest from 'react-autosuggest';
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

import { AiOutlineUser, AiOutlineSearch, AiOutlineMenu } from "react-icons/ai";
import { RiSuitcaseLine, RiCloseLine, RiMenuLine, RiSendPlaneFill, RiCheckLine } from "react-icons/ri";

interface IPostJob {
    nama_pt: string;
    kebutuhan: string;
    skill: string[],
    lamaran_terakhir: string;
}


const Header = (props: UserState) => {
    const [menuHide, setmenuHide] = useState(true)

    const handleScroll=() => {
        const header = document.getElementById('myHeader')
        const offset=window.pageYOffset;
        if(offset > 0 ){
          header?.classList.add('sticky')
          header?.classList.add('top-0')
        }
        else{
            header?.classList.remove('sticky')
            header?.classList.remove('top-0')
        }
    }

    useEffect(() => {
        window.addEventListener('scroll',handleScroll)
    }, [])

    
    return(
        <div 
            className="bg-white shadow-md  z-20 p-4  w-full pin-t 
            lg:grid lg:grid-cols-lg-2rows-content
            md:grid md:grid-cols-lg-3rows-content
            flex justify-between
            "
            id="myHeader"
        >
            <div className="flex items-center flex-no-shrink text-black ">
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
                            props.profile.recruiter
                            ? 
                            <button className="pulse flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow-md py-2 px-4 no-underline" >
                                <RiSuitcaseLine className="text-lg mr-3"/> Buat Lowongan
                            </button>
                            : 
                            <button className="pulse flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow-md py-2 px-4 no-underline" >
                                <RiSuitcaseLine className="text-lg mr-3"/> Lowongan Terbaru
                            </button>
                        }
                    </li>
                </ul>
            </div>
    
            {/* button menu responsive */}
            <div 
                className="
                    block 
                    lg:hidden 
                    md:flex md:justify-end
                ">
                <button 
                    id="nav-toggle" className="flex items-center p-2 border rounded-lg text-white bg-blue-500 shadow-md border-transparent hover:border-transparent focus:outline-none"
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
                className={
                    `sm:w-1/3
                    lg:flex lg:flex-row lg:items-center lg:justify-between lg:w-full lg:static lg:bg-transparent lg:shadow-none lg:p-0 lg:top-0
                    w-2/3 bg-white p-4 rounded-md shadow-lg
                    flex flex-col-reverse absolute right-4 top-16
                    ${menuHide === true ? 'hidden': 'flex'}
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
                            props.profile.recruiter
                            ? 
                            <button className="pulse flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow-md py-2 px-4 no-underline" >
                                <RiSuitcaseLine className="text-lg mr-3"/> Buat Lowongan
                            </button>
                            : 
                            <button className="pulse flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow-md py-2 px-4 no-underline" >
                                <RiSuitcaseLine className="text-lg mr-3"/> Lowongan Terbaru
                            </button>
                        }
                    </li>
                </ul>
                <ul 
                className={`
                    lg:list-reset lg:mb-0
                    flex ${props.token !== '' ? 'flex-col' : 'flex-row'} items-center justify-center
                    mb-4
                `}>
                {
                    props.token !== '' 
                    ?  
                    <>
                    <li className="mr-0">
                        {
                            props.profile.photo === '' 
                            ?
                                <div 
                                    className="bg-blue-500 w-9 text-white text-xl cursor-pointer p-2 rounded-full">
                                    <AiOutlineUser />
                                </div>
                            : 'ada foto'
                        }
                    </li>
                    <li
                        className="
                            lg:hidden
                        "
                    >
                        {props.profile.name}
                    </li>
                    <li
                        className="
                            lg:hidden
                            text-xs
                        "
                    >
                        {props.profile.email}
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
                                ${props.profile.email_verif === false 
                                ? 'bg-red-400' :  'bg-green-400'}
                            `}
                        >
                            {
                                props.profile.email_verif === false 
                                ? <>
                                    <div className="flex items-center justify-center">
                                        <RiSendPlaneFill  className="text-md mr-1"/> verifikasi
                                    </div></>
                                : <>
                                    <div className="flex items-center justify-center">
                                        <RiCheckLine className="text-md mr-1"/> terverifikasi
                                    </div>
                                </>
                            }
                        </button>
                    </li>
                    </>
                    : 
                    <>
                    <li className="mr-0">
                        <Link className="inline-block py-2 px-4 no-underline" to="/login">Masuk</Link>
                    </li>
                    <li className="mr-0">
                        <Link className="inline-block py-2 px-4 no-underline" to="/register">Daftar</Link>
                    </li>
                    </>
                }
            </ul>
            </div>
            
        </div>
    )
}

const Articles = (props: any) => (
    <div className="px-8 py-8 bg-gray-50 -z-10 grid gap-4 lg:grid-cols-1 md:grid-cols-1 ">
        {
        props.postjobs.map((item: any, index: number) => {
            return(
                    <div 
                        key={`indexPost-${index}`}
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
            )
        })
        }
    </div>
)

const Home = () => {
    const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
    const userRedux = useSelector((state: RootState) => state.user)
    const dispatch: AppDispatch = useDispatch()

    const [postJobs, setpostJobs] = useState([1,1,2,2,2,2,2,2,2,2,2,2])

    const yearNow = Moment(new Date()).format('YYYY');

    const [valueKota, setvalueKota] = useState('');

    useEffect(() => {
        if(userRedux.token !== '') {
            setTimeout(() => {
                dispatch(setLoadingScreenHome({
                    show: false
                }))
            }, 2000)
        } else {
            initialStateUserAuthByAsync(dispatch)
        }
    }, [dispatch, userRedux.token])

    if (loadingScreenHomeRedux.show === true) {
        return(
            <div className="flex items-center justify-center flex-col h-screen">
                {/* <img src={LoadingGif} alt="laodinggif"/> */}
                {/* <div>Loading ..</div> */}
                <Lottie  animationData={LoadingScreen} style={{width: 200}} />
            </div>
        )
    } else {
    return(
        <div>
            <Header token={userRedux.token} profile={userRedux.profile} />

            {/* article dengan grid */}
            <div className="grid lg:grid-cols-lg-3rows-content">
                <div className="">
                    {
                        userRedux.profile.recruiter
                        ? 
                            'khusus recruiter'
                        :
                        <div className="bg-blue-100 h-auto my-8 mx-4 py-8 px-4">
                            <div className=" text-sm font-semibold text-gray-700 tracking-wide mb-1">Posisi Pekerjaan</div>
                            <input className="w-full mb-2 text-sm py-2 px-2 shadow rounded-lg border-gray-300 focus:outline-none focus:border-blue-500" type="" placeholder="frontend developer" />

                            <div className=" text-sm font-semibold text-gray-700 tracking-wide mb-1">Kota</div>

                            <Typeahead
                                id="domisili"
                                placeholder="domisili"
                                onChange={(selected) => {
                                    setvalueKota(selected[0].label.toLowerCase())
                                }}
                                options={dataKota}
                            />

                            <button className=" bg-blue-500 relative hover:bg-blue-600 text-sm rounded-lg text-white shadow mt-2 w-full py-2 px-4 no-underline">
                                <AiOutlineSearch className="absolute left-8 text-lg"/>   Cari
                            </button>
                        </div>
                    }
                </div>
                <Articles postjobs={postJobs}/>
            </div>
            

            <div className="h-full py-8 bg-blue-400 flex items-center justify-center text-center text-sm text-white">
                © {yearNow} Cari Gawe
            </div>
        </div>
    )
    }
}

export default Home;