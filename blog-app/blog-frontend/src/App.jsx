import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashborad'
import { Createone } from './pages/Createone'
import { Blog } from './pages/Blog'

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Signup />} />
          <Route path='/login' element={<Signin />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/createone' element={<Createone />} />
          <Route path='/blog/:id' element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
