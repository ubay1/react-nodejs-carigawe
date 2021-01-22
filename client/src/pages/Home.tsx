/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/pulse.css';
import Moment from 'moment'
import Autosuggest from 'react-autosuggest';
import { dataKota } from '../utils/interface';
import '../styles/global.css'

interface IPostJob {
    nama_pt: string;
    kebutuhan: string;
    skill: string[],
    lamaran_terakhir: string;
}

const Home = () => {
    const [menuHide, setmenuHide] = useState(true)
    const [scrolled,setScrolled] = React.useState(false);
    const [marginTopp, setmarginTopp] = useState('mt-24');
    const [postJobs, setpostJobs] = useState([1,1,2,2,2,2,2,2,2,2,2,2])

    const yearNow = Moment(new Date()).format('YYYY');

    const [valueKota, setvalueKota] = useState('');
    const [suggestion, setsuggestion] = useState<any[]>([]);

    const getSuggestions = (value: any) => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
      
        return inputLength === 0 ? [] : dataKota.filter(data =>
          data.label.toLowerCase().slice(0, inputLength) === inputValue
        );
    };
    const getSuggestionValue = (suggestion: any) => suggestion.label;

    const renderSuggestion = (suggestion: any) => (
        <div className="bg-white shadow">
          {suggestion.label}
        </div>
      );
      
    const onChange = (event: any, { newValue }: any) => {
        setvalueKota(newValue)
      };
    
      
    const onSuggestionsFetchRequested = ({ value }: any) => {
        setsuggestion(getSuggestions(value))
    };
    
    const onSuggestionsClearRequested = () => {
        setsuggestion([])
    };

    const inputProps = {
        placeholder: 'Domisili',
        value: valueKota,
        onChange: onChange,
        className: 'w-full mb-2 text-sm py-2 px-2 shadow rounded-lg border-gray-300 focus:outline-none focus:border-blue-500'
    };


    const Header = () => {
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
                className="bg-white shadow-md  z-20 p-4  w-full pin-t grid lg:grid-cols-lg-3rows-content"
            id="myHeader"
            >
                <div className="flex items-center flex-no-shrink text-black ">
                    <Link className="text-4xl text-blue-600 tracking-wide font-semibold font_damion" to="/">
                        Cari Gawe
                    </Link>
                </div>
        
                <div className="block lg:hidden">
                    <button 
                        id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:text-white hover:border-white"
                        onClick={() => {
                            setmenuHide(!menuHide)
                        }}
                    >
                        Menu
                    </button>
                </div>
        
                {/* <div 
                    className={
                        `w-full flex-grow lg:flex lg:items-center lg:w-auto pt-6 lg:pt-0
                        ${menuHide === true ? 'hidden': 'flex'}
                        `
                    }
                > */}
                    <ul className="list-reset lg:flex justify-start flex-1 items-center">
                        <li className="mr-0">
                            <a className="pulse inline-block bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow-md py-2 px-4 no-underline" href="#">Lowongan Terbaru</a>
                        </li>
                    </ul>
                    <ul className="list-reset lg:flex justify-end flex-1 items-center">
                        <li className="mr-0">
                            <Link className="inline-block py-2 px-4 no-underline" to="/login">Masuk</Link>
                        </li>
                        <li className="mr-0">
                            <Link className="inline-block py-2 px-4 no-underline" to="/register">Daftar</Link>
                        </li>
                    </ul>
                {/* </div> */}
            </div>
        )
    }

    const Articles = () => (
        <div className="px-8 py-8 bg-gray-50 -z-10 grid gap-4 lg:grid-cols-1 md:grid-cols-1 ">
            {
            postJobs.map((item: any, index: number) => {
                return(
                        <div 
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

    return(
        <div>
            <Header />

            {/* article dengan grid */}
            <div className="grid lg:grid-cols-lg-3rows-content">
                <div className="">
                    <div className="bg-blue-100 h-auto my-8 mx-4 py-8 px-4">
                        <div className=" text-sm font-semibold text-gray-700 tracking-wide mb-1">Posisi Pekerjaan</div>
                        <input className="w-full mb-2 text-sm py-2 px-2 shadow rounded-lg border-gray-300 focus:outline-none focus:border-blue-500" type="" placeholder="frontend developer" />

                        <div className=" text-sm font-semibold text-gray-700 tracking-wide mb-1">Kota</div>

                        <Autosuggest
                            suggestions={suggestion}
                            onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                            onSuggestionsClearRequested={onSuggestionsClearRequested}
                            getSuggestionValue={getSuggestionValue}
                            renderSuggestion={renderSuggestion}
                            inputProps={inputProps}
                        />

                        <button className="inline-block bg-blue-500 hover:bg-blue-600 text-sm rounded-lg text-white shadow mt-2 w-full py-2 px-4 no-underline">Cari</button>
                    </div>
                </div>
                <Articles />
            </div>
            

            <div className="h-full py-8 bg-blue-400 flex items-center justify-center text-center text-sm text-white">
                © {yearNow} Cari Gawe
            </div>
        </div>
    )
}

export default Home;