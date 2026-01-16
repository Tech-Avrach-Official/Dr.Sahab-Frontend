
import { Check, CircleCheck, Star } from 'lucide-react'
import React from 'react'
import { CartoonButton } from '../../../components/ui/cartoon-button'


const AboutSection = () => {
    return (

        <div>
            <div className=' xl:px-32 px-4 py-10  xl:py-18'>
                <div className=" h-full xl:flex xl:h-[600px]">
                    <div className='flex items-center justify-center w-full xl:w-1/2 h-[500px] md:h-[530px] xs:h-[420px] xl:pr-20'>
                        <div className='w-[560px] h-full relative'>
                            <div className='w-full'>
                                <img className='w-full  md:w-[460px] xl:w-[410px] rounded-[50px]' src="https://t3.ftcdn.net/jpg/04/11/46/26/360_F_411462636_lkNQ6m8tFSlIECaTKw0o1vQskkEcPzE0.jpg" alt="" />
                            </div>

                            <div className='absolute right-0 bottom-0 bg-white border-[4px] border-white rounded-[30px] md:rounded-[50px] '>
                                <img className='rounded-[30px] md:rounded-[50px] w-[420px] h-[270px] md:w-[420px]  xl:h-[250px] object-cover' src="https://hbgmedicalassistance.com/wp-content/uploads/2016/04/Dental-Treatment-in-India-Smile-all-the-way_11zon.jpeg" alt="" />
                            </div>
                            <div className='absolute bottom-20 right-64 md:top-16 md:right-14'>
                                <img id='Rotet' className='rotate-360-infinite w-24 md:w-36 ' src="http://localhost:5174/src/assets/images/about-experience-circle.png" alt="" />

                            </div>
                        </div>
                    </div>
                    <div className='xl:w-1/2 h-full'>
                        <div className='mt-16  xl:mt-0'>
                            <div className='flex items-center gap-2'>
                                <span><Star className='text-[#1E84B5] text-xl' /></span>
                                <p className='text-[#1E84B5]'>ABOUT US</p>
                            </div>
                            <div>
                                <h1 className='text-3xl md:text-5xl mt-3 font-bold text-[#0E384C]'>
                                    <span className='text-[#1E84B5]'>Your Journey</span> to a Healthier Smile Begins Here
                                </h1>
                            </div>
                            <div>
                                <p className='mt-5 text-lg text-gray-500'>The goal of our clinic is to provide friendly, caring dentistry and the highest level of general, cosmetic, and specialist dental treatments. With dental practices throughout the world.</p>
                            </div>
                            <div className='flex flex-wrap items-center justify-between mt-10'>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <span><CircleCheck className='text-[#1E84B5] text-xl' /></span>
                                        <p className='text-[#0E384C] text-lg font-semibold'>Experienced Team</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <span><CircleCheck className='text-[#1E84B5] text-xl' /></span>
                                        <p className='text-[#0E384C] text-lg font-semibold'>State-Of-The-Art Technology</p>
                                    </div>
                                </div>
                                <div className='flex flex-col gap-4'>
                                    <div className='flex items-center gap-2'>
                                        <span><CircleCheck className='text-[#1E84B5] text-xl' /></span>
                                        <p className='text-[#0E384C] text-lg font-semibold'>Comprehensive Services</p>
                                    </div>
                                    <div className='flex items-center gap-2'>
                                        <span><CircleCheck className='text-[#1E84B5] text-xl' /></span>
                                        <p className='text-[#0E384C] text-lg font-semibold'>Emergency Dental Services</p>
                                    </div>
                                </div>
                            </div>
                            <div className='mt-10'>
                                {/* <Button variant="Default" className="rounded-full w-56 text-white h-12 text-base  bg-[#1E84B5]">Read More About Us</Button> */}
                                <CartoonButton label="Read More About Us" to='/contact' className='py-2 px-5 text-white text-lg rounded-lg bg-primary ' />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default AboutSection