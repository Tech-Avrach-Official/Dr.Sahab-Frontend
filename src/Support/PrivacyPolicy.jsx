import React from 'react';
import Footer from '../components/common/Footer';
import Navbar from '../components/common/Navbar';

const PrivacyPolicy = () => {
  const lastUpdated = "January 12, 2026";

  return (
    <>
    <Navbar/>
    <>
    <div className="bg-white min-h-screen py-20 px-6 sm:px-12 lg:px-24  text-gray-900 font-sans">
      <div className="max-w-5xl mx-auto">
        
        {/* Header Section */}
        <header className="border-b border-gray-200 pb-4 mb-8">
          <h1 className="text-4xl font-semibold text-center mb-10 tracking-tight">Privacy Policy</h1>
          <p className="text-lg font-semibold text-gray-700 uppercase tracking-tight">
            Dr.Saab Dental Clinic | Mr. Mandloi
          </p>
          <p className="text-gray-500 mt-1">Indore, Madhya Pradesh, India</p>
          <p className="text-sm text-gray-500 mt-4 italic">Last Updated: {lastUpdated}</p>
        </header>

        {/* Introduction */}
        <section className="mb-10">
          <p className="mb-4">
            At Dr.Saab Dental Clinic, we take the privacy and security of our patients’ personal information very seriously. This Privacy Policy outlines how we collect, use, and protect the information that we receive from our patients through our website and within our clinical facility in Indore.
          </p>
          <p>
            We are committed to adhering to all applicable laws and regulations governing the privacy of personal information in India, including the <span className='text-gray-800 font-semibold'>Digital Personal Data Protection Act (DPDP), 2023</span>, the Information Technology Rules, 2011, and the <span className='text-gray-800 font-semibold'>Madhya Pradesh Upcharyagriha Tatha Rujopchar Sambandhi Sthapanaye Adhiniyam, 1973</span>.
          </p>
        </section>

        {/* Collection & Use */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">Collection and Use of Personal Information</h2>
          <p className="mb-4">
            We collect personal information from our patients and users when they visit our website, book appointments, or fill out clinical forms. This includes:
          </p>
          <ul className="list-disc ml-6 space-y-2 mb-4">
            <li><strong>Identity & Contact:</strong> Name, address, email address, and phone number.</li>
            <li><strong>Clinical Data:</strong> Date of birth, health history, dental records, X-rays, and diagnostic reports.</li>
            <li><strong>Financial Data:</strong> Insurance information and billing details for payment processing.</li>
          </ul>
          <p className="mb-2">We use this information for the following purposes:</p>
          <ul className="list-disc ml-6 space-y-2">
            <li>To provide dental care services, including diagnosis, treatment, and follow-up care.</li>
            <li>To communicate appointment reminders and respond to inquiries.</li>
            <li>To process payments and verify insurance coverage.</li>
            <li>To comply with legal and regulatory requirements, including maintaining patient records as mandated by Madhya Pradesh state law.</li>
          </ul>
        </section>

        {/* Sharing of Information */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">Sharing of Personal Information</h2>
          <p className="mb-4">
            We do not sell, rent, or trade personal information with third parties for marketing purposes. We may share information with:
          </p>
          <ul className="list-disc ml-6 space-y-2">
            <li>Service providers performing IT support, billing, or clinical analysis on our behalf.</li>
            <li>Madhya Pradesh health authorities or government agencies as required by law.</li>
            <li>Professional advisors, such as lawyers and accountants, if necessary.</li>
            <li>Other healthcare providers involved in the patient’s care (referring specialists).</li>
          </ul>
        </section>

        {/* Security & Protection */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">Protection of Personal Information</h2>
          <p className="mb-4">
            We take appropriate technical and organizational measures to protect your personal information from unauthorized access. Access is limited to authorized personnel who require the data to provide clinical services.
          </p>
          <p>
            However, no system is completely secure. While we comply with Indian data protection standards, we cannot guarantee the absolute security of your information and are not held responsible for unauthorized access beyond our reasonable control.
          </p>
        </section>

        {/* Retention */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">Retention of Personal Information</h2>
          <p>
            We retain your personal information only as long as necessary to fulfill treatment purposes or as required by the <span className='text-gray-800 font-semibold'>Clinical Establishments Act</span> and other relevant laws in Madhya Pradesh. Once no longer required, data is securely deleted or anonymized.
          </p>
        </section>

        {/* Children & Vulnerable Patients */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold mb-4 border-l-4 border-gray-800 pl-4">Children and Vulnerable Patients</h2>
          <p className="mb-4">
            <strong>Children:</strong> We do not knowingly collect information from children under the age of 18 without verifiable consent from a parent or legal guardian.
          </p>
          <p>
            <strong>Vulnerable Patients:</strong> We are committed to the privacy of elderly patients and those with disabilities. We may require additional assistance from a legal caregiver to ensure informed consent and data protection.
          </p>
        </section>

        {/* Rights & Contact */}
        <section className="bg-gray-50 p-8 border border-gray-200 rounded-sm">
          <h2 className="text-2xl font-semibold mb-4">Contact and Grievance Redressal</h2>
          <p className="mb-4">
            Under the DPDP Act 2023, you have the right to access, correct, or request the deletion of your data. For any questions or concerns regarding this policy, please contact our clinic lead:
          </p>
          <div className="space-y-1 text-sm md:text-base">
            <p><strong>Dr.Saab Dental Clinic</strong></p>
            <p>Mr. Mandloi</p>
            <p>Indore, Madhya Pradesh</p>
            <p>Email: <a href="mailto:Service@doctorsaab.com" className="text-blue-600 underline">Service@doctorsaab.com</a></p>
            <p>Phone: +91 7275901611</p>
          </div>
        </section>

        {/* <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2026 Dr.Saab Dental Clinic. All disputes are subject to the jurisdiction of courts in Indore, Madhya Pradesh.</p>
        </footer> */}
      </div>
    </div>
    <Footer/>
    </>
    </>
  );
};

export default PrivacyPolicy;