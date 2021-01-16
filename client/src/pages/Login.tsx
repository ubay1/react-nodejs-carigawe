/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Link } from 'react-router-dom';
import image_login from '../assets/image_login.png';

const Login = () => {
    return(
        <div className="lg:flex">
            <div className="lg:w-1/2 xl:max-w-screen-sm">
                <div className="py-12 lg:hidden bg-blue-100 lg:bg-white flex justify-center lg:justify-start lg:px-12">
                    <div className="cursor-pointer flex items-center">
                        <div className="text-2xl text-blue-800 tracking-wide ml-2 font-semibold">
                            Cari Gawe
                        </div>
                    </div>
                </div>
                <div className="mt-10 px-12 
                    h-full
                    sm:px-24 
                    md:px-48 
                    lg:px-12 lg:mt-0 lg:h-screen lg:flex flex-col justify-center lg:shadow-lg lg:ml-3 mr-3 
                    xl:px-12 xl:max-w-2xl"
                >
                    <div className="mt-12">
                        <form>
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" type="" placeholder="mike@gmail.com" />
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                    <div>
                                        <a className="text-xs font-display font-semibold text-blue-600 hover:text-blue-800
                                        cursor-pointer">
                                            Forgot Password?
                                        </a>
                                    </div>
                                </div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" type="" placeholder="Enter your password" />
                            </div>
                            <div className="mt-10">
                                <button className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600
                                shadow-lg">
                                    Log In
                                </button>
                            </div>
                        </form>
                        <div className="my-6 text-sm font-display font-semibold text-gray-700 text-center">
                            Don't have an account ? <Link to="/register" className="cursor-pointer text-blue-600 hover:text-blue-800">Sign up</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="hidden 
                lg:flex items-center fixed right-0 w-1/2 justify-center bg-gray-50 flex-1 h-screen"
            >
                <div className="max-w-md transform duration-500 hover:scale-110 cursor-pointer">
                    <img style={{width: '100%', height: '100%'}} src={image_login} alt="image login" />
                    <div className="text-center mt-4 font-bold text-2xl">
                        Cari Gawe
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;