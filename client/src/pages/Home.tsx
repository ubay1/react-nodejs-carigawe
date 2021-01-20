/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [menuHide, setmenuHide] = useState(true)
    const [scrolled,setScrolled] = React.useState(false);
    const [marginTopp, setmarginTopp] = useState('mt-24');

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
        <div className={`bg-white shadow-md flex items-center z-10 justify-between flex-wrap p-4  w-full pin-t`}
        id="myHeader"
        >
            <div className="flex items-center flex-no-shrink text-black mr-6">
                <Link className="text-4xl text-blue-600 tracking-wide ml-2 font-semibold font_damion" to="/">
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
    
            <div 
                className={
                    `w-full flex-grow lg:flex lg:items-center lg:w-auto pt-6 lg:pt-0
                    ${menuHide === true ? 'hidden': 'flex'}
                    `
                }
            >
                <ul className="list-reset lg:flex justify-start flex-1 items-center">
                    <li className="mr-0">
                        <a className="inline-block py-2 px-4 no-underline" href="#">Lowongan Terbaru</a>
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
            </div>
        </div>
        )
    }

    return(
        <div className="grid h-screen gap-4"
            style={{
                gridTemplateRows: '70px auto 30px'
            }}
        >
            <Header />

            <div className="mx-4 grid gap-4 lg:grid-cols-3 md:grid-cols-2 ">
                <div className="shadow-lg relative pb-2 h-auto w-full z-0 grid lg:grid-rows-lg-3rows-content"
                >
                    <div>
                        <img className="h-full w-full object-cover rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" alt="bag" />
                    </div>
                    <div className="w-full h-full px-4 py-4 bg-white rounded-lg">
                        <p className="text-xl font-bold text-gray-700">
                            PT. Daur Ulang
                        </p>
                        <p className="text-sm my-2 font-semibold text-gray-700">
                            membutuhkan Frontend Developer
                        </p>                   
                        <p className="text-sm text-gray-700">
                            kualaifikasi:
                        </p>
                        <p>
                            <li>bisa ReactJS/VueJS</li>
                            <li>bisa menggunakan API</li>
                            <li>paham nodejs sangat disukai</li>
                        </p>
                        <p className="text-sm mt-20">
                            kirimkan lamaran sebelum 26-01-2021
                        </p>
                    </div>

                    <div className="w-full pb-4 px-2 grid gap-2 lg:grid-cols-2">
                        <button className="bg-blue-500 hover:bg-blue-400 py-3 text-white shadow-lg rounded-full lg:w-full">Lamar</button>
                        <button className="bg-red-500 hover:bg-red-400 p-3 text-white shadow-lg rounded-full lg:w-full">Komentar</button>
                    </div>
                </div>

                <div className="shadow-lg relative pb-2 h-auto w-full z-0 grid lg:grid-rows-lg-3rows-content"
                >
                    <div>
                        <img className="h-full w-full object-cover rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" alt="bag" />
                    </div>
                    <div className="w-full h-full px-4 py-4 bg-white rounded-lg">
                        <p className="text-xl font-bold text-gray-700">
                            PT. Daur Ulang
                        </p>
                        <p className="text-sm my-2 font-semibold text-gray-700">
                            membutuhkan Frontend Developer
                        </p>                   
                        <p className="text-sm text-gray-700">
                            kualaifikasi:
                        </p>
                        <p>
                            <li>bisa ReactJS/VueJS</li>
                            <li>bisa menggunakan API</li>
                            <li>paham nodejs sangat disukai</li>
                        </p>
                        <p className="text-sm mt-20">
                            kirimkan lamaran sebelum 26-01-2021
                        </p>
                    </div>

                    <div className="w-full pb-4 px-2 grid gap-2 lg:grid-cols-2">
                        <button className="bg-blue-500 hover:bg-blue-400 py-3 text-white shadow-lg rounded-full lg:w-full">Lamar</button>
                        <button className="bg-red-500 hover:bg-red-400 p-3 text-white shadow-lg rounded-full lg:w-full">Komentar</button>
                    </div>
                </div>

                <div className="shadow-lg relative pb-2 h-auto w-full z-0 grid lg:grid-rows-lg-3rows-content"
                >
                    <div>
                        <img className="h-full w-full object-cover rounded-r-none pb-5/6" src="https://ik.imagekit.io/q5edmtudmz/FB_IMG_15658659197157667_wOd8n5yFyXI.jpg" alt="bag" />
                    </div>
                    <div className="w-full h-full px-4 py-4 bg-white rounded-lg">
                        <p className="text-xl font-bold text-gray-700">
                            PT. Daur Ulang
                        </p>
                        <p className="text-sm my-2 font-semibold text-gray-700">
                            membutuhkan Frontend Developer
                        </p>                   
                        <p className="text-sm text-gray-700">
                            kualaifikasi:
                        </p>
                        <p>
                            <li>bisa ReactJS/VueJS</li>
                            <li>bisa menggunakan API</li>
                            <li>paham nodejs sangat disukai</li>
                        </p>
                        <p className="text-sm mt-20 w-">
                            kirimkan lamaran sebelum 26-01-2021
                        </p>
                    </div>

                    <div className="w-full pb-4 px-2 grid gap-2 lg:grid-cols-2">
                        <button className="bg-blue-500 hover:bg-blue-400 py-3 text-white shadow-lg rounded-full lg:w-full">Lamar</button>
                        <button className="bg-red-500 hover:bg-red-400 p-3 text-white shadow-lg rounded-full lg:w-full">Komentar</button>
                    </div>
                </div>

            </div>

            <div className="h-full flex items-center justify-center text-center text-xs text-gray-400">
                2021 Cari Gawe
            </div>
        </div>
    )
}

export default Home;