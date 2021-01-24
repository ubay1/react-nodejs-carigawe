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
import { setLoadingScreenHome } from '../store/loadingScreenHome';
import {HTTPRegisterUser} from '../utils/http';
import { registerUser } from '../utils/interface';
import AnimationAuth from './AnimationAuth';
import { useFormik } from "formik";
import * as Yup from 'yup';

const Register = () => {
    const dispatch: AppDispatch = useDispatch()

    const [successAction, setsuccessAction] = useState(false)
    const [failedAction, setfailedAction] = useState(false)

    const history = useHistory();
    
    const formik = useFormik({
        initialValues: {
          name: '',
          phone: '',
          email: '',
          password: '',
          roles_jobs: ''
        },
        onSubmit: values => {
            dispatch(setLoading({
                show: true,
                timeout: 300000,
            }))

            httpRegisterUser(values)

            console.log(JSON.stringify(values, null, 2));
          
        },
        validationSchema: Yup.object({
            name: Yup.string()
              .required("Wajib diisi"),
            phone: Yup.number()
            .required("Wajib diisi"),
            email: Yup.string()
              .email("Invalid email format")
              .required("Wajib diisi"),
            password: Yup.string()
              .min(8, "Minimum 8 characters")
              .required("Wajib diisi"),
            roles_jobs: Yup.string()
              .required("Wajib diisi"),
        })
    });

    const httpRegisterUser = async (params: any) => {
        try {
            const responseRegisterUser = await HTTPRegisterUser({
                name: params.name,
                phone: params.phone,
                email: params.email,
                password: params.password,
                roles_jobs: params.roles_jobs
            })

            if (responseRegisterUser.status === 200) {
                toast(responseRegisterUser.data.message, {
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
            }


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
                    mb-10 px-10
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
                        <form onSubmit={formik.handleSubmit}>
                            <div className="mt-6">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Nama Lengkap</div>
                                <input 
                                    name="name"
                                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                    type="text" 
                                    placeholder="jhon doe" 
                                    // defaultValue={dataRegister.name}
                                    // onChange={handleInputChange }
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                />
                                {formik.errors.name && formik.touched.name && (
                                    <p className="text-red-400">{formik.errors.name}</p>
                                )}
                            </div>
                            <div className="mt-8">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Nomor Telepon</div>
                                <input 
                                    name="phone"
                                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                    type="text" placeholder="0812xxxxxxxx" 
                                    // defaultValue={dataRegister.phone}    
                                    // onChange={handleInputChange }
                                    onChange={formik.handleChange}
                                    value={formik.values.phone}
                                />
                                {formik.errors.phone && formik.touched.phone && (
                                    <p className="text-red-400">{formik.errors.phone}</p>
                                )}
                            </div>
                            <div className="mt-8">
                                <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                                <input 
                                    name="email"
                                    className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                    type="email" placeholder="jhon@mail.com" 
                                    // defaultValue={dataRegister.email}    
                                    // onChange={handleInputChange }
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                />
                                {formik.errors.email && formik.touched.email && (
                                    <p className="text-red-400">{formik.errors.email}</p>
                                )}
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
                                    // defaultValue={dataRegister.password}    
                                    // onChange={handleInputChange }
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                />
                                {formik.errors.password && formik.touched.password && (
                                    <p className="text-red-400">{formik.errors.password}</p>
                                )}
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
                                            onChange={formik.handleChange}
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
                                            onChange={formik.handleChange}
                                        />
                                        <label htmlFor="job_seeker" className="ml-2 text-gray-700">Pencari Kerja</label>
                                    </div>
                                </div>
                                {formik.errors.roles_jobs && (
                                    <p className="text-red-400">{formik.errors.roles_jobs}</p>
                                )}
                            </div>
                            <div className="mt-10">
                            <button 
                                className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600 shadow-lg"
                                type="submit"
                                onClick={() => {
                                    // dispatch(setLoading({
                                    //     show: true,
                                    //     timeout: 300000,
                                    // }))
                                    // httpRegisterUser(dataRegister)
                                }}
                            >
                                Daftar
                            </button>
                        </div>
                        </form>
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