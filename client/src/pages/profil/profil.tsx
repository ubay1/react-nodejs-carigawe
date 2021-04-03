/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import { AppDispatch } from '../../store'
import { setLoadingScreenHome } from '../../store/loadingScreenHome'
import { setPageActive } from '../../store/pageActive'
import { RootState } from '../../store/rootReducer'
// import { initialStateUserAuthByAsync } from '../../store/user'
import Lottie from 'lottie-react';
import LoadingScreen from '../../assets/loading_screen.json';
import profilAccountDefault from '../../assets/avatar3.png';
import profilAccountDefault2 from '../../assets/avatar6.png';
import { HTTPGetAllJob, HTTPGetAllJobUser, HTTPUploadBgFotoProfil, HTTPUploadFotoProfil, HTTPVerifyEmail } from '../../utils/http'
import ReactPlaceholder from 'react-placeholder';
import "react-placeholder/lib/reactPlaceholder.css";
import moment from 'moment'
import parse from 'html-react-parser';
import { AiFillHeart, AiFillLike } from 'react-icons/ai'
import { RiMapPin2Line, RiQuestionAnswerFill, RiPencilFill } from 'react-icons/ri'
import EmptyData from '../../components/EmptyData'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { initialStateUserAuthByAsync, updatePhotoProfile, updateBgPhotoProfile } from '../../store/user'
import { setLoading } from '../../store/loading'
import { Slide, toast } from 'react-toastify'
import { DevUrl } from '../../utils/helper'

import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import './custom-overlay-modal.css';

import DropZone, { useDropzone } from 'react-dropzone';
import { type } from 'os'
import { CobaContext } from '../../components/CobaContext'
import socket from '../../utils/socket'
import { Avatar, Card, CardContent, CardHeader, CardMedia, Divider, Typography } from '@material-ui/core'


interface IPreviews {
  imagePreview: any, imageContent?: any,
  isPublish?: any, eventPublish: any
}
function Previews(props: IPreviews) {
  const [filess, setFiles] = useState([]);

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    accept: 'image/jpeg, image/jpg, image/png',
    maxSize: 500000,
    onDrop: (acceptedFiles: any) => {
      acceptedFiles.map((file: any) => {
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      });

      props.eventPublish(false)

      setFiles(acceptedFiles)
    }
  });

  // ubah ke base64 untuk preview
  filess.map((item: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(item);
    reader.onloadend = function () {
      var base64data = reader.result;
      // console.log(base64data);
      if (props.isPublish === true) {
        props.imagePreview('')
      } else {
        props.imagePreview(base64data)
        props.imageContent(item)
      }
    }
  })

  return (
    <>
      <div className="
      md:mt-5
      mt-5 mx-4 mb-1
    ">
        <div className="text-xs text-black">
          pilih gambar <span className="italic font-bold">max: 500kb</span>
        </div>
      </div>
      <div className="mx-4 ">
        <div {...getRootProps({ className: 'dropzone bg-gray-50 flex flex-col items-center justify-center border-4 border-gray-300 border-dashed mb-2 p-8 focus:outline-none hover:border-4 hover:border-blue-500' })}>
          <input {...getInputProps()} />
          <p className="text-gray-300">
            {!isDragActive && 'Klik di sini atau tarik file gambar untuk diunggah!'}
            {isDragActive && !isDragReject && "Type file sesuai!"}
            {isDragReject && "Type file tidak sesuai!"}
          </p>
        </div>
      </div>
    </>
  );
}

const MemoPreviews = React.memo(Previews)

