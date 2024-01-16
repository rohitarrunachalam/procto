import React, { useState, useEffect } from 'react'
import type { ProctoringData } from '../../hooks/useProctoring'
import { useNavigate } from 'react-router-dom';
import { supabase } from "../../config/supabase-config";
import { useSelector, useDispatch } from 'react-redux';
import {
  decrement,
  increment,
  selectCount,
} from './counterSlice';

const textContent = {
  fullscreen:
    'Looks like your browser is not in full-screen mode. Press the button below to continue.',
  tabFocus: 'You seem to be accessing a different tab. Press the button below to continue.',
} as const

type AlertType = 'fullscreen' | 'tabFocus'

const Alerts = ({ fullScreen, tabFocus }: ProctoringData) => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  const [open, setOpen] = useState<AlertType | null>(null)


  const insertLog = async (textfield: string) => {
    const { data, error } = await supabase
      .from('student_logs')
      .insert([
        { logs: textfield },
      ])

    if (error) {
      console.error(error)
    } else {
      console.log('Log inserted successfully!')
    }
  }


  useEffect(() => {

    if (fullScreen.status === 'on' &&  tabFocus.status === false){
      insertLog('Switched between Application')
      return
    }
    if (fullScreen.status === 'off' && tabFocus.status === true) {
      setOpen('fullscreen')
      dispatch(increment())
      insertLog('Exited Full Screen Mode')
      return
    }
    if (tabFocus.status === false && fullScreen.status === 'off') {
      setOpen('tabFocus')
      insertLog('Tab focus is lost')
      return
    }

    setOpen(null)
  }, [fullScreen.status, tabFocus.status])

  if (!open) return null

  return (

    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center ">
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-[2]"></div>
    <div className="relative w-[40%] rounded-xl bg-white shadow-2xl drop-shadow-2xl p-4 z-[3]">
      <div className="flex  text-center my-1 flex-col relative mb-[12px]">
      <h2 className='text-[20px] outfit-500'>{textContent[open]}</h2>      </div>
     
     <div className='flex item-center justify-center text-center flex-col'>
     {count<10? (<h3 className='text-[16px] outfit-300'>Warning No: {count }</h3>):(<h3 className='text-[16px] outfit-300'>This will be your last warning!</h3>)}
           <button className="bg-black px-4 py-2 rounded-full text-white mt-4 outfit-500" onClick={fullScreen.trigger}>
             Continue
    </button>
      </div>    
    </div>
  </div>
    // <div className="flex items-center justify-center h-screen">
    //   <div className="flex items-center justify-center h-screen flex-col">
    //     {count<5?(
          
    //       <>
    //       <h2 className='text-[32px] outfit-700'>{textContent[open]}</h2>
    //       <h3 className='text-[20px] outfit-500'>Warning No: {count }</h3>
    //       <button className="bg-black px-4 py-2 rounded-full text-white mt-4 outfit-500" onClick={fullScreen.trigger}>
    //         Continue
    //       </button>
    //       </>
          
    //     ):(<>
    //       <h2>Sorry your test has been ended</h2>
    //     </>)}
        
    //   </div>
    // </div>
  )
}

export default Alerts
