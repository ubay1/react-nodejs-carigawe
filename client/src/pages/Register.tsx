/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import image_login from '../assets/image_login.png';
import { AppDispatch } from '../store';
import {setLoading} from '../store/loading'

const Register = () => {
    const dispatch: AppDispatch = useDispatch()
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
                <div className="mt-10 mb-10 px-12 
                    sm:px-24 
                    md:px-48 
                    lg:px-12 lg:mt-0 lg:mb-0 lg:flex lg:flex-col lg:justify-start lg:shadow-lg lg:pb-4 lg:ml-3 mr-3 
                    xl:px-12 xl:max-w-2xl"
                >
                    <div className="mt-8">
                            <div>
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Full Name</div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" type="text" placeholder="jhon doe" />
                            </div>
                            <div className="mt-8">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Phone</div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" type="number" placeholder="0812xxxxxxxx" />
                            </div>
                            <div className="mt-8">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email Address</div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" type="email" placeholder="jhon@mail.com" />
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Password
                                    </div>
                                </div>
                                <input className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" type="" placeholder="Enter your password" />
                            </div>
                            <div className="mt-8">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">
                                        Register For
                                    </div>
                                </div>
                                <div className="flex flex-row">
                                    <div className="inline-flex items-center mt-3 w-1/2">
                                        <input type="radio" id="recruiter" name="roles_jobs" className="h-5 w-5 text-gray-600" value="recruiter"/>
                                        <label htmlFor="recruiter" className="ml-2 text-gray-700">Recruiter</label>
                                    </div>
                                    <div className="inline-flex items-center mt-3 w-1/2">
                                        <input type="radio" id="job_seeker" name="roles_jobs" className="h-5 w-5 text-gray-600" value="job_seeker"/>
                                        <label htmlFor="job_seeker" className="ml-2 text-gray-700">Job Seeker</label>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10">
                                <button 
                                    className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg"
                                    onClick={() => {
                                        dispatch(setLoading({
                                            show: true,
                                            timeout: 300000,
                                        }))
                                    }}
                                >
                                    Register
                                </button>
                            </div>
                        <div className="my-6 text-sm font-display font-semibold text-gray-700 text-center">
                            Have an account ? <Link to="/login" className="cursor-pointer text-blue-600 hover:text-blue-800">Sign in</Link>
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

export default Register;