const ModalDetail = (props: { visibleModal: any, closeModal: any, typeModal: any }) => {
  const [imagePreview, setimagePreview] = useState('')
  const [imageContent, setimageContent] = useState('')
  const [isPublish, setisPublish] = useState<any>(false)
  const userRedux = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()

  function eventImagePreview(image: any) {
    setimagePreview(image)
  }

  function eventImageContent(image: any) {
    setimageContent(image)
  }

  function eventHandlerPublish(data: any) {
    setisPublish(data)
  }

  const httpUploadFotoProfil = async (props: { token: string, photo: string, imageOld?: string }) => {
    try {
      dispatch(setLoading({
        show: true,
        timeout: 300000
      }))

      const responseUploadFotoProfil = await HTTPUploadFotoProfil({
        token: props.token,
        photo: props.photo,
        imageOld: props.imageOld
      })

      dispatch(updatePhotoProfile({
        photo: responseUploadFotoProfil.data.user.photo
      }))

      setTimeout(() => {
        dispatch(setLoading({
          show: false,
          timeout: 0
        }))
        // console.log(responseUploadFotoProfil)
        toast('sukses update foto profil', {
          position: "bottom-right",
          autoClose: 5000,
          type: 'success',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          transition: Slide
        })
      }, 2000)

    } catch (error) {
      console.log(error)
    }
  }

  const httpUploadBgFotoProfil = async (props: { token: string, photo: string, imageOld?: string }) => {
    try {
      dispatch(setLoading({
        show: true,
        timeout: 300000
      }))

      const responseUploadBgFotoProfil = await HTTPUploadBgFotoProfil({
        token: props.token,
        photo: props.photo,
        imageOld: props.imageOld
      })

      dispatch(updateBgPhotoProfile({
        background_image: responseUploadBgFotoProfil.data.user.background_image
      }))

      setTimeout(() => {
        dispatch(setLoading({
          show: false,
          timeout: 0
        }))
        // console.log(responseUploadFotoProfil)
        toast('sukses update background foto', {
          position: "bottom-right",
          autoClose: 5000,
          type: 'success',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          transition: Slide
        })
      }, 2000)

    } catch (error) {
      console.log(error)
    }
  }

  const clearPreview = () => {
    setisPublish(true)
    setimageContent('')
    setimagePreview('')
    props.closeModal()
  }

  return (
    <Modal
      open={props.visibleModal}
      onClose={() => {
        setimageContent('')
        setimagePreview('')
        props.closeModal()
      }}
      center
      closeOnOverlayClick={false}
      closeOnEsc={false}
      classNames={{
        overlay: 'customOverlay'
      }}
    >
      <MemoPreviews
        imagePreview={eventImagePreview}
        imageContent={eventImageContent}
        isPublish={isPublish}
        eventPublish={eventHandlerPublish}
      />
      {
        imagePreview !== ''
          ?
          <div className="mx-4 mt-2 mb-5">
            <img
              className="p-1 border-2 border-gray-100 w-24 h-full"
              src={imagePreview}
            />
          </div>
          : <div className="mb-5"></div>
      }

      <div className="flex items-center justify-center
          mt-6
        ">
        <button
          className="bg-gradient-to-bl from-blue-400 to-blue-500 
            hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400
            cursor-pointer text-white  p-2 rounded-lg
            w-24 focus:outline-none"
          type="submit"
          onClick={() => {
            if (props.typeModal === 'foto') {
              httpUploadFotoProfil({
                token: userRedux.token,
                photo: imagePreview,
                imageOld: userRedux.profile.photo === "" ? "not_found" : userRedux.profile.photo
              })
            } else {
              httpUploadBgFotoProfil({
                token: userRedux.token,
                photo: imagePreview,
                imageOld: userRedux.profile.background_image === null || userRedux.profile.background_image === '' ? "not_found" : userRedux.profile.background_image
              })
            }

            clearPreview()

          }}
        >Kirim</button>
      </div>
    </Modal>
  );
}

