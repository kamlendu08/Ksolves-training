import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  var token = localStorage.getItem("token");
  const isadmin = localStorage.getItem("isadmin");
  const [user, setuser] = useState(null);
  const [rows, setrows] = useState({});
  const [pending, setpending] = useState({
    res: []
  });
  const [l, sl] = useState(false);
  const [approved, setapproved] = useState(true);
  useEffect(() => {
    const getauth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/user/me', {
          headers: { Authorization: `Bearer ${token}` }
        })
        const ress = await fetch('http://localhost:3000/api/blog/bulk', {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (isadmin === "true") {
          const ress = await fetch('http://localhost:3000/api/blog/bulkpending', {
            headers: { Authorization: `Bearer ${token}` }
          })
          const rs = await ress.json();
          setpending(rs);

        }
        const r = await ress.json();
        const data = await response.json();
        console.log(r)
        console.log(data)
        setuser(data);
        setrows(r);
        console.log(rows)
        console.log(pending)
      } catch (e) {
        alert("Error cheching Authentication: ", e)
      }
    }
    getauth();
  }, [token, l])
  console.log(isadmin)
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
          <button onClick={() => navigate('/createone')} className="bg-green-700 cursor-pointer font-bold hover:bg-green-800 text-white border rounded-4xl py-2.5 px-4">
            Publish One
          </button>
          <div className="flex flex-col ml-4 items-center justify-center border border-gray-700 rounded-full bg-gray-300 font-semibold py-2 px-4">
            {user.email[0].toUpperCase()}
          </div>
          <button onClick={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("isadmin")
            localStorage.removeItem("id")
            navigate('/login');
          }} className="bg-gray-200 ml-4 cursor-pointer font-bold hover:bg-green-700 text-black border rounded-4xl py-2.5 px-4">
            Logout
          </button>
        </div>
      </div>
      <hr className="border-gray-300 mb-4" />
      {isadmin === "true" ? (
        <div className="flex items-center justify-center cursor-pointer mb-4">
          <div className="w-[780px] pl-6">
            <button onClick={() => setapproved(true)} className={` ${approved === true ? 'bg-green-700' : 'bg-gray-400'} cursor-pointer font-bold hover:bg-green-800 text-white border rounded-4xl py-2.5 px-4`}>{`Approved (${rows.res.length})`}</button>
            <button onClick={() => setapproved(false)} className={`${approved === false ? 'bg-green-700' : 'bg-gray-400'} cursor-pointer font-bold hover:bg-green-800 text-white border rounded-4xl py-2.5 px-4 ml-4`}>{`Pending (${pending.res.length})`}</button>
          </div>
        </div>) : (
        <div className="flex items-center justify-center">
          <button onClick={() => { }} className=" font-bold text-black border border-green-400 rounded-4xl py-2.5 px-4">{`Published Blogs (${rows.res.length})`}</button>
        </div>
      )
      }
      {(approved ? rows.res : pending.res).
        sort((a, b) => new Date(b.create_at) - new Date(a.create_at)).
        map((ele) => approved ? blogtile(ele, isadmin, navigate, sl) : pblogtile(ele, isadmin, navigate, sl))}
    </div>
  }
}

function blogtile(data, isadmin, navigate, setuser) {
  return <div className="flex items-center w-full justify-center cursor-pointer"> <div onClick={(e) => {
    navigate(`/blog/${data.create_at}`)
  }} className="p-4 w-[800px] bg-green-200 rounded-4xl m-2 hover:bg-green-300" key={data.create_at}>
    <div className="flex items-center">
      <div className="flex flex-col ml-4 items-center justify-center border border-gray-700 rounded-full bg-gray-300 font-semibold px-4 py-2">{data.username[0]}</div>
      <div className="ml-4 font-thin">{data.username}</div>
      <div className="ml-4 font-extralight">| {data.create_at}</div>
    </div>
    <div className="ml-4 mt-2 text-xl font-medium">{data.title}</div>
    <div className="ml-4 mt-2 mb-4 font-thin">{data.content}</div>
    {isadmin === "true" && (
      <div className="flex">
        <div>
          <button onClick={(e) => {
            e.stopPropagation();
            handleDelete(data.create_at, setuser);
          }} className="bg-red-100 ml-4 cursor-pointer hover:bg-red-200 text-black border border-red-300 rounded-4xl py-1 px-3">Remove</button>
        </div>
      </div>
    )}
  </div> </div>
}

function pblogtile(data, isadmin, navigate, setuser) {
  return <div className="flex items-center w-full justify-center cursor-pointer "> <div onClick={(e) => {
    navigate(`/blog/${data.create_at}`)
  }} className="p-4 w-[800px] bg-gray-200 rounded-4xl m-2 hover:bg-gray-300" key={data.create_at}>
    <div className="flex items-center">
      <div className="flex flex-col ml-4 items-center justify-center border border-gray-700 rounded-full bg-gray-300 font-semibold px-4 py-2">{data.username[0]}</div>
      <div className="ml-4 font-thin">{data.username}</div>
      <div className="ml-4 font-extralight">| {data.create_at}</div>
    </div>
    <div className="ml-4 mt-2 text-xl font-medium">{data.title}</div>
    <div className="ml-4 mt-2 mb-4 font-thin">{data.content}</div>
    {isadmin === "true" && (
      <div className="flex">
        <div>
          <button onClick={(e) => {
            e.stopPropagation();
            handleApprove(data.create_at, setuser);
          }} className="bg-green-200 ml-4 cursor-pointer hover:bg-green-500 text-black border border-green-400 rounded-4xl py-1 px-3">Approve</button>
        </div>
        <div>
          <button onClick={(e) => {
            e.stopPropagation();
            handleDelete(data.create_at, setuser);
          }} className="bg-red-100 ml-4 cursor-pointer hover:bg-red-200 text-black border border-gray-300 rounded-4xl py-1 px-3">Remove</button>
        </div>
      </div>
    )}
  </div> </div>
}

const handleApprove = async (createat, setuser) => {
  const ob = {
    cat: createat
  }
  const obj = JSON.stringify(ob);
  const ress = await fetch('http://localhost:3000/api/blog/approve', {
    method: "PATCH",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: obj
  })
  const res = await ress.json();
  alert("blog Approved")
  setuser((e) => e = !e)
}
const handleDelete = async (createat, setuser) => {
  const ob = {
    cat: createat
  }
  const obj = JSON.stringify(ob);
  const ress = await fetch('http://localhost:3000/api/blog/delete', {
    method: "DELETE",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: obj
  })
  const res = await ress.json();
  alert("blog removed")
  setuser((e) => e = !e)
}
