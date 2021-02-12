/* eslint-disable array-callback-return */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react'
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
import { initialStateUserAuthByAsync } from '../../store/user';
import { useHistory } from 'react-router-dom';
import Lottie from 'lottie-react';
import LoadingScreen from '../../assets/loading_screen.json';
import { HTTPCheckToken, HTTPPostJob } from '../../utils/http';
import {httpCheckToken} from '../../store/user'
import { setPageActive } from '../../store/pageActive';
import { Slide, toast } from 'react-toastify';
import { setLoading } from '../../store/loading';
import DropZone,{useDropzone} from 'react-dropzone';
// RichTextEditor.Inject(HtmlEditor, Image, Link, Toolbar);

function Previews(props: {imageContent: any}) {
  const [filess, setFiles] = useState([]);
  const [fileKebesaran, setfileKebesaran] = useState('')

  const {getRootProps, getInputProps, isDragActive, isDragReject, fileRejections} = useDropzone({
    accept: 'image/*',
    maxSize: 100000,
    onDrop: (acceptedFiles: any) => {
      console.log('test = ', acceptedFiles[0])

      acceptedFiles.map((file: any) => {
        Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
      });

      setFiles(acceptedFiles)
    }
  });


  const thumbs = filess.map((item: any) => {
    var reader = new FileReader();
    reader.readAsDataURL(item); 
    reader.onloadend = function() {
        var base64data = reader.result;                
        console.log(base64data);
        props.imageContent(base64data)
    }
    return(
      <div key={item.name}>
        <div className="">
          <img
            className="p-1 border-2 border-gray-100 w-24 h-full"
            src={item.preview}
          />
          {item.name}
        </div>
      </div>
    )
  })

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks
    // filess.map((file: any) => {
      console.log(filess)
    //   URL.revokeObjectURL(file.preview)
    // });
  }, [filess]);

  return (
    <>
    <div className="
      md:mt-5
      mt-10 mx-4 mb-1
    "> 
      <div className="text-xs text-gray-400">
        pilih gambar <span className="italic font-bold">*optional</span>
      </div>
    </div>
    <div className="rounded-lg mx-4  border-2 border-gray-100 p-4">
      <div {...getRootProps({className: 'dropzone bg-gray-50 flex flex-col items-center justify-center border-4 border-gray-200 border-dashed mb-2 p-4 focus:outline-none'})}>
        <input {...getInputProps()} />
        <p className="text-gray-300">
          {!isDragActive && 'Klik di sini atau tarik file gambar untuk diunggah!'}
          {isDragActive && !isDragReject && "Type file sesuai!"}
          {isDragReject && "Type file tidak sesuai!"}
          {/* {isDragActive ? "Drop file!" : "klik disini atau tarik file"} */}
        </p>
      </div>
      {/* <div>
        {files}
      </div> */}
      <div>
        {thumbs}
      </div>
    </div>
    <div className="text-blue-500 text-xs mx-4 font-bold">(max: 100kb)</div>
    </>
  );
}

const CreateJobs = () => {
  toast.configure()
  const userRedux = useSelector((state: RootState) => state.user)
  const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory();
  
  const [judulContent, setjudulContent] = useState('')
  const [imageContent, setimageContent] = useState('')
  const [content, setcontent] = useState<any>('')
  const [tanggalBatasPengiriman, settanggalBatasPengiriman] = useState('');
  const [waktuBatasPengiriman, setwaktuBatasPengiriman] = useState('')

  const showSecond = true;
  const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

  const toolbarSetting = {
    items: ['Bold', 'Italic', 'Underline', 'SourceCode', 'StrikeThrough',
    'FontName', 'FontSize', 'FontColor', 'BackgroundColor',
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
    if (userRedux.token !== '') {
      setTimeout(() => {
        dispatch(setLoadingScreenHome({
          show: false
        }))
      }, 2500)
    } else {
      initialStateUserAuthByAsync(dispatch)
    }
  }, [dispatch, history, userRedux.token])

  useEffect(() => {
    console.log(tanggalBatasPengiriman)
  }, [tanggalBatasPengiriman])

  function eventHandlerImage(image:any) {
    // console.log(image)
    setimageContent(image)
  }

  const httpPostJob = async (props: {token: string, userId: any, content: string, expiredAt: string}) => {
    // console.log(props)
    try {
      dispatch(setLoading({
        show: true,
        timeout: 300000
      }))

      if (content === '' || props.expiredAt === ' ') {
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
          userId: props.userId,
          content: props.content,
          expiredAt: props.expiredAt,
        })
  
        console.log(responsePostJob.data.message)
  
        setcontent('')
        setwaktuBatasPengiriman('')
        settanggalBatasPengiriman('')

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

      <div className="md:mx-20">
        <div className="md:mt-5 mt-10 mx-4"> 
          <p className="text-xs text-gray-400">judul content</p>
        </div>
        <div className="mx-4">
          <input 
            type="text" 
            name="judul"
            className=" border-2 border-gray-100 w-full md:w-1/2 h-12 py-2 px-2 
            rounded-lg focus:outline-none"
            onChange={(e: any) => {
              setjudulContent(e.target.value)
            }}
            placeholder="Masukan judul"
          />
        </div>

        <Previews imageContent={eventHandlerImage}/>

        <div className="md:mt-5 mt-10 mx-4"> 
          <p className="text-xs text-gray-400">isi content</p>
        </div>
        <div className=" md:my-0 shadow-md mx-4">
          <RichTextEditorComponent
            value={content}
            change={param => {
              // console.log(param?.value)
              setcontent(param?.value)
            }}
            height={450} 
            toolbarSettings={toolbarSetting} quickToolbarSettings={quickToolbarSettings}>
            <Inject services={[Toolbar, Link, HtmlEditor, QuickToolbar]}/>
          </RichTextEditorComponent>
        </div>

        <div className="md:mt-5 mt-10 mx-4"> 
          <p className="text-xs text-gray-400">batas pengiriman lamaran</p>
        </div>
        
        <div className="
          md:p-0 md:justify-start md:bg-transparent
          flex items-center
          mx-4
        ">
          <DatePicker 
            className="w-full text-lg py-2 px-2 rounded-lg border-2 border-gray-100 focus:outline-none   mr-2
            "
            dateFormat="dd/MM/yyyy"
            placeholderText="Pilih tanggal"
            value={tanggalBatasPengiriman}
            onChange={(date: any) => {
              settanggalBatasPengiriman(moment(date).format('yyyy-MM-DD'))
            }} 
          />
          <TimePicker
            showSecond={showSecond}
            placeholder="Pilih waktu"
            className="ml-2 text-lg py-2 px-2 rounded-lg border-2 border-gray-100 focus:outline-none   mr-2
            "
            // defaultValue={moment()}
            onChange={(value: any) => {
                // console.log(value.format(str));
                setwaktuBatasPengiriman(value.format(str))
            }}
          />,
        </div>
        <div className="flex items-center justify-center
          mb-20 mt-6
          md:mb-10
        ">
          <button 
            className="bg-gradient-to-bl from-blue-400 to-blue-500 
            hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400
            cursor-pointer text-white  p-2 rounded-lg
            w-24"
            type="submit"
            onClick={() => {
              httpPostJob({
                  token: userRedux.token,
                  userId: userRedux.profile.id,
                  content: content,
                  expiredAt: `${tanggalBatasPengiriman} ${waktuBatasPengiriman}`
                }
              )
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