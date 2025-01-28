import { Axios } from "axios"
import { useState } from "react"
import { Link } from "react-router-dom"

export const Signup = () => {
  const [signup, setsignup] = useState({
    username: "",
    email: "",
    pass: ""
  })
  return <div className="flex min-h-screen bg-gray-50 justify-center items-center">
    <div className="text-center">
      <div className="text-4xl font-semibold">Create  account</div>
      <div className="font-semibold mt-2">Already have an account? <Link className="underline cursor-pointer" to={'/login'}> sign in</Link></div>
      <div className="flex flex-col items-start">
        <div className="pl-2 mt-6 test-[12px] font-medium">Name</div>
        <input className="p-2 mt-2 w-[400px]  bg-gray-100 border border-gray-200 rounded-lg" placeholder="user name" onChange={(e) => {
          setsignup({
            ...signup,
            username: e.target.value
          })
        }} />
        <div className="pl-2 mt-4 test-[12px] font-medium">Email</div>
        <input className="p-2 mt-2 w-[400px]  bg-gray-100 border border-gray-200 rounded-lg" placeholder="email.gamil.com" onChange={(e) => {
          setsignup({
            ...signup,
            email: e.target.value
          })
        }} />
        <div className="pl-2 mt-4 test-[12px] font-medium">Password</div>
        <input className="p-2 mt-2 w-[400px] bg-gray-100 border border-gray-200 rounded-lg" type={"password"} placeholder="********" onChange={(e) => {
          setsignup({
            ...signup,
            pass: e.target.value
          })
        }} />
        <button className="mt-8 cursor-pointer w-[400px] bg-gray-800 hover:bg-gray-900 text-white rounded-lg h-[44px]" onClick={() => {
          signupfn(signup);
        }}>Submit</button>
      </div>
    </div>
  </div>
}

const signupfn = async function (data) {
  const res = await fetch('http://localhost:3000/api/user/signup', {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",

    },

    body: JSON.stringify(data),
  })
  if (!res.ok) {
    console.log("res")
  }
  console.log(res)
}
