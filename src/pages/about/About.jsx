import React from 'react'
import Navbar from '../../components/common/Navbar'
import Footer from '../../components/common/Footer'
import PageTitle from '../../components/common/PageTitle'
import DentalServicesAccordion from './components/DentalServicesAccordion'
import DentistTestimonials from '../home/components/DentistTestimonials'

const About = () => {
  return (
    <div>
      <Navbar/>
      <PageTitle pageName={"About Us"} pageRoute={"Home / About Us"}/>
      <DentalServicesAccordion/>
      <DentistTestimonials/>
      <Footer/>
    </div>
  )
}

export default About