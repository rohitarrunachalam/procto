import React, { useState, useEffect } from 'react';
import { supabase } from './config/supabase-config';

interface StudentLog {
  id: number;
  logs: string;
  created_at: string;
}

const StudentLogs = () => {
  const [data, setData] = useState<StudentLog[]>([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from('student_logs').select();

      if (error) {
        console.error(error);
      } else {
        const studentLogs: StudentLog[] = data.map((item) => ({
          id: item.id,
          logs: item.logs,
          created_at: item.created_at,
        }));

        setData(studentLogs);
      }
    }

    fetchData();
  }, []);

  return (
    <>
    
  
<section className="py-1 bg-blueGray-50">
  <div className='text-center mt-8'> 
  <h1 className='text-[24px] outfit-700 text-[#FF8F28] '>Procto's Admin Dashboard</h1>
  <div className='outfit-300'>Here you can view the student's log entries with the timestamps of activity..</div>
  </div>
 
<div className="w-[70%] mb-12 xl:mb-0 px-4 mx-auto mt-8">
  <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded ">
    <div className="rounded-t mb-0 px-4 py-3 border-0">
      <div className="flex flex-wrap items-center">
        <div className="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 className="font-semibold text-[16px] outfit-500">Student Logs</h3>
        </div>
       
      </div>
    </div>

    <div className="block w-full overflow-x-auto">
      <table className="items-center bg-transparent w-full border-collapse ">
        <thead className='outfit-400 text-[14px]'>
          <tr>
            <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Id
                        </th>
          <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Log Entry
                        </th>
           <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3  uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          TimeStamp
                        </th>
          </tr>
        </thead>

        <tbody className='outfit-300'>
        {data.map((item) => (
            <tr key={item.id}>
            <td className="text-[14px] border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4 ">
            {item.id}
            </td>
            <td className="text-[14px] border-t-0 px-6 align-center border-l-0 border-r-0  whitespace-nowrap p-4">
            {item.logs}
            </td>
            <td className="text-[14px] border-t-0 px-6 align-middle border-l-0 border-r-0  whitespace-nowrap p-4">
              {item.created_at}
            </td>
          </tr>
           ))}
         
        </tbody>

      </table>
    </div>
  </div>
</div>

</section>

    </>
  );
};

export default StudentLogs;
