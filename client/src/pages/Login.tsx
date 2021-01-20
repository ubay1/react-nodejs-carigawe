/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import image_login from '../assets/image_login.png';
import AnimationAuth from './AnimationAuth';

const Login = () => {
    
    return(
        <div className="lg:flex">
            <div className="lg:w-1/2 xl:max-w-screen-sm">
                <div className="
                    px-10
                    h-screen 
                    flex flex-col justify-center
                    sm:px-24 
                    md:px-48 
                    lg:px-12 lg:mt-0 lg:h-screen lg:flex lg:shadow-lg lg:ml-3 lg:mr-3 
                    xl:px-12 xl:max-w-2xl
                    "
                >
                    <div className="">
                        <div className="py-6 flex justify-center">
                            <div className="cursor-pointer flex items-center">
                                <div className="text-5xl text-blue-600 tracking-wide ml-2 font-semibold font_damion">
                                    <Link to="/">Cari Gawe</Link>
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" type="" placeholder="jhon@mail.com" />
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Password
                                </div>
                                <div>
                                    <a className="text-xs font-display font-semibold text-blue-600 hover:text-blue-800
                                    cursor-pointer">
                                        Lupa Password?
                                    </a>
                                </div>
                            </div>
                            <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" type="" placeholder="Enter your password" />
                        </div>
                        <div className="mt-10">
                            <button className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                            font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600
                            shadow-lg">
                                Masuk
                            </button>
                        </div>
                        <div className="my-6 text-sm font-display font-semibold text-gray-700 text-center">
                            Belum punya akun ? <Link to="/register" className="cursor-pointer text-blue-600 hover:text-blue-800">Daftar</Link>
                        </div>
                    </div>
                    <AnimationAuth />
                </div>
            </div>
            
        </div>
    )
}

export default Login;