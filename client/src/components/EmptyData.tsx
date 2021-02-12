/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react'
import Lottie from 'lottie-react';
import EmptyPost from '../assets/empty2.json';

const EmptyData = () => (
  <div className="flex flex-col items-center justify-center">
    <Lottie animationData={EmptyPost} style={{ width: 200 }} />
    Belum ada postingan
  </div>
)

export default EmptyData;