const AllPost = ({ dataJob, isLoading, fotoProfil }: any): any => {
  const {totalLike, setTotalLike}= useContext(CobaContext)
  const userRedux = useSelector((state: RootState) => state.user)
  const [foto, setFoto] = useState('')
  const [gender, setGender] = useState<any>('')

  useEffect(() => {
    if (userRedux.profile.photo !== '') {
      setFoto(fotoProfil)
      setGender(userRedux.profile.gender)
    } else {
      setGender(userRedux.profile.gender)
    }
  }, [userRedux])

  return (
    <div>
      {
        isLoading === true
        ? 
          <div className="flex items-center justify-center mb-14">
            <Loader
              type="Rings"
              color="#00BFFF"
              height={100}
              width={100}
              // timeout={3000} //3 secs
            />
          </div>
        :
        dataJob.length === 0
        ? 
        <div
          className="
            h-screen-8
            flex flex-col items-center justify-center
          "
        >
          <EmptyData />
        </div>
        :
        <div className=" 
          lg:grid-cols-lg-3cols-content
          md:grid-cols-lg-2cols-content md:my-6 md:mb-24
          sm:grid-cols-1
          xs:grid-cols-1
          xs:grid
          sm:mt-6
          gap-y-4
          mb-40 mt-6
          h-full
        ">
          {
            dataJob.map((item: any, index: number) => {
              const isExpired = moment().isAfter(item.expiredAt)
              return(
                <Card className="mb-2 mx-2" key={index}>
                  <CardHeader
                    avatar={
                      item.photo !== ''
                        ?
                        <Avatar aria-label="recipe" src={`${DevUrl}/profile/${item.user.photo}`} />
                        :
                        <Avatar aria-label="recipe" className="bg-red-500">
                          {
                            item.user.name.slice(0, 1)
                          }
                        </Avatar>
                    }

                    action={
                      isExpired === true
                        ?
                        <div className="text-white text-xs bg-red-500 p-2 mt-3 rounded-sm shadow">
                          sudah tutup
                        </div>
                        :
                        <div className="text-white text-xs bg-green-500 p-2 mt-3 rounded-sm shadow">
                          masih buka
                        </div>
                    }

                    title={item.user.name.charAt(0).toUpperCase() + item.user.name.slice(1)}
                    subheader={moment(item.createdAt).format('MMM DD, YYYY')}
                  />

                  {
                    item.image_content !== ''
                      ?
                      <CardMedia
                        className="h-36"
                        image={`${DevUrl}/jobs/${item.image_content}`}
                        title={`Loker ${item.title}`}
                      />
                      :
                      <div className="text-white bg-gradient-to-b from-blue-400 
                        to-blue-500  rounded-t-lg flex items-center justify-center h-full">
                        <div className="font_damion text-4xl opacity-40 ">
                          Cari Gawe
                          </div>
                      </div>
                  }


                  {/* grid grid-rows-lg-7rows-home-list-job */}
                  <CardContent>
                    <Typography color="textPrimary" component="div" className="flex items-center justify-between">
                      <div className="flex items-center justify-start line-clamp-1">
                        <div className="text-xl font-semibold">{item.title}</div>
                      </div>
                    </Typography>
                    <div className="flex items-center justify-start text-sm rounded-sm mb-1">
                      <RiMapPin2Line /> {item.city}
                    </div>
                    <Divider className="mb-2" />
                    <Typography variant="body2" color="textSecondary" component="div" className="line-clamp-3">
                      {
                        parse(item.content)
                      }
                    </Typography>
                    <div className="">
                      <button id={`btn-readmore-${index}`} className="
                          text-xs p-1 rounded
                          text-blue-500 
                          bg-blue-100
                          focus:outline-none
                          hover:shadow-inner
                          "
                        onClick={() => {
                        }}
                      >
                        Lihat selengkapnya
                          </button>
                    </div>
                  </CardContent>

                  <Divider />
                    <Typography variant="body2" gutterBottom className="">
                      <div className="flex flex-row justify-center items-center py-2 focus:outline-none rounded-bl-lg w-full">
                        <AiFillLike className="text-blue-500 text-md mr-1" size={17}/>
                        {item.likes.length} suka
                      </div>
                    </Typography>

                </Card>
              )
            })
          }
        </div>
      }
    </div>
  )
}

