
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Createone = () => {
  const navigate = useNavigate();
  var token = localStorage.getItem("token");
  const [user, setuser] = useState(null);
  const [tosend, settosend] = useState({
    title: "",
    content: "",

  })
  useEffect(() => {
    const getauth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const data = await response.json();
        setuser(data);
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
      <div className="flex py-4 px-[300px] justify-between">
        <div className="text-3xl font-bold ">
          Logs
        </div>
        <div className="flex">
          <button className="bg-green-700 cursor-pointer font-bold hover:bg-green-800 text-white border rounded-4xl py-2.5 px-4">
            Publish One
          </button>
          <div className="flex flex-col ml-4 items-center justify-center border border-gray-700 rounded-full bg-gray-300 font-semibold py-2 px-4">
            K
          </div>
        </div>
      </div>
      <hr className="border-gray-300 mb-4" />
      <div className="w-full flex justify-center items-center">
        <div>
          <div>
            <input onChange={(e) => {
              settosend({
                ...tosend,
                title: e.target.value,
              })
            }} className="bg-gray-200 border border-gray-300 m-4 p-2 rounded-md w-[782px]" placeholder="Title" />
          </div>
          <div>
            <textarea onChange={(e) => {
              settosend({
                ...tosend,
                content: e.target.value,
              })
            }} className="bg-gray-200 resize-y border border-gray-300 m-4 p-2 rounded-md w-[782px] h-[400px]" placeholder="Add a log" />
          </div>
          <button onClick={() => {
            create(tosend, navigate);
          }} className="m-4 cursor-pointer bg-green-700 text-white font-bold rounded-full py-2 px-4">publish</button>
        </div>
      </div>
    </div>
  }
}

async function create(data, navigate) {
  data = JSON.stringify((data))
  console.log(data)
  var token = localStorage.getItem("token");
  try {
    const ress = await fetch('http://localhost:3000/api/blog/createBlog', {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: data
    })
    const r = await ress.json();
    console.log(r);
    if (r.res == 1) {
      alert("Your log is sent for Approval by Admin!!")
      navigate('/dashboard');
    } else {
      alert(r)
    }
  } catch (e) { alert("error creating log: ", e) }
}
