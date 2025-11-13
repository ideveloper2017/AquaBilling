import React from 'react'
import Hero from '../components/Hero'
import Features from '../components/Features'
import Showcase from '../components/Showcase'
import Testimonials from '../components/Testimonials'
import CallToAction from '../components/CallToAction'

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <Features />
      <Showcase />
      <Testimonials />
      <CallToAction />
    </>
  )
}

export default Home
