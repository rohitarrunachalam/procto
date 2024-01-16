import React from 'react';
import errorImg from '../../../assets/error.png'
const ExamStop = () => {
  return (
    <div className="flex items-center justify-center h-screen flex-col bg-white">
      <img src={errorImg} className='w-56' />
      <div className='mx-28 text-center'>
      <h1 className='outfit-700 text-[24px]'>Sorry, the test has ended.</h1>
      <p className='outfit-300'>We regret to inform you that your test has been terminated due to the detection of suspicious activity during the examination. The security and integrity of our assessment process are paramount, and any irregularities are taken seriously.</p>
      </div>
     
    </div>
  );
};

export default ExamStop;
