import React, { useContext } from 'react'
import Home from './pages/Home.jsx'
import  Result  from './pages/Result'
import Buycredit from './pages/Buycredit'
import {Routes,Route} from 'react-router-dom'
import Navbar from './components/navbar.jsx'
import Footer from './components/footer.jsx'
import Login from './components/login.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { AppContext } from './context/appcontext.jsx'

const App = () => {
  const {showlogin}=useContext(AppContext);
  return (
    <div className='px-4 sm:px-10 md:px-14 lg:px-28 min-h-screen bg-gradient-to-b from-teal-50 to-orange-50'>
      <ToastContainer position='bottom-right'/>
      <Navbar/>
      {showlogin && <Login/>}
      <Routes>
        <Route path='/' element={ <Home/>}/>
        <Route path='result/' element={  <Result/>}/>
        <Route path='/buy' element={  <Buycredit/>}/>     
      </Routes>
      <Footer/>
      
    </div>
  )
}

export default App
