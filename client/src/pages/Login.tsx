/* eslint-disable no-restricted-globals */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import image_login from '../assets/image_login.png';
import AnimationAuth from './AnimationAuth';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { Slide, toast } from 'react-toastify';
import { setLoading } from '../store/loading';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../store';
import { HTTPGetUser, HTTPLoginUser } from '../utils/http';
import Cookies from 'js-cookie';
import { initialStateUserAuthByAsync, setAuthStatus, setReduxUsersProfile } from '../store/user';
import { RootState } from '../store/rootReducer';
import { setLoadingScreenHome } from '../store/loadingScreenHome';
import Lottie from 'lottie-react';
import LoadingScreen from '../assets/loading_screen.json';


const Login = () => {
    toast.configure()
    const dispatch: AppDispatch = useDispatch()
    const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
    const userRedux = useSelector((state: RootState) => state.user)
    const history = useHistory();

    useEffect(() => {
        if(userRedux.token !== '') {
            setTimeout(() => {
                dispatch(setLoadingScreenHome({
                    show: false
                }))
                history.push('/')
            }, 2500)
        } else {
            initialStateUserAuthByAsync(dispatch)
        }
    }, [dispatch, history, userRedux.token])

    const formik = useFormik({
        initialValues: {
          email: '',
          password: '',
        },
        onSubmit: values => {
            httpLoginUser(values)
          console.log(JSON.stringify(values, null, 2));
        },
        validationSchema: Yup.object({
            email: Yup.string()
              .email("Invalid email format")
              .required("Wajib diisi"),
            password: Yup.string()
              .required("Wajib diisi"),
        })
    });

    const httpLoginUser = async (params: any) => {
        try {
            const responseLoginUser = await HTTPLoginUser({
                email: params.email,
                password: params.password,
            })

            if (responseLoginUser.status === 200) {
                toast(responseLoginUser.data.message, {
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

                const responseGetUser = await HTTPGetUser({
                    token: responseLoginUser.data.accessToken
                })

                dispatch(setAuthStatus({
                    token: responseLoginUser.data.accessToken
                }))
                dispatch(setReduxUsersProfile({
                    email: responseGetUser.data.email,
                    email_verif: responseGetUser.data.email_verif,
                    job_seeker: responseGetUser.data.job_seeker,
                    recruiter: responseGetUser.data.recruiter,
                    name: responseGetUser.data.name,
                    phone: responseGetUser.data.phone,
                    phone_verif: responseGetUser.data.phone_verif,
                    photo: responseGetUser.data.photo,
                }))

                // const datauser = JSON.stringify(responseLoginUser.data.data)
                // localStorage.setItem('user', datauser)
    
                history.push('/')
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
                            <form onSubmit={formik.handleSubmit}>
                                <div className="mt-6">
                                    <div className="text-sm font-bold text-gray-700 tracking-wide">Email</div>
                                    <input 
                                        autoComplete="true"
                                        name="email"
                                        className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                        type="" placeholder="jhon@mail.com" 
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
                                        <div>
                                            <a className="text-xs font-display font-semibold text-blue-600 hover:text-blue-800
                                            cursor-pointer">
                                                Lupa Password?
                                            </a>
                                        </div>
                                    </div>
                                    <input 
                                        name="password"
                                        className="w-full text-lg py-2 border-b border-gray-300 focus:outline-none focus:border-blue-500" 
                                        type="password" 
                                        placeholder="Enter your password" 
                                        onChange={formik.handleChange}
                                        value={formik.values.password}
                                    />
                                    {formik.errors.password && formik.touched.password && (
                                        <p className="text-red-400">{formik.errors.password}</p>
                                    )}
                                </div>
                                <div className="mt-10">
                                    <button className="bg-blue-500 text-gray-100 p-4 w-full rounded-full tracking-wide
                                    font-semibold font-display focus:outline-none focus:shadow-outline hover:bg-blue-600
                                    shadow-lg"
                                    type="submit"
                                    >
                                        Masuk
                                    </button>
                                </div>
                            </form>
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
}

export default Login;