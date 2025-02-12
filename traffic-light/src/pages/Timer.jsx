import { useEffect, useState } from "react";

export const Timer = () => {
    const [count, setcount] = useState(0);
    const [mainc, setmainc] = useState(0);
    useEffect(() => { 
        const timer = setInterval(() => {
            if(mainc > 0){
                setmainc(mainc - 1);
            } else {
                clearInterval(timer);
            }
        }, 1000);
        return () => {
            clearInterval(timer);
        }
    }, [mainc]);
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-4xl font-bold">
                {mainc}
            </div>
            <div className="flex flex-row">
            < button onClick={() => {if(count > 0){setcount(count - 1)}}} className=" bg-gray-400 text-white  mt-4 mx-4 w-[60px]">Dec</button>
            <div className="flex items-center justify-center">
                {count}
            </div>
            < button onClick={() => setcount(count + 1)} className=" bg-gray-400 text-white  mt-4 mx-4 w-[60px]">Inc</button>
            </div>
            <button onClick={() => setmainc(count)} className="p-2 bg-blue-400 text-white rounded-lg mt-4 w-[100px]">Start</button>
            <button onClick={() => {setmainc(0), setcount(0)}} className="p-2 bg-blue-400 text-white rounded-lg mt-4 w-[100px]">reset</button>
        </div>
    )
}