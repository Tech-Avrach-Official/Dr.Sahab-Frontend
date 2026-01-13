import React from 'react';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';



const TermsAndConditions = () => {
  const effectiveDate = "January 12, 2026";
    
  return (
    <>
    <Navbar />
    <>
    <div className="bg-white min-h-screen py-20 px-6 sm:px-12 lg:px-24 text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="border-b border-gray-200 pb-5 mb-10">
          <h1 className="text-3xl font-semibold mb-4 text-center">Terms and Conditions</h1>
          <p className="text-lg font-semibold text-gray-700 uppercase tracking-tight pt-10">
            Dr.Saab Dental Clinic | Mr. Mandloi
          </p>
          <p className="text-gray-500 mt-1">Indore, Madhya Pradesh, India</p>
          <p className="text-sm text-gray-500 mt-4 italic">Effective Date: {effectiveDate}</p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <p className="mb-4">
            Welcome to <span className='font-semibold'>Dr.Saab Dental Clinic</span>. By accessing our website, booking an appointment, or utilizing our clinical services, you agree to comply with and be bound by the following Terms and Conditions. 
          </p>
          <p>
            These terms are governed by the laws of India and the state of Madhya Pradesh. If you do not agree with any part of these terms, please do not use our services or website.
          </p>
        </section>

        {/* General Clinical Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">1. General Information</h2>
          <p className="mb-4">
            The content provided on our website is for general informational purposes only. It is not intended to be a substitute for professional dental advice, diagnosis, or treatment. 
          </p>
          <p>
            Always seek the advice of <span className='font-semibold'>Mr. Mandloi</span> or other qualified health providers at our Indore clinic regarding any specific dental condition or treatment plan.
          </p>
        </section>

        {/* Appointments & Cancellations */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">2. Appointments and Cancellations</h2>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Booking:</strong> Appointments can be scheduled via our website, telephone (+91 7275901611), or in person at our Indore facility.</li>
            <li><strong>Punctuality:</strong> Patients are requested to arrive at least 10 minutes prior to their scheduled time to complete necessary clinical paperwork.</li>
            <li><strong>Cancellations:</strong> As a courtesy to other patients, we require at least <span className='font-semibold'>24 hours' notice</span> for cancellations or rescheduling. Repeated "no-shows" may incur a consultation fee.</li>
          </ul>
        </section>

        {/* Payments & Fees */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">3. Payments and Billing</h2>
          <p className="mb-4">
            Payment for dental services is due at the time of treatment unless prior financial arrangements have been made with the clinic management.
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Methods:</strong> We accept Cash, UPI (GPay/PhonePe), Debit/Credit Cards, and approved Insurance TPA claims.</li>
            <li><strong>Estimates:</strong> While we provide treatment estimates, the final cost may vary based on clinical complexities discovered during the procedure.</li>
            <li><strong>Changes:</strong> Treatment fees are subject to change without prior notice, in accordance with clinic policy and material costs.</li>
          </ul>
        </section>

        {/* Clinical Liability */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">4. Treatment and Medical Records</h2>
          <p className="mb-4">
            Our clinical team provides care based on the medical history and information provided by the patient. 
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li><strong>Accuracy:</strong> The patient is responsible for providing accurate health history, including allergies and current medications. Dr.Saab Dental Clinic is not liable for complications arising from undisclosed medical information.</li>
            <li><strong>Consent:</strong> Specific surgical or invasive procedures will require a signed Informed Consent form as per MP state health guidelines.</li>
            <li><strong>Confidentiality:</strong> Records are handled as per our Privacy Policy and the DPDP Act 2023.</li>
          </ul>
        </section>

        {/* Website Usage & IP */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">5. Website Usage & Intellectual Property</h2>
          <p className="mb-4">
            All content, logos (Dr.Saab Dental Clinic), and images on this website are the intellectual property of the clinic and Mr. Mandloi.
          </p>
          <p>
            Unauthorized copying, reproduction, or distribution of this material is strictly prohibited. You agree not to misuse the website for any unlawful activities, including the transmission of malware or spam.
          </p>
        </section>

        {/* Limitation of Liability */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">6. Limitation of Liability</h2>
          <p>
            Dental treatments involve inherent risks. While we strive for excellence, clinical results can vary. Dr.Saab Dental Clinic and its staff shall not be liable for any indirect, incidental, or consequential damages resulting from the use of our website or standard clinical procedures, provided they were performed within the acceptable standard of care.
          </p>
        </section>

        {/* Jurisdiction */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">7. Governing Law and Jurisdiction</h2>
          <p>
            Any disputes arising out of these terms, the website, or clinical services shall be governed by the laws of India and shall be subject to the exclusive jurisdiction of the courts in <span className='font-semibold'>Indore, Madhya Pradesh</span>.
          </p>
        </section>

        {/* Contact Footer */}
        <section className="bg-gray-50 p-8 border border-gray-200 rounded-sm">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="mb-4">
            For clarifications regarding these terms, please reach out to us:
          </p>
          <div className="space-y-1 text-sm md:text-base">
            <p><strong>Dr.Saab Dental Clinic</strong></p>
            <p>Indore, Madhya Pradesh</p>
            <p>Email: <a href="mailto:Service@doctorsaab.com" className="text-blue-600 underline">Service@doctorsaab.com</a></p>
            <p>Phone: +91 7275901611</p>
          </div>
        </section>

        {/* <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2026 Dr.Saab Dental Clinic. All Rights Reserved.</p>
        </footer> */}
       
      </div>
    </div>
    <Footer/>
     </> 
     </>
  );
   
};



export default TermsAndConditions;