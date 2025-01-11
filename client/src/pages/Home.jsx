import React from 'react'
import Header from '../components/header'
import Steps from '../components/Steps'
import Description from '../components/description'
import Testimonials from '../components/Testimonials'
import Generatebutton from '../components/generatebutton'

const Home = () => {
  return (
    <div>
        <Header/>
        <Steps/>
        <Description/>
        <Testimonials/>
        <Generatebutton/>
    </div>
  )
}

export default Home
