import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import Layout from './Components/layout'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />        
        <Route path="/register" element={<Register />} />
        <Route path="/Home" element={<Layout><Home /></Layout>} />
      </Routes>
    </Router>
  )
}