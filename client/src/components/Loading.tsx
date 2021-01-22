/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../assets/loading.gif';
import { AppDispatch } from '../store';
import { RootState } from '../store/rootReducer';
import { setLoadingShow } from '../store/loading';
import Lottie from 'lottie-react';
import LoadingAction from '../assets/loading.json';

const Loading = () => {
    const loading = useSelector((state: RootState) => state.loading)
    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        if (loading.show === true) {
            console.log("triger timmer")

            let timer = setTimeout(() => {
                console.log("Timeout Process Please Try Again")
                dispatch(setLoadingShow(false))
            }, loading.timeout);
            return () =>{
                clearTimeout(timer)
                dispatch(setLoadingShow(false))
            };
        }
    }, [loading])

    return(
        <div>
            {
                loading.show === true
                ?
                <div className="w-full h-full bg-black bg-opacity-80 fixed text-white z-50 flex justify-center">
                    <div className="loading-body flex items-center">
                        {/* <img
                            className="m-auto"
                            alt="loading"
                            src={Spinner}
                            width="50%"
                        /> */}
                        <Lottie  animationData={LoadingAction} style={{width: 500}} />
                    </div>
                </div>
                : <div></div>
            }
        </div>
    )
}

export default Loading;