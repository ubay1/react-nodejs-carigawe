/* eslint-disable @typescript-eslint/no-unused-vars */
// import { HTTPGetUser } from '../pages/login/script';
// import { setLoadingAuth } from './loadingAuth';
// import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatch } from '.';
import { setLoading } from './loading';
import Cookies from 'js-cookie';
import { HTTPCheckToken, HTTPGetUser } from '../utils/http';
import { setLoadingScreenHome } from './loadingScreenHome';

export interface IUserProfile {
  id?: string,
  name?: string,
  phone?: string,
  email?: string,
  email_verif?: boolean,
  photo?: string,
  background_image?: string,
  recruiter?: string,
  job_seeker?: string,
  gender?: string,
}

export interface UserState {
  token: string | any,
  // loginWith: string;
  profile: IUserProfile,
}

const initialState: UserState = {
  token: '',
  // loginWith: '',
  profile: {
    // id: '',
    name: '',
    phone: '',
    email: '',
    email_verif: false,
    photo: '',
    background_image: '',
    recruiter: '',
    job_seeker: '',
    gender: '',
  },
}

export const httpCheckToken = async (token: any) => {
  try {
    const responseCheckToken = await HTTPCheckToken({
      token: token
    })
    //   console.log(responseCheckToken)
    return responseCheckToken.data.isExpired
  } catch (error) {
    //   console.log(error)
  }
}

export const expiredToken = (dispatch: AppDispatch) => {
  Cookies.remove('token')
  dispatch(setAuthStatus({
    token: ''
  }))
  dispatch(setReduxUsersProfile({
    // id: '',
    name: '',
    phone: '',
    email: '',
    email_verif: false,
    photo: '',
    background_image: '',
    recruiter: '',
    job_seeker: '',
    gender: '',
  }))
  dispatch(setLoadingScreenHome({
    show: false
  }))
}

// untuk ambil data user
export const initialStateUserAuthByAsync = async (dispatch: AppDispatch) => {
  return new Promise<UserState>(async (resolve, reject) => {
    let defaultValue: UserState = {
      token: '',
      // loginWith: '',
      profile: {
        // id: '',
        name: '',
        phone: '',
        email: '',
        email_verif: false,
        photo: '',
        background_image: '',
        recruiter: '',
        job_seeker: '',
        gender: '',
      },
    }

    try {
      const tokens = Cookies.get('token') === '' ? '' : Cookies.get('token')
      if (typeof Cookies.get('token') === 'undefined') {
        expiredToken(dispatch)
      } else {
        if (tokens === '') {
          expiredToken(dispatch)
        } else {
          const isexpired = await httpCheckToken(tokens)

          // jika ada data token
          if (isexpired === false) {
            defaultValue.token = tokens

            if (defaultValue.token !== '') {
              try {
                const responseGetUser = await HTTPGetUser({
                  token: defaultValue.token
                })

                // console.log(responseGetUser)

                if (responseGetUser.status === 200) {
                  // console.log('get user');
                  dispatch(setReduxUsersProfile({
                    // id: responseGetUser.data.id,
                    name: responseGetUser.data.data.name,
                    phone: responseGetUser.data.data.phone,
                    email: responseGetUser.data.data.email,
                    email_verif: responseGetUser.data.data.email_verif,
                    photo: responseGetUser.data.data.photo,
                    background_image: responseGetUser.data.data.background_image,
                    recruiter: responseGetUser.data.data.recruiter,
                    job_seeker: responseGetUser.data.data.job_seeker,
                    gender: responseGetUser.data.data.gender,
                  }))
                }

                dispatch(setAuthStatus({
                  token: defaultValue.token,
                }))

                // dispatch(setLoadingAuth({ loadingAuth: false }))

              } catch (error) {
                console.log(error)
                // dispatch(setLoadingAuth({ loadingAuth: false }))
              }

            } else {
              setTimeout(() => {
                // dispatch(setLoadingAuth({loadingAuth: false }))
              }, 1000)
            }
          } else {
            expiredToken(dispatch)
          }
        }
      }
    } catch (e) {
      // error reading value
      console.trace(e.message)
    }
    return defaultValue
  })
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setReduxUsersProfile(state, action: PayloadAction<IUserProfile>) {
      // state.profile.id = action.payload.id
      state.profile.name = action.payload.name
      state.profile.phone = action.payload.phone
      state.profile.email = action.payload.email
      state.profile.email_verif = action.payload.email_verif
      state.profile.photo = action.payload.photo
      state.profile.background_image = action.payload.background_image
      state.profile.recruiter = action.payload.recruiter
      state.profile.job_seeker = action.payload.job_seeker
      state.profile.gender = action.payload.gender
    },

    // updateReduxDeviceRoom: (state, action: PayloadAction<any>) => {
    //     console.log(action.payload)
    //     return {...state,
    //         devices: state.devices.map((item: any) => 
    //             item.tuya.device_id === action.payload[0].tuya.device_id
    //             ? 
    //             {...item,
    //                 room_index: action.payload[0].room_index,
    //                 _id: action.payload[0]._id,
    //                 user_id: action.payload[0].user_id,
    //                 room_id: action.payload[0].room_id,
    //                 device_name: action.payload[0].device_name,
    //                 tuya: action.payload[0].tuya,
    //                 device_id: action.payload[0].device_id,
    //                 product_name: action.payload[0].product_name,
    //                 product_id: action.payload[0].product_id,
    //                 device_type: action.payload[0].device_type,
    //                 online: action.payload[0].online,
    //                 last_switch: 
    //                 action.payload[1] === 'power' ?
    //                     action.payload[0].last_switch === true ? false : true
    //                 : action.payload[0].last_switch,
    //                 paired_at: action.payload[0].paired_at,
    //                 config: typeof action.payload.config === 'undefined' && typeof action.payload[1] === 'undefined'
    //                 ? '' 
    //                 : {
    //                     bright: action.payload[1] === 'brightness' 
    //                     ? action.payload[2].value
    //                     : action.payload[0].config.bright,

    //                     color: action.payload[1] === 'color'
    //                     ? {
    //                         h: action.payload[2].value.h,
    //                         s: action.payload[2].value.s,
    //                         v: action.payload[2].value.v,
    //                     }
    //                     : action.payload[0].config.color,

    //                     mode: action.payload[1] === 'mode'
    //                     ? action.payload[2].key === 'M0'
    //                     ? 'cool' : action.payload[2].key === 'M1'
    //                         ? 'heat' : action.payload[2].key === 'M2'
    //                             ? 'auto' : action.payload[2].key === 'M3'
    //                                 ? 'fan' : action.payload[2].key === 'M4'
    //                                     ? 'dry' : ''
    //                     : action.payload[0].config.mode,

    //                     temperature: action.payload[1] === 'temperature' 
    //                     ? action.payload[2].value
    //                     : action.payload[0].config.temperature,
    //                 },
    //             }
    //             : item
    //         )
    //     }
    // },

    setAuthStatus(state, action: PayloadAction<{ token: string }>) {
      state.token = action.payload.token
      Cookies.set('token', action.payload.token)
    },
  },
})
export const {
  setReduxUsersProfile,
  setAuthStatus,
} = userSlice.actions
export default userSlice.reducer