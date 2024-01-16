import React from 'react'
import successImg from '../../../assets/success.png'
export default function ExamSuccess() {
  return (
    <div className='flex items-center justify-center h-screen flex-col bg-white'>
      
      <img src={successImg}  className='w-32'/>
      <div className='mx-28 text-center'>
      <h1 className='outfit-600 text-[24px] mt-4'>You have successfully completed your exam...</h1>
      <div className='outfit-300 text-[#544837]'>Your results will be processed, and you'll receive your scores or feedback as per your institution's or organization's guidelines. If you have any questions or need further assistance, please don't hesitate to reach out to our support team.</div>
      </div>
     
      </div>
  )
}
