import React from "react";
import { Instagram, Facebook, Youtube, Twitter, Mail ,Phone, MapPin} from "lucide-react";
import { Link } from "react-router-dom";
import logo from '../../assets/drsaab logo.png';


const Footer = () => {

  const quickLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about" },
    { name: "Services", path: "/services" },
    { name: "Appointment", path: "/appointment" },

  ];
   const supportLinks= [
    { name: "Help", path: "/Help" },
    { name: "Terms & Conditions", path: "/Terms" },
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Contact Us", path: "/contact" },

  ];
  return (
    <footer className="p-5">
      <div className="relative rounded-2xl mx-auto bg-gradient-to-b from-[#1D2236] to-[#2B4CA4] py-12">

        {/* Grid Overlay */}
        {/* <div
          className="w-full h-full absolute inset-0 opacity-50 z-10 rounded-2xl
          bg-[linear-gradient(#ffffff0c_1px,transparent_2px),linear-gradient(90deg,#ffffff0c_1px,transparent_2px)]
          bg-[size:30px_30px]"
        ></div> */}

        {/* Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-10 px-6">

          {/* Brand Section */}
          <div className="space-y-2 lg:col-span-4">
           
             <div className="bg-blue-50 w-52 h-14 mx-2 px-2 rounded-xl flex items-center justify-center"> 
  <img 
    src={logo} 
    alt="Logo"  
    className="h-28 w-full object-contain"
  />
</div>
            <p className="text-gray-300 text-base leading-relaxed max-w-sm">
              Comprehensive dental services, confident smiles through personalized care.
            </p>

            {/* Social Icons */}
            <div className="flex gap-3">
               
              {[
                { icon: <Instagram size={20} />, link: "https://www.instagram.com/_doctor.saab_/?utm_source=qr&igsh=MTQ5MmZuNzZlcnlsYg%3D%3D#" },
                { icon: <Facebook size={20} />, link: "#" },
                { icon: <Twitter size={20} />, link: "#" },
                { icon: <Youtube size={20} />, link: "#" },
              ].map((item, i) => (
                <Link
                 aria-label="social Profile"
                  key={i}
                  to={item.link}
                  className="w-10 h-10 rounded-full border border-white/30 hover:border-white hover:bg-white/10 flex items-center justify-center text-white transition-all"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-white mb-5">Quick Links</h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-white text-base flex items-center gap-2 transition-colors"
                  >
                    <span className="text-blue-300">•</span> {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-white mb-5">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map(
                (link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-gray-300 hover:text-white text-base flex items-center gap-2 transition-colors"
                    >
                      <span className="text-blue-300">•</span> {link.name}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Contact Us */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-semibold text-white mb-5">Contact Us</h3>
            <ul className="space-y-3 text-gray-300 text-base">
              <li>

                <a 
                href="https://www.google.com/maps/search/?api=1&query=Indore,+Madhya+Pradesh"
                target="_blank"
                rel="noopener noreferrer"
                 className="flex items-center gap-3 hover:text-white"><MapPin size={24}/>
                   Indore, Madhya Pradesh</a></li>

              <li>
                <a href="tel:+917275901611"
                className=" flex items-center gap-3 hover:text-white">
                 <Phone size={24}/> +91 7275901611</a></li>

              <li><a href="https://mail.google.com/mail/?view=cm&fs=1&to=Service@doctorsaab.com"
              target="_blank"
              rel="noopener noreferrer" 
              className=" flex items-center gap-2 hover:text-white "><Mail size={24}/>
              <span className="text-m">Service@doctorsaab.com</span></a> </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="max-w-7xl mx-auto mt-10 border-t border-white/10">
          <p className="text-center text-gray-300 text-sm py-6">
            Copyright © 2025 Denture. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
