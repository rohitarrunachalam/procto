import Alerts from './components/Alerts'
import { useProctoring } from '../hooks/useProctoring'
import './global.css'
import { useState } from 'react'
import ExamIntro from './components/Exam/ExamIntro'
import ExamPaused from './components/Exam/ExamPaused'
import Exam from './components/Exam'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import ExamStop from './components/Exam/ExamStop'
import { useSelector, useDispatch } from 'react-redux'
import { selectCount } from './components/counterSlice'

import { selectBoolean } from './components/Exam/submitSlice'
import ExamSuccess from './components/Exam/ExamSuccess'

function App() {
  const [examHasStarted, setExamHasStarted] = useState(false)

  const count = useSelector(selectCount)
  const booleanValue = useSelector(selectBoolean)

  const { fullScreen, tabFocus } = useProctoring({
    forceFullScreen: true,
    preventTabSwitch: true,
    preventContextMenu: true,
    preventUserSelection: true,
    preventCopy: true,
  })

  if (!examHasStarted) {
    return (
      <ExamIntro
        onClick={() => {
          fullScreen.trigger()
          // Wait before react finishes updating state. flushSync doesn't seem to work
          setTimeout(() => {
            setExamHasStarted(true)
          }, 100)
        }}
      />
    )
  }



  const getContent = () => {
    if (booleanValue) {
      return <ExamSuccess />;
    }
  
    if (count >= 10 && !booleanValue) {
      return <ExamStop />;
    }

    if ((fullScreen.status === 'on' && tabFocus.status === false) && count<10 && !booleanValue) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }return <ExamPaused />
    }
  
     if ((fullScreen.status === 'off' || tabFocus.status === false) && count<10 && !booleanValue) {
      return <ExamPaused />
    }
  
    // If none of the above conditions match, display the Exam component
    if(fullScreen.status === 'on' && tabFocus.status === true && count<10){ 
      return <Exam />;}
  };
  

  return (
    <>
      {/* For debugging purpose */}
      {/* <pre>{JSON.stringify({ fullScreen, tabFocus }, null, 2)}</pre> */}
   
      <div className="">{getContent()}</div>
      { (count<10 && !booleanValue)? ( <Alerts fullScreen={fullScreen} tabFocus={tabFocus} />):("")}
     
    </>
  )
}

export default App
