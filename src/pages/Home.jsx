import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import About from '../components/About'
import Footer from '../components/Footer'
import KMHSlider from '../components/KMHSlider'
 
const Home = () => {
  return (
    <div>
      <Header/>
      {/* <Hero/> */}
      <KMHSlider/>
      <About/>
      <Footer/>
    </div>
  )
}

export default Home
