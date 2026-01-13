import React from "react";
import Footer from "../components/common/Footer";
import Navbar from "../components/common/Navbar";

const HelpandFAQ = () => {
    const lastUpdated = " January 13, 2026";

    return (
        <>
            <Navbar />
            <>
                <div className="bg-white min-h-screen py-20 px-6 sm:px-12 lg:px-24 text-gray-900 font-sans ">
                    <div className="max-w-5xl mx-auto">

                        {/* Header Section */}
                        <header className="border-b border-gray-200 pb-4 mb-10">
                            <h1 className="text-4xl font-semibold text-center mb-12 tracking-tight ">Help & Frequently Asked Questions</h1>
                            <p className="text-lg font-semibold text-gray-700 uppercase tracking-tight">
                                Dr.Saab Dental Clinic | Support Center
                            </p>
                            <p className="text-gray-500 mt-1">Providing personalized dental care in Indore, MP</p>
                        </header>

                        {/* General Questions Section */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-bold mb-6 text-blue-900">General Questions</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">What are the clinic timings?</h3>
                                    <p className="text-gray-700">
                                        Dr.Saab Dental Clinic is typically open from Monday to Saturday. Morning sessions usually run from 10:00 AM to 2:00 PM, and evening sessions from 5:00 PM to 9:00 PM. Please call +91 7275901611 to confirm specific timings for public holidays.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">How do I book an appointment with Mr. Mandloi?</h3>
                                    <p className="text-gray-700">
                                        You can book an appointment directly through our website’s "Appointment" page, or by calling our reception. We recommend booking at least 24–48 hours in advance for preferred slots.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Do you handle dental emergencies?</h3>
                                    <p className="text-gray-700">
                                        Yes, we prioritize emergency cases such as acute tooth pain, trauma, or broken restorations. Please contact us immediately so we can accommodate you as a priority.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Treatment & Cost Section */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6 text-blue-900">Treatments & Costs</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">What dental services do you provide?</h3>
                                    <p className="text-gray-700">
                                        We provide comprehensive dental care including routine cleaning (scaling), root canal treatments (RCT), dental implants, crowns and bridges, orthodontic treatments, and cosmetic dentistry.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Are the treatment costs fixed?</h3>
                                    <p className="text-gray-700">
                                        While we have a standard price list for basic procedures, complex treatments are priced based on the material used (e.g., type of crown or implant) and the clinical complexity of the case. A detailed estimate is provided after the initial consultation.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-lg font-semibold mb-2">Do you accept dental insurance?</h3>
                                    <p className="text-gray-700">
                                        We assist with documentation for dental insurance claims and work with several TPA providers. Please bring your insurance policy details during your first visit to check for eligibility.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Post-Treatment Section */}
                        <section className="mb-12">
                            <h2 className="text-2xl font-semibold mb-6 text-blue-900">After-Care Support</h2>

                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">What should I do if I have pain after a procedure?</h3>
                                    <p className="text-gray-700">
                                        Minor discomfort is common after certain treatments. We provide specific post-care instructions and prescriptions after every procedure. If the pain persists or you notice unusual swelling, please contact the clinic lead, Mr. Mandloi, immediately.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Contact Support Footer */}
                        <section className="bg-gray-50 p-8 border border-gray-200 rounded-sm">
                            <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
                            <p className="mb-6">
                                If you couldn't find the answer you were looking for, our team is here to help.
                            </p>
                            <div className="grid grid-cols-1  text-sm md:text-base">
                                
                                    <p className="font-bold">Call Us</p>
                                    <p><a href="tel:+91 7275901611" className="text-blue-800" >+91 7275901611</a></p>
                               <br/>
                                    <p className="font-bold">Email Us</p>
                                    <p><a href="mailto:Service@doctorsaab.com" className="text-blue-800 hover:underline">Service@doctorsaab.com</a></p>
                               
                                <br/>
                                    <p className="font-bold">Visit the Clinic</p>
                                    <p className="text-gray-600">Indore, Madhya Pradesh</p>
                                
                            </div>
                        </section>

                        {/* <footer className="mt-16 pt-8 border-t border-gray-200 text-center text-gray-500 text-sm">
          <p>© 2026 Dr.Saab Dental Clinic. Committed to excellence in dental health.</p>
        </footer> */}
                    </div>
                </div>
                <Footer />
            </>
        </>
    )

};
export default HelpandFAQ;
