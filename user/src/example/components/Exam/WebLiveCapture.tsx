import { useSelector, useDispatch } from 'react-redux';
import React, { useEffect, useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { io, Socket } from 'socket.io-client';
import {

  increment,
  selectCount,
} from '../counterSlice';
import { supabase } from "../../../config/supabase-config";

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: 'user',
};

const WebLiveCapture = () => {
  const webcamRef = useRef<Webcam | null>(null);
  const dispatch = useDispatch();
  const socket = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<string[]>([]); // Store messages here as an array
  const [warningCount, setWarningCount] = useState<number>(0); // Warning count
  let count = useSelector(selectCount);

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
    // Connect to the WebSocket server (Flask)
    socket.current = io('http://127.0.0.1:5000');

    // Handle incoming messages from the backend
    socket.current.on('response', (data) => {
      // Append the received message to the messages array
      setMessages((prevMessages) => [data.data, ...prevMessages]); // Insert at the beginning
      
      // Check if the message indicates a warning and update the warning count
      if (data.data === 'Suspicious Activity Detected Left' || data.data === 'Suspicious Activity Detected Right' || data.data === 'Suspicious Activity Detected Down' || data.data === 'Suspicious Activity Detected Up' || data.data === 'Mobile Detected' || data.data === 'More Than One Person Detected') {
        dispatch(increment())
        insertLog(data.data)
      }
      
      // Check the warning count and display "STOP TEST" message if exceeded
      // if ( === 15) {
      //   count = 5;
      //   // You can add your logic here to handle the "STOP TEST" message display
      // }
    });
    
    // Function to send frames to the server
    const sendFrame = () => {
      if (webcamRef.current) {
        const imageSrc = webcamRef.current.getScreenshot();
        socket.current?.emit('frame', imageSrc); // Send the frame to the server
      }
    };
    
    // Capture and send frames at a desired interval (adjust as needed)
    const captureInterval = setInterval(sendFrame, 200); // Send a frame every 200 milliseconds
    
    // Cleanup when the component unmounts
    return () => {
      clearInterval(captureInterval); // Stop sending frames on unmount
      socket.current?.disconnect(); // Disconnect from the WebSocket server
    };
  }, [webcamRef, warningCount]);

  return (
    <div>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        height={150}
        width={300}
        videoConstraints={videoConstraints}
      />
     <div className="max-h-[300px] overflow-y-auto border border-gray-300 rounded p-4">
        <h2 className="text-[16px]  outfit-500 mb-2">Messages from Backend:</h2>
        <ul className='text-[14px] outfit-400 text-red-500'>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
    
      </div>
      {count<9?(<>
        <div className='my-2 outfit-500 text-red-500'>Please Dont Cheat: Warning {count}</div>
        </>):(<>
        <div className='my-2 outfit-500 text-red-500'>
        This is your last warning..

        </div>
        </>)}
    </div>
  );
};

export default WebLiveCapture;
