/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { toast, Slide } from 'react-toastify';
import { AppDispatch } from '../../store';
import {setLoading} from '../../store/loading'
import { setLoadingScreenHome } from '../../store/loadingScreenHome';
import {HTTPRegisterUser} from '../../utils/http';
import { registerUser } from '../../utils/interface';
import AnimationAuth from '../AnimationAuth';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { RootState } from '../../store/rootReducer';
// import { initialStateUserAuthByAsync } from '../store/user';
import Lottie from 'lottie-react';
import LoadingScreen from '../../assets/loading_screen.json';
import { initialStateUserAuthByAsync } from '../../store/user';

const Register = () => {
    toast.configure()
    const [successAction, setsuccessAction] = useState(false)
    const [failedAction, setfailedAction] = useState(false)

    const dispatch: AppDispatch = useDispatch()
    const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
    const userRedux = useSelector((state: RootState) => state.user)
    const history = useHistory();

    useEffect(() => {
        document.title = 'Cari Gawe - Pendaftaran'
        setTimeout(() => {
            dispatch(setLoadingScreenHome({
              show: false
            }))
        }, 2000)
    }, [])

    // useEffect(() => {
    //     if (userRedux.token !== '') {
    //       setTimeout(() => {
    //         dispatch(setLoadingScreenHome({
    //           show: false
    //         }))
    //         history.push('/')
    //       }, 2500)
    //     } else {
    //       initialStateUserAuthByAsync(dispatch)
    //       setTimeout(() => {
    //         dispatch(setLoadingScreenHome({
    //           show: false
    //         }))
    //         history.push('/')
    //       }, 2500)
    //     }
    //   }, [dispatch, history, userRedux.token])
    
    const formik = useFormik({
        initialValues: {
          name: '',
          phone: '',
          gender: '',
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

            // console.log(JSON.stringify(values, null, 2));
          
        },
        validationSchema: Yup.object({
            name: Yup.string()
              .required("Wajib diisi"),
            phone: Yup.number()
            .required("Wajib diisi"),
            gender: Yup.string()
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
                gender: params.gender,
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
            <div className="lg:flex">
                <div className="lg:w-1/2 xl:max-w-screen-sm">
                    <div className="
                        px-4 mb-10
                        bg-white
                        sm:px-24 
                        md:px-48 
                        lg:px-12 lg:mt-0 lg:mb-0 lg:flex lg:flex-col lg:justify-start lg:shadow-lg lg:pb-4
                        
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
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-bold text-gray-700 tracking-wide">
                                            Jenis Kelamin
                                        </div>
                                    </div>
                                    <div className="flex flex-row">
                                        <div className="inline-flex items-center mt-3 w-1/2">
                                            <input 
                                                type="radio" 
                                                id="Laki" 
                                                name="gender" 
                                                className="h-5 w-5 text-gray-600" 
                                                value="L"
                                                onChange={formik.handleChange}
                                            />
                                            <label htmlFor="Laki" className="ml-2 text-gray-700">Laki-Laki
                                            </label>
                                        </div>
                                        <div className="inline-flex items-center mt-3 w-1/2">
                                            <input 
                                                type="radio" 
                                                id="Perempuan" 
                                                name="gender" 
                                                className="h-5 w-5 text-gray-600" 
                                                value="P"
                                                onChange={formik.handleChange}
                                            />
                                            <label htmlFor="Perempuan" className="ml-2 text-gray-700">Perempuan</label>
                                        </div>
                                    </div>
                                    {formik.errors.gender && (
                                        <p className="text-red-400">{formik.errors.gender}</p>
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
                                    className="bg-gradient-to-bl from-blue-400 to-blue-500 hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400 text-gray-100 p-4 w-full rounded-full tracking-wide font-semibold font-display focus:outline-none focus:shadow-outline shadow-lg"
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
}

export default Register;