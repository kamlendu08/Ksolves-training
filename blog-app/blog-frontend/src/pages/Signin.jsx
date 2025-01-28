import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

export const Signin = () => {
  const navigate = useNavigate();
  const [signindata, setdata] = useState({
    email: "",
    pass: ""
  })
  return <div className="flex min-h-screen bg-gray-50 justify-center items-center">
    <div className="text-center">
      <div className="text-4xl font-semibold">Login to account</div>
      <div className="font-semibold mt-2">Do not have an account? <Link className="underline cursor-pointer" to={'/'}> sign up</Link></div>
      <div className="flex flex-col items-start">
        <div className="pl-2 mt-4 test-[12px] font-medium">Email</div>
        <input className="p-2 mt-2 w-[400px]  bg-gray-100 border border-gray-200 rounded-lg" placeholder="email.gamil.com" onChange={(e) => {
          setdata({
            ...signindata,
            email: e.target.value
          })
        }} />
        <div className="pl-2 mt-4 test-[12px] font-medium">Password</div>
        <input className="p-2 mt-2 w-[400px] bg-gray-100 border border-gray-200 rounded-lg" type={"password"} placeholder="********" onChange={(e) => {
          setdata({
            ...signindata,
            pass: e.target.value
          })
        }} />
        <button className="mt-8 cursor-pointer w-[400px] bg-gray-800 hover:bg-gray-900 text-white rounded-lg h-[44px]" onClick={() => {
          signin(signindata, navigate);
        }}>Login</button>
      </div>
    </div>
  </div>
}

const signin = async function (data, navigate) {
  const res = await fetch('http://localhost:3000/api/user/signin', {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  if (!res.ok) {
    alert(res);
  }
  // console.log(res);
  const ress = await res.json();
  // alert(JSON.stringify(ress));
  // console.log(ress);
  if (!ress.token) {
    alert("you are not authenticated")
  } else {
    localStorage.setItem("token", ress.token);
    navigate('/dashboard')
  }
}
