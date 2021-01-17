/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ToastContainer, toast, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AppDispatch } from '../store';
import { RootState } from '../store/rootReducer';
import { setToast, setToastShow } from '../store/toast';

const Toast = () => {
    const toaster = useSelector((state: RootState) => state.toast)
    const dispatch: AppDispatch = useDispatch()
    const customId = "custom-id-yes";
    
    useEffect(() => {
        toast.configure()
        // toast.dismiss()

        
        if (toaster.show === true) {
            console.log("toast show")
        } else {
            console.log("toast hide")
        }
    }, [toaster])

    const ShowToast = () => {
        toast(toaster.message, {
            position: "bottom-center",
            autoClose: 5000,
            onClose: (props) => {
                dispatch(setToast({
                    show: false,
                    message: ''
                }))
            },
            type: 'dark',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            toastId: customId
        })
    };

    return(
        <div>
            {
                toaster.show === true
                ?
                <>
                {/* {ShowToast()} */}
                <ToastContainer transition={Slide}></ToastContainer>
                </>
                : <div></div>
            }
        </div>
    )
}

export default Toast;