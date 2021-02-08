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
import { HTTPCheckToken } from '../../utils/http';
import {httpCheckToken} from '../../store/user'
import { setPageActive } from '../../store/pageActive';

// RichTextEditor.Inject(HtmlEditor, Image, Link, Toolbar);

export default function CreateJobs() {
  const userRedux = useSelector((state: RootState) => state.user)
  const loadingScreenHomeRedux = useSelector((state: RootState) => state.loadingScreenHome)
  const dispatch: AppDispatch = useDispatch()
  const history = useHistory();
  
  const [content, setcontent] = useState<any>('')
  const [tanggalBatasPengiriman, settanggalBatasPengiriman] = useState('');
  const [waktuBatasPengiriman, setwaktuBatasPengiriman] = useState('')

  const showSecond = true;
  const str = showSecond ? 'HH:mm:ss' : 'HH:mm';

  const toolbarSetting = {
    items: ['Bold', 'Italic', 'Underline', 'SourceCode', 'StrikeThrough',
    'FontName', 'FontSize', 'Image', 'FontColor', 'BackgroundColor',
    'LowerCase', 'UpperCase', '|',
    'Formats', 'Alignments', 'OrderedList', 'UnorderedList',
    'Outdent', 'Indent', '|',
    'CreateLink', '|', 'ClearFormat', 'Print',
    'FullScreen', '|', 'Undo', 'Redo']
  }

  const quickToolbarSettings = {
    image: ['Replace', 'Align', 'Caption', 'Remove', 'InsertLink', 'OpenImageLink', '-', 'EditImageLink', 'RemoveImageLink', 'Display', 'AltText', 'Dimension'],
    link: ['Open', 'Edit', 'UnLink']
  }

  // didmount
  useEffect(() => {
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

  // cek apakah token expired
  const cekToken = () => {
    httpCheckToken(userRedux.token)
    .then(res => {
      console.log('apakah token expired ? oh ', res)
      if (res === false) {

      }
    })
    .catch(err => {
      console.log(err)
    }) 
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

        <div className="
          md:mt-5
          mt-10 mx-4
        "> <p className="text-xs text-gray-400">isi content</p>
        </div>
        <div className="
          md:my-0
          shadow-lg mx-4
        ">
          <RichTextEditorComponent
            value={content}
            change={param => {
              // console.log(param?.value)
              setcontent(param?.value)
            }}
            height={450} 
            toolbarSettings={toolbarSetting} quickToolbarSettings={quickToolbarSettings}>
            <Inject services={[Toolbar, Image, Link, HtmlEditor, QuickToolbar]}/>
          </RichTextEditorComponent>
        </div>

        <div className="
          md:mt-5
          mt-10 mx-4
        "> <p className="text-xs text-gray-400">batas pengiriman lamaran</p>
        </div>
        
        <div className="
          md:p-0 md:justify-start md:bg-transparent
          flex items-center
          mx-4
        ">
          <DatePicker 
            className="w-full text-lg py-2 px-2 border-2 rounded-lg border-gray-50 focus:outline-none  shadow-md mr-2
            "
            dateFormat="dd/MM/yyyy"
            placeholderText="pilih tanggal"
            value={tanggalBatasPengiriman}
            onChange={(date: any) => {
              settanggalBatasPengiriman(moment(date).format('DD-MM-yyyy'))
            }} 
          />
          <TimePicker
            showSecond={showSecond}
            placeholder="pilih waktu"
            className="ml-2 text-lg py-2 px-2 border-2 rounded-lg border-gray-50 focus:outline-none  shadow-md mr-2
            "
            onChange={(value: any) => {
                // console.log(value.format(str));
                setwaktuBatasPengiriman(value.format(str))
            }}
          />,
        </div>
        <div 
          className="flex items-center justify-center
          mb-20 mt-6
          md:mb-10
        ">
          <button 
            className="bg-gradient-to-bl from-blue-400 to-blue-500 
            hover:bg-gradient-to-bl hover:from-blue-500 hover:to-blue-400
            cursor-pointer text-white shadow-md p-2 rounded-lg
            w-24"
            onClick={() => {
              cekToken()
            }}
          >Kirim</button>
        </div>

        <Footer />
      </>
    )
  }
}
