import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  var token = localStorage.getItem("token");
  const [user, setuser] = useState(null);
  const [rows, setrows] = useState(null);
  useEffect(() => {
    const getauth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const ress = await fetch('http://localhost:3000/api/blog/bulk', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const r = await ress.json();
        const data = await response.json();
        setuser(data);
        setrows(r);
      } catch (e) {
        alert("Error cheching Authentication: ", e)
      }
    }
    getauth();
  }, [token])
  if (user == null) {
    return <div>Loading..</div>
  }
  else if (user.res == "not authenticated") {
    alert("Please login!")
    navigate('/login');
  } else {
    return <div>
      <div className="flex p-6 justify-between">
        <div className="text-3xl font-bold ">
          Logs
        </div>
        <div className="flex">
          <button className="bg-green-600 cursor-pointer font-bold hover:bg-green-700 text-white border rounded-4xl border-green-900 py-2.5 px-4">
            Publish One
          </button>
          <div className="flex flex-col ml-4 items-center justify-center border border-gray-700 rounded-full bg-gray-300 font-semibold py-2 px-4">
            K
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mb-4" />
      {rows.res.map((ele) =>
        blogtile(ele)
      )}
    </div>
  }
}

function blogtile(data) {
  return <div className="flex items-center w-full justify-center cursor-pointer"> <div className="p-4 w-[800px]" key={data.create_at}>
    <div className="flex items-center">
      <div className="flex flex-col ml-4 items-center justify-center border border-gray-700 rounded-full bg-gray-300 font-semibold px-4 py-2">{data.username[0]}</div>
      <div className="ml-4 font-thin">{data.username}</div>
      <div className="ml-4 font-extralight">| {data.create_at}</div>
    </div>
    <div className="ml-4 mt-2 text-xl font-medium">{data.title}</div>
    <div className="ml-4 mt-2 mb-4 font-thin">{data.content}</div>
    <hr className="border-gray-300 " />
  </div> </div>
}
