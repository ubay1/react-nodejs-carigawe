/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import './editor.css'
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from 'rc-time-picker';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';

import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent,RichTextEditor,   Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { setLoadingScreenHome } from '../../store/loadingScreenHome';
import { RootState } from '../../store/rootReducer';
// import { initialStateUserAuthByAsync } from '../../store/user';
import { useHistory } from 'react-router-dom';
import Lottie from 'lottie-react';
import LoadingScreen from '../../assets/loading_screen.json';
import { HTTPCheckToken, HTTPGetAllJobSocket, HTTPPostJob } from '../../utils/http';
import {httpCheckToken, initialStateUserAuthByAsync} from '../../store/user'
import { setPageActive } from '../../store/pageActive';
import { Slide, toast } from 'react-toastify';
import { setLoading } from '../../store/loading';
import DropZone,{useDropzone} from 'react-dropzone';
import { Typeahead } from 'react-bootstrap-typeahead';
import { dataKota } from '../../utils/interface';
// RichTextEditor.Inject(HtmlEditor, Image, Link, Toolbar);
import TitleForm from './TitleForm'
import socket from '../../utils/socket';



interface IPreviews {
  imagePreview: any, imageContent?: any, 
  isPublish?: any, eventPublish: any
}
function Previews(props: IPreviews) {
  const [filess, setFiles] = useState([]);

  const {getRootProps, getInputProps, isDragActive, isDragReject, fileRejections} = useDropzone({
    accept: 'image/jpeg, image/jpg, image/png',
    maxSize: 100000,
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
    reader.onloadend = function() {
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
        pilih gambar [<span className="italic font-bold">*optional dan max: 100kb</span>]
      </div>
    </div>
    <div className="mx-4 ">
      <div {...getRootProps({className: 'dropzone bg-gray-50 flex flex-col items-center justify-center border-4 border-gray-300 border-dashed mb-2 p-8 focus:outline-none hover:border-4 hover:border-blue-500'})}>
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

const CreateJobs = () => {
  toast.configure()
  const userRedux = useSelector((state: RootState) => state.user)
  const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory();
  
  const [judulContent, setjudulContent] = useState<any>('')
  const [kotaContent, setkotaContent] = useState<any>('')
  const [imagePreview, setimagePreview] = useState('')
  const [imageContent, setimageContent] = useState('')
  const [isPublish, setisPublish] = useState<any>(false)
  const [isiContent, setisiContent] = useState<any>('')
  const [waktuBatasPengiriman, setwaktuBatasPengiriman] = useState<any>('')

  const refKota: any = useRef();
  const refWaktu: any = useRef();

  const showSecond = true;
  const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

  const toolbarSetting = {
    items: ['Bold', 'Italic', 'Underline', 'SourceCode', 'StrikeThrough',
    'FontName', 'FontColor', 'BackgroundColor',
    'Formats', 'Alignments',
    'Outdent', 'Indent',
    'CreateLink',
    'FullScreen', 'Undo', 'Redo']
  }

  const quickToolbarSettings = {
    image: ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-', 'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'],
    link: ['Open', 'Edit', 'UnLink']
  }

  // didmount
  useEffect(() => {
    document.title = 'Cari Gawe - Buat Loker'
    dispatch(setPageActive({ispage: 'createjobs'}))
  }, [])

  useEffect(() => {
    console.log('isi content = ', isiContent)
  }, [isiContent])
  
  useEffect(() => {
    if (userRedux.token !== '') {
      // console.log('ada token di home = ', userRedux.token)
      setTimeout(() => {
        dispatch(setLoadingScreenHome({
          show: false
        }))
      }, 2000)
    } else {
      // console.log('gaada token di home')
      initialStateUserAuthByAsync(dispatch)
      setTimeout(() => {
        dispatch(setLoadingScreenHome({
          show: false
        }))
      }, 2000)
    }
  }, [dispatch, userRedux.token])

  function eventImagePreview(image:any) {
    setimagePreview(image)
  }

  function eventImageContent(image:any) {
    // console.log(image)
    setimageContent(image)
  }

  function eventHandlerPublish(data:any) {
    setisPublish(data)
  }

  type IPostJob = {
    token: string, 
    title: string, 
    image_content?: any, 
    city: string, 
    content: string, 
    expiredAt: string
  }
  const httpPostJob = async (props: IPostJob) => {
    // console.log(props)
    try {
      dispatch(setLoading({
        show: true,
        timeout: 300000
      }))

      if (props.title === '' || props.city === '' || props.content === '' || 
      props.expiredAt === 'Invalid date') {
          dispatch(setLoading({
            show: false,
            timeout: 0
          }))
          toast('form wajib diisi semua', {
            position: "bottom-right",
            autoClose: 5000,
            type: 'error',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            transition: Slide
          })
      } else {
        const responsePostJob = await HTTPPostJob({
          token: props.token,
          title: props.title,
          image_content: props.image_content,
          city: props.city,
          content: props.content,
          expiredAt: props.expiredAt,
        })
  
        // console.log(responsePostJob.data.message)

        setisPublish(true)
        setjudulContent('')
        setkotaContent('')
        refKota.current.clear()
        setisiContent('')
        setwaktuBatasPengiriman('')

        setTimeout(() => {
          dispatch(setLoading({
            show: false,
            timeout: 0
          }))
          toast(responsePostJob.data.message, {
            position: "bottom-right",
            autoClose: 5000,
            type: 'success',
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            transition: Slide
          })
        }, 2000)

        // Emit message to server
        socket.emit('postJob', {msg: 'woyyy'});
        
        const responseGetAllJobSocket = await HTTPGetAllJobSocket()
        console.log(responseGetAllJobSocket)

      }
    } catch (error) {
      console.log(error)
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
    return (
      <>
        <Header sudahDiPage="createjob"/>

      <div className="md:mx-32 relative mt-24">
        {/* <TitleForm title="Jabatan" /> */}
        <div className="mx-4 mt-5">
          <input 
            type="text" 
            name="judul"
            className="w-full h-12 py-2 
            border-b border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e: any) => {
              setjudulContent(e.target.value)
            }}
            value={judulContent}
            placeholder="Masukan jabatan"
          />
        </div>

        {/* <TitleForm title="kota domisili" /> */}
        <div className="z-10 relative mx-4 mt-5">
          <Typeahead
            id="domisili2"
            placeholder="Masukan penempatan kerja"
            onChange={(selected: any) => {
              // console.log(selected)
              if (selected.length !== 0) {
                setkotaContent(selected[0].label.toLowerCase())
              }
            }}
            onInputChange={(e: any) => {
              // console.log(e)
              setkotaContent(e)
            }}
            options={dataKota}
            defaultInputValue={kotaContent}
            ref={refKota}
          />
        </div>

        <MemoPreviews imagePreview={eventImagePreview} imageContent={eventImageContent} isPublish={isPublish} eventPublish={eventHandlerPublish}/>
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

        {/* <input type="file" placeholder="masukan gambar" accept="image/*" onChange={(param: any)=>{
          console.log(param.target.files[0])
        }}/> */}

        <TitleForm title="deskripsi pekerjaan" />
        <div className="md:my-0 mx-4">
          <RichTextEditorComponent
            value={isiContent}
            change={param => {
              // console.log(param?.value)
              setisiContent(param?.value)
            }}
            height={450} 
            toolbarSettings={toolbarSetting} quickToolbarSettings={quickToolbarSettings}>
            <Inject services={[Toolbar, Link, HtmlEditor, QuickToolbar]}/>
          </RichTextEditorComponent>
        </div>

        <TitleForm title="batas pengiriman lamaran" />
        <div className="
          md:p-0 md:justify-start md:bg-transparent
          flex items-center
          mx-4
        ">
          <input 
            type="datetime-local" 
            name="bataspengiriman"
            className=" w-full h-12 
            border-b border-gray-300 focus:outline-none focus:border-blue-500"
            onChange={(e: any) => {
              setwaktuBatasPengiriman(e.target.value)
            }}
            value={waktuBatasPengiriman}
            placeholder="Masukan waktu"
          />
        </div>

        <div className="flex items-center justify-center
          mb-20 mt-6
          md:mb-10
        ">
          <button 
            className="bg-gradient-to-bl from-blue-400 to-blue-500 
            hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400
            cursor-pointer text-white  p-2 rounded-lg
            w-24 focus:outline-none"
            type="submit"
            onClick={() => {
              httpPostJob({
                  token: userRedux.token,
                  title: judulContent,
                  city: kotaContent,
                  image_content: imagePreview,
                  content: isiContent,
                  expiredAt: moment(waktuBatasPengiriman).format('YYYY-MM-DD HH:mm:ss')
                }
              )
              // Emit message to server
              // socket.emit('postJob', 'kirim data lowongan terbaru');
              // const responseGetAllJobSocket = await HTTPGetAllJobSocket()
              // console.log(responseGetAllJobSocket)
            }}
          >Kirim</button>
        </div>
      </div>

        <Footer />
      </>
    )
  }
}


export default CreateJobs