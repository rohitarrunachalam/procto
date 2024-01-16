import React from 'react'
import questions from './questions'
import { useDispatch } from 'react-redux';
import { setBoolean } from './submitSlice';
import Webcam from "react-webcam";
import WebLiveCapture from './WebLiveCapture'

type Props = {}

const Exam = (props: Props) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setBoolean(true));
  };
  return (
    <div className='flex'
     
    >
      <div className='bg-[#F8F1D8] w-[25%] flex flex-col '>
        <div className='mt-[30%] mx-10'>
        <WebLiveCapture />
        <div className='flex'>
          <h1 className='outfit-600 text-[16px]'>Student Name:</h1><span className='ml-2 outfit-300'>Rohit R</span>
        </div>
        <div className='flex mt-2'>
          <h1 className='outfit-600 text-[16px]'>Student ID:</h1><span className='ml-2 outfit-300'> 21110433</span>
        </div>
        <div className='flex mt-2'>
          <h1 className='outfit-600 text-[16px]'>Class:</h1><span className='ml-2 outfit-300'> IOT B</span>
        </div>
        <div>
          <h1 className='outfit-600 text-[16px] mt-2'>Instructions:</h1>
          <ul className='list-disc ml-4'>
          <li className='mt-2 outfit-300'>Cursor Within Bounds: Keep the mouse cursor within the designated exam window or application at all times.</li>

<li className='mt-2 outfit-300'>No New Tabs or Windows: Refrain from opening new browser tabs or windows during the examination.</li>

<li className='mt-2 outfit-300'>Background Applications: Close or disable any unauthorized browser or chat applications running in the background while taking the exam.</li>

<li className='mt-2 outfit-300'>Follow Communication Rules: Adhere to any communication guidelines specified for the exam, such as restrictions on chat or collaboration.</li>

<li className='mt-2 outfit-300'>Privacy Settings: Ensure your webcam and microphone privacy settings are correctly configured as required for the proctoring system.</li>

          </ul>
        </div>
        </div>
        
      </div>
<div className='mx-16 my-12 bg-white'>
      {questions.map((q, i) => (
        <div className="mt-4">
          <h4 className='outfit-600 text-[#FABB5C]'>Question {i + 1}</h4>
          <p style={{ whiteSpace: 'pre-wrap' }} className="outfit-300">{q.text}</p>
          {q.options.map((option) => (
            <>
              <input
                style={{ marginInlineEnd: 8, marginBottom: 8 }}
                type="radio"
                id={option}
                name={`question${q.id}`}
                value={option}
              
              />
              <label htmlFor="html"  className='outfit-300'>{option}</label>
              <br />
            </>
          ))}
        </div>
      ))}
            <button onClick={handleClick} className='w-fit bg-black px-6 py-2 rounded-full mt-4 text-white outfit-500'>Submit</button>

</div>
      {/* <Webcam /> */}
    </div>
  )
}

export default Exam
