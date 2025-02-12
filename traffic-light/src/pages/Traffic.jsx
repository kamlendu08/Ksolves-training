import { useEffect, useState } from "react";

export const Traffic = () => {
    const [light, setlight] = useState('red');
    useEffect(() => {
        const timer = setInterval(() => {
            if (light == 'red') {
                setlight('yello');
            } else if (light == 'yello') {
                setlight('green');
            } else {
                setlight('red');
            }
        }, 2000);
        return () => {
            clearInterval(timer);
        };
    }, [light]);
  return (
    <div className="flex flex-col items-center justify-center h-screen">    
    <div className="p-4 bg-gray-300 rounded-2xl m-2 w-[150px]">
      <div className={`${light == 'red' ? 'bg-red-600' : 'bg-gray-700'} w-[100px] h-[100px] m-2 rounded-full`} ></div>
      <div className={`${light == 'yello' ? 'bg-yellow-600' : 'bg-gray-700'} w-[100px] h-[100px] m-2 rounded-full`} ></div>
      <div className={`${light == 'green' ? 'bg-green-700' : 'bg-gray-700'} w-[100px] h-[100px] m-2 rounded-full`} ></div>
    </div>
    </div>
  );
}