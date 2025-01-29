import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"

export const Blog = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [data, setdata] = useState([]);
  useEffect(() => {
    const get = async () => {

      const ress = await fetch('http://localhost:3000/api/blog/one', {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cat: id })
      })
      const da = await ress.json();
      setdata(da.res[0])
    }
    get();
  }, [])
  return <div>
    <div className="flex py-4 px-[200px] justify-between">
      <div className="text-3xl font-bold ">
        Logs
      </div>
      <div className="flex">
        <button onClick={() => navigate('/createone')} className="bg-green-700 cursor-pointer font-bold hover:bg-green-800 text-white border rounded-4xl py-2.5 px-4">
          Publish One
        </button>
        <div className="flex flex-col ml-4 items-center justify-center border border-gray-700 rounded-full bg-gray-300 font-semibold py-2 px-4">
          K
        </div>
        <button onClick={() => {
          localStorage.removeItem("token");
          localStorage.removeItem("isadmin")
          navigate('/login');
        }} className="bg-gray-200 ml-4 cursor-pointer font-bold hover:bg-green-700 text-black border rounded-4xl py-2.5 px-4">
          Logout
        </button>
      </div>
    </div>
    <hr className="border-gray-300 mb-4" />

    <div className="flex items-start justify-center">
      <div className="grid grid-cols-12 px-10 w-full max-w-screen-xl pt-12">
        <div className="col-span-8">
          <div className="text-5xl font-extrabold">
            {data.title}
          </div>
          <div className="text-slate-500 pt-2">
            {`Post on ${data.create_at}`}
          </div>
          <div className="pt-4">
            {data.content}
          </div>
        </div>
        <div className="col-span-4">
          <div className="text-slate-600 text-lg">
            Author
          </div>
          <div className="flex w-full">
            <div className="pr-4 flex flex-col justify-center">

              <div className="flex flex-col ml-4 items-center justify-center border border-gray-700 rounded-full bg-gray-300 font-semibold py-2 px-4">
                {/* {data.email[0].toUpperCase()} */}
                K
              </div>
            </div>
            <div>
              <div className="text-xl font-bold">
                Anonymous
              </div>
              <div className="pt-2 text-slate-500">
                Random catch phrase about the author's ability to grab the users attention
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
}
