import React from 'react'

type Props = {}

const ExamPaused = (props: Props) => {
  return (
    <div
      className='bg-[#ffcccb] p-8 h-screen'
    >
      <h2 className='outfit-700 text-[24px]'>Exam Paused!</h2>
      <div className='outfit-300'>
      During your online proctored exam, our monitoring system has detected some suspicious activity that warrants further investigation. To maintain the integrity of the assessment process, we have temporarily paused your exam.
      </div>
    </div>
  )
}

export default ExamPaused