const Profil = () => {
  toast.configure()
  const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
  const userRedux = useSelector((state: RootState) => state.user)
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory();

  const [typeModal, setTypeModal] = React.useState('')
  const [visibleModal, setVisibleModal] = React.useState(false)
  const onOpenModal = () => setVisibleModal(true);
  const onCloseModal = () => setVisibleModal(false);

  function eventCloseModal() {
    onCloseModal()
  }

  const [allPostJob, setallPostJob] = useState<any[]>([])
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    document.title = 'Cari Gawe - Profil'
    dispatch(setPageActive({ ispage: 'profil' }))
  }, [])

  const httpGetAllJobUser = async (token: string) => {
    try {
      const responseGetAllJobUser = await HTTPGetAllJobUser({
        token: token
      })
      setallPostJob(responseGetAllJobUser.data.data)
      // setTimeout(() => {
      setisLoading(false)
      // }, 5000)
    } catch (error) {
      console.log(error)
    }
  }

  const httpVerifyEmail = async () => {
    try {
      dispatch(setLoading({
        show: true,
        timeout: 300000
      }))
      const responseVerifyEmail = await HTTPVerifyEmail({
        token: userRedux.token,
        email: userRedux.profile.email
      })

      setTimeout(() => {
        dispatch(setLoading({
          show: false,
          timeout: 0
        }))
        toast(responseVerifyEmail.data.message, {
          position: "bottom-right",
          autoClose: 5000,
          type: 'success',
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          transition: Slide
        })
      }, 2000)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    // get new data job
    socket.on('getNewDataJobUser', (data: any) => {
      console.log('ada yang like postingan kamu nih')
      setallPostJob(data)
    })
    // Get room and users
    socket.on('roomUsers', ({ room, users }: any) => {
      console.log(users)
    });
    return () => {
      socket.off('getNewDataJobUser')
      socket.off('roomUsers')
    }
  }, [socket])
  
  useEffect(() => {
    if (userRedux.token !== '') {
      // console.log('ada token di home = ', userRedux.token)
      httpGetAllJobUser(userRedux.token)
      setTimeout(() => {
        dispatch(setLoadingScreenHome({
          show: false
        }))
      }, 2000)
    } else {
      initialStateUserAuthByAsync(dispatch)
      setTimeout(() => {
        dispatch(setLoadingScreenHome({
          show: false
        }))
      }, 2000)
    }
  }, [dispatch, userRedux.token])

  if (loadingScreenHomeRedux.show === true) {
    return (
      <div className="flex items-center justify-center flex-col h-screen">
        <Lottie animationData={LoadingScreen} style={{ width: 200 }} />
      </div>
    )
  } else {
    return (
      <>
        <Header sudahDiPage="profil" />
        <ModalDetail visibleModal={visibleModal} closeModal={eventCloseModal} typeModal={typeModal} />

        <div className="relative top-14 h-56">
          <div className="relative bg-gradient-to-b from-white to-blue-200
              rounded-t-lg h-full py-6 flex flex-col items-center justify-center">
            {
              userRedux.profile.background_image === ''
                ?
                <div className="absolute left-0 right-0 mr-auto ml-auto text-center z-0 font_damion md:text-9xl xs:text-8xl text-6xl opacity-40 
                text-blue-300 ">
                  Cari Gawe
                  </div>
                :
                <div className="absolute left-0 right-0 mr-auto ml-auto text-center z-0 h-56">
                  <img
                    className="h-full w-full object-cover filter-brightness"
                    src={`${DevUrl}/bg_profile/${userRedux.profile.background_image}`}
                    alt=""
                  />
                </div>
            }
            {/* button ganti foto */}
            <div className="absolute top-5 right-5 z-20">
              <button className="bg-gradient-to-tr from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 shadow-blue focus:outline-none p-2  rounded-full"
                onClick={() => {
                  setTypeModal('bg_foto')
                  onOpenModal()
                }}
              >
                <RiPencilFill color="white" size="14" />
              </button>
            </div>
          </div>
          <div className="
              xs:text-left
              absolute bottom-0 left-0 right-0 mr-auto ml-auto text-center
              w-full
            ">
            <div className="
                xs:m-2
                xs:h-full
                xs:flex-row xs:items-center xs:justify-start
                xs:mb-2
                flex flex-col items-center justify-center
              ">
              <div className="mr-2">
                <div className="relative">
                  {
                    userRedux.profile.photo === ''
                      ?
                      userRedux.profile.gender === 'L'
                        ?
                        <img
                          src={profilAccountDefault}
                          alt="foto-profil"
                          className="relative z-10 h-20 w-20 rounded-full shadow-md"
                        />
                        :
                        <img
                          src={profilAccountDefault2}
                          alt="foto-profil"
                          className="relative z-10 h-20 w-20 rounded-full shadow-md"
                        />
                      :
                      <img
                        src={`${DevUrl}/profile/${userRedux.profile.photo}`}
                        alt="foto-profil"
                        className="h-20 w-20 relative z-10 rounded-full shadow-md object-cover"
                      />
                  }
                  {/* button ganti foto */}
                  <div className="absolute bottom-0 right-0 z-20">
                    <button className="bg-gradient-to-tr from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500 shadow-blue focus:outline-none p-2  rounded-full"
                      onClick={() => {
                        setTypeModal('foto')
                        onOpenModal()
                      }}
                    >
                      <RiPencilFill color="white" size="14" />
                    </button>
                  </div>
                </div>

              </div>

              <div className="bg-white 
              p-2 shadow-md 
              rounded-lg 
              my-2
              xs:my-0
              xs:mb-0 xs:ml-2
              xs:absolute xs:left-24 
              profill">
                <div className="text-lg font-bold relative z-10 ">{userRedux.profile.name}</div>
                <div className="text-xs relative z-10 ">
                  <div className="flex flex-col xs:flex-row  items-center">
                    <div>{userRedux.profile.email}</div>
                    {
                      userRedux.profile.email_verif === false
                        ?
                        <div>
                          <button
                            onClick={() => {
                              httpVerifyEmail()
                            }}
                            className="
                            xs:ml-1
                            bg-gradient-to-bl from-red-400 to-red-500 
                            hover:bg-gradient-to-bl hover:from-red-500 hover:to-red-400
                            cursor-pointer text-white shadow-red p-1 rounded-md text-xs ml-0
                            focus:outline-none">
                            verif email
                          </button>
                        </div>
                        : <div></div>
                    }
                  </div>
                </div>
                <p className="text-xs relative z-10 ">{userRedux.profile.phone}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center my-4 mt-20 font-bold ">
          <h1 className=" p-1 border-b-4 border-blue-400">Semua Postingan</h1>
        </div>
        <AllPost dataJob={allPostJob} isLoading={isLoading} fotoProfil={userRedux.profile.photo} />

        <Footer />
      </>
    )
  }
}

export default Profil;

function setdataRecruiter(data: any) {
  throw new Error('Function not implemented.')
}
