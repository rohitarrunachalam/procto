import React from 'react'
import homeCover from '../../../assets/homecover.png'
type Props = {
  onClick: VoidFunction
}


const ExamIntro = (props: Props) => {
  return (
    <div className="flex items-center justify-center h-screen flex-row mx-16 ">
      <div className=' w-[55%] mt-12'>
      <h1 className='text-3xl outfit-700'>Procto - Exam Proctoring Application</h1>
      <div className='mt-4 outfit-300 text-[#544837] '>
      A Virtual Proctoring Web Application is a cutting-edge online platform designed to ensure the integrity of remote examinations and assessments. It leverages advanced technology to replicate the monitoring and security measures typically found in traditional in-person testing environments.
      </div>
      {/* <div className='my-4 '>
        <ol className='list-disc  mx-auto outfit-300 w-[80%]'>
        <li>Maintain Eye Contact: Keep your gaze focused on the monitor screen and avoid looking away for extended periods.</li>

<li>Cursor Within Bounds: Keep the mouse cursor within the designated exam window or application at all times.</li>

<li>No New Tabs or Windows: Refrain from opening new browser tabs or windows during the examination.</li>

<li>Background Applications: Close or disable any unauthorized browser or chat applications running in the background while taking the exam.</li>

<li>Follow Communication Rules: Adhere to any communication guidelines specified for the exam, such as restrictions on chat or collaboration.</li>

<li>Privacy Settings: Ensure your webcam and microphone privacy settings are correctly configured as required for the proctoring system.</li>

<li>Stay In Frame: Position yourself within the webcam frame to remain visible throughout the exam.</li>

<li>Follow Instructions: Carefully read and follow any specific instructions provided by the virtual proctoring system.</li>

<li>Avoid Distractions: Minimize distractions in your exam environment to maintain focus on the test.</li>

<li>Report Issues: If you encounter technical issues or require assistance, promptly inform the exam proctor or support personnel for guidance.</li>
        </ol>
      </div> */}
      <div className='bg-black w-fit text-white px-6 py-2 rounded-full mt-4'>
        <button onClick={props.onClick}  className='outfit-500'>Start Test</button>
      </div>
   
</div>
<div>
  <img src={homeCover} className='w-[75%] mx-auto ' />
</div>
    </div>
  )
}

export default ExamIntro
