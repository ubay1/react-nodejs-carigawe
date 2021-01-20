/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { toast, Slide } from 'react-toastify';
import image_login from '../assets/image_login.png';
import image_loading from '../assets/loading.gif';
import { AppDispatch } from '../store';
import {setLoading} from '../store/loading'
import { setToast } from '../store/toast';
import {HTTPRegisterUser} from '../utils/http';
import { registerUser } from '../utils/interface';
import AnimationAuth from './AnimationAuth';

const Register = () => {
    const dispatch: AppDispatch = useDispatch()
    const [dataRegister, setdataRegister] = useState<registerUser>({
        name: '',
        phone: '',
        email: '',
        password: '',
        recruiter: false,
        job_seeker: false,
    })
    const history = useHistory();

    useEffect(() => {
        // console.log(dataRegister)
    }, [dataRegister])

    const handleInputChange = (event: any) => {
        const newValue = {...dataRegister} 
        
        if (event.target.name === 'name' ) {
            newValue.name = event.target.value
        } else if(event.target.name === 'phone') {
            newValue.phone = event.target.value
        } else if(event.target.name === 'email') {
            newValue.email = event.target.value
        } else if(event.target.name === 'password') {
            newValue.password = event.target.value
        } else if(event.target.name === 'roles_jobs' && event.target.value === 'recruiter') {
            newValue.recruiter = true
            newValue.job_seeker = false
        } else {
            newValue.recruiter = false
            newValue.job_seeker = true
        }

        setdataRegister(newValue)
    }

    const httpRegisterUser = async (params: any) => {
        try {
            const responseRegisterUser = await HTTPRegisterUser({
                name: params.name,
                phone: params.phone,
                email: params.email,
                password: params.password,
                recruiter: params.recruiter,
                job_seeker: params.job_seeker,
            })

            toast(responseRegisterUser.data.messages, {
                position: "bottom-right",
                autoClose: 5000,
                type: 'success',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                transition: Slide
            })
            dispatch(setLoading({
                show: false,
                timeout: 0,
            }))

            history.push('/login')

        } catch (error) {
            toast(error.data.errors, {
                position: "bottom-right",
                autoClose: 5000,
                type: 'error',
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                transition: Slide
            })
            dispatch(setLoading({
                show: false,
                timeout: 0,
            }))
        }
    }

    return(
        <div className="lg:flex">
            <div className="lg:w-1/2 xl:max-w-screen-sm">
                <div className="
                    mt-10 mb-10 px-10
                    sm:px-24 
                    md:px-48 
                    lg:px-12 lg:mt-0 lg:mb-0 lg:flex lg:flex-col lg:justify-start lg:shadow-lg lg:pb-4 lg:ml-3 mr-3 
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
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Nama Lengkap</div>
                            <input 
                                name="name"
                                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                type="text" 
                                placeholder="jhon doe" 
                                defaultValue={dataRegister.name}
                                onChange={handleInputChange }
                            />
                        </div>
                        <div className="mt-8">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Nomor Telepon</div>
                            <input 
                                name="phone"
                                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                type="number" placeholder="0812xxxxxxxx" 
                                defaultValue={dataRegister.phone}    
                                onChange={handleInputChange }
                            />
                        </div>
                        <div className="mt-8">
                            <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                            <input 
                                name="email"
                                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                type="email" placeholder="jhon@mail.com" 
                                defaultValue={dataRegister.email}    
                                onChange={handleInputChange }
                            />
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Password
                                </div>
                            </div>
                            <input 
                                name="password"
                                className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                type="password" placeholder="Enter your password" 
                                defaultValue={dataRegister.password}    
                                onChange={handleInputChange }
                            />
                        </div>
                        <div className="mt-8">
                            <div className="flex justify-between items-center">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">
                                    Daftar Untuk
                                </div>
                            </div>
                            <div className="flex flex-row">
                                <div className="inline-flex items-center mt-3 w-1/2">
                                    <input 
                                        type="radio" 
                                        id="recruiter" 
                                        name="roles_jobs" 
                                        className="h-5 w-5 text-gray-600" 
                                        value="recruiter"
                                        onChange={handleInputChange }
                                    />
                                    <label htmlFor="recruiter" className="ml-2 text-gray-700">Perekrut
                                    </label>
                                </div>
                                <div className="inline-flex items-center mt-3 w-1/2">
                                    <input 
                                        type="radio" 
                                        id="job_seeker" 
                                        name="roles_jobs" 
                                        className="h-5 w-5 text-gray-600" 
                                        value="job_seeker"
                                        onChange={handleInputChange }
                                    />
                                    <label htmlFor="job_seeker" className="ml-2 text-gray-700">Pencari Kerja</label>
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
                                    httpRegisterUser(dataRegister)
                                }}
                            >
                                Daftar
                            </button>
                        </div>
                        <div className="my-6 text-sm font-display font-semibold text-gray-700 text-center">
                            Sudah punya akun ? <Link to="/login" className="cursor-pointer text-blue-600 hover:text-blue-800">Masuk</Link>
                        </div>
                    </div>
                </div>
            </div>
            <AnimationAuth />
        </div>
    )
}

export default Register;