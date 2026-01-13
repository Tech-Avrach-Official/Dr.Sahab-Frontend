import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { CartoonButton } from '../../../components/ui/cartoon-button';

const DentistTestimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sara Joshi",
      image: "https://content.jdmagicbox.com/v2/comp/mumbai/l7/022pxx22.xx22.170124215510.d3l7/catalogue/dr-charmi-mehta-smile-n-shine-kandivali-west-mumbai-dentists-4d7e4pf-250.jpg",
      rating: 4,
      text: "Dr. Smith and his team are absolutely wonderful! They made my dental implant procedure completely painless and stress-free.",
      treatment: "Dental Implants"
    },
    {
      id: 2,
      name: "Komal Pandey",
      image: "https://www.newdelhidentistindia.com/images/india-testimonials/ind6.jpg",
      rating: 5,
      text: "Best dental experience I've ever had! The staff is friendly, professional, and the clinic is spotlessly clean.",
      treatment: "Regular Checkup"
    },
    {
      id: 3,
      name: "Pooja Kaushal",
      image: "https://www.indiadens.com/images/feedback/charu-dhawan.jpg",
      rating: 4,
      text: "Mujhe braces se bahut dar lagta tha, par inhone sab kuch itna comfortable bana diya. Meri smile pehle se bahut zyada achi ho gayi hai! Highly recommended.Thank you so much doctor",
      treatment: "Orthodontics(Braces)"
    },
    {
      id: 4,
      name: "Susheela Thakre",
      image: "https://www.indiadens.com/images/feedback/Bharti-Kumar-min.jpg",
      rating: 3,
      text: "Pehle bahut pain tha, par treatment ke baad ab sab perfect hai. Doctor bahut gentle aur caring hain.",
      treatment: "Root Canal"
    },
    {
      id: 5,
      name: "Rutuja Gupte",
      image: "https://bni-india.in/web/open/appsCmsImageDownload?imageObjectId=66e98443e4b05c582e62e249",
      rating: 4,
      text: "The teeth whitening service here is amazing! Quick, painless, and the results are incredible. Highly recommend!",
      treatment: "Teeth Whitening"
    },
    {
      id: 6,
      name: "Shekhar Lilhore",
      image: "https://asiancancerinstitute.com/wp-content/uploads/2024/08/Dr.Anurag-Mahale.jpg",
      rating: 5,
      text: "Saalon ki dental anxiety ke baad, finally mujhe ek aisa dentist mila jis par main trust kar sakta hoon. Wo bahut kind aur gentle hain, and sach mein apne patients ki care karte hain. Best experience ever! 👍",
      treatment: "Root Canal"
    },
    {
      id: 7,
      name: "Anand Sharma",
      image: "https://www.indiadens.com/images/feedback/sumit-dubey.jpg",
      rating: 4,
      text: "Excellent service from start to finish. The emergency dental care I received was prompt and professional.",
      treatment: "Emergency Care"
    },
    {
      id: 8,
      name: "Damodar Soni",
      image: "https://www.newdelhidentistindia.com/images/india-testimonials/ind5.jpg",
      rating: 4,
      text: "My kids actually look forward to their dental appointments now! The pediatric team is fantastic with children.",
      treatment: "Pediatric Dentistry"
    }
  ];

  // Duplicate testimonials for seamless loop
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  const TestimonialCard = ({ testimonial }) => (
   
   
    <div className="flex-shrink-0 w-72 md:w-96 bg-white rounded-2xl p-4 md:p-6 shadow-lg hover:shadow-xl transition-all duration-300 mx-4">
      <div className="flex items-start justify-between mb-2 md:mb-4">
        <Quote className="w-10 h-10 text-blue-500 opacity-50" />
        <div className="flex gap-1">
          {[...Array(testimonial.rating)].map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
          ))}
        </div>
      </div>
      
      <p className="text-gray-700 text-sm md:text-base  mb-2 md:mb-6 leading-relaxed">
        "{testimonial.text}"
      </p>
      
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 ">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-blue-500"
        />
        <div>
          <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
          <p className="text-sm text-blue-600">{testimonial.treatment}</p>
        </div>
      </div>
    </div>

  );

  return (
    <div className="bg-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
            What Our <span className="text-blue-600">Patients Say</span>
          </h2>
          <p className="text-sm md:text-lg text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it. Hear from our happy patients about their experience with our dental care services.
          </p>
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto overflow-hidden px-6 py-6">
        {/* First Row - Scrolling Left */}
        <div className="mb-8">
          <motion.div
            className="flex items-stretch py-4"
            animate={{
              x: [0, -1020],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.slice(0, 8).map((testimonial, index) => (
              <TestimonialCard key={`row1-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        {/* Second Row - Scrolling Right */}
        <div>
          <motion.div
            className="flex"
            animate={{
              x: [-1020, 0],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedTestimonials.slice(8).map((testimonial, index) => (
              <TestimonialCard key={`row2-${index}`} testimonial={testimonial} />
            ))}
          </motion.div>
        </div>

        {/* Gradient Overlays */}
        <div className="absolute top-0 left-0 w-12 md:w-32 h-full bg-gradient-to-r from-white to-transparent pointer-events-none z-10"></div>
        <div className="absolute top-0 right-0 w-12 md:w-32 h-full bg-gradient-to-l from-white to-transparent pointer-events-none z-10"></div>
      </div>

      {/* CTA Section */}
      <div className="text-center mt-16">
        {/* <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
          Book Your Appointment Today
        </button> */}
        <CartoonButton label="Book Your Appointment Today" to="/book-appointment" className='py-3 px-6 rounded-lg bg-primary font-medium text-white text-lg' />
      </div>
    </div>
  );
};

export default DentistTestimonials;