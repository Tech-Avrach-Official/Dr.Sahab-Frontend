import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getClinicById } from "../../../global_redux/features/clinic/clinicThunk";
import { Mail, Phone, MapPin, User, Calendar, Home } from "lucide-react";

const ClinicProfile = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { clinicProfile, loadingProfile, profileError } = useSelector(
    (state) => state.clinic
  );

  useEffect(() => {
    if (id) dispatch(getClinicById(id));
  }, [dispatch, id]);

  // Loading UI
  if (loadingProfile) {
    return (
      <div className="p-10 flex flex-col items-center">
        <div className="animate-spin h-12 w-12 border-b-2 border-blue-600 rounded-full"></div>
        <p className="text-gray-600 mt-4 text-lg">Loading Clinic Profile...</p>
      </div>
    );
  }

  if (profileError) {
    return (
      <div className="p-6 text-center text-red-600 font-semibold text-lg">
        {profileError}
      </div>
    );
  }

  if (!clinicProfile) {
    return <div className="p-6 text-gray-600 text-center">No clinic found.</div>;
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      {/* Profile Header */}
      <div className="bg-white shadow-lg rounded-2xl p-8 border mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          
          {/* Avatar */}
          <div className="h-32 w-32 bg-blue-100 text-blue-700 flex items-center justify-center rounded-full text-4xl font-bold shadow">
            {clinicProfile.clinic_name.charAt(0).toUpperCase()}
          </div>

          {/* Main Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">
              {clinicProfile.clinic_name}
            </h2>
            <p className="text-gray-600 text-lg flex items-center gap-2 justify-center md:justify-start mt-1">
              <User size={18} /> Dr. {clinicProfile.dentist_name}
            </p>

            <p className="text-sm text-gray-500 mt-2">
              Joined on{" "}
              <b>
                {new Date(clinicProfile.createdAt).toLocaleDateString("en-IN")}
              </b>
            </p>
          </div>
        </div>
      </div>

      {/* Details Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Contact Card */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Contact Info</h3>

          <div className="space-y-3">
            <p className="flex items-center gap-3 text-gray-700">
              <Phone size={18} className="text-blue-600" />
              <span>{clinicProfile.number}</span>
            </p>

            <p className="flex items-center gap-3 text-gray-700 break-all">
              <Mail size={18} className="text-blue-600" />
              <span>{clinicProfile.clinic_email}</span>
            </p>

            {clinicProfile.weeklyOffDays && (
              <p className="flex items-center gap-3 text-gray-700">
                <Calendar size={18} className="text-blue-600" />
                <span>
                  Weekly Off: <b>{clinicProfile.weeklyOffDays.join(", ")}</b>
                </span>
              </p>
            )}
          </div>
        </div>

        {/* Location Card */}
        <div className="bg-white p-6 rounded-xl shadow border">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Location Info</h3>

          <div className="space-y-3">
            <p className="flex items-center gap-3 text-gray-700">
              <MapPin size={18} className="text-blue-600" />
              <span>{clinicProfile.location}</span>
            </p>

            <p className="flex items-center gap-3 text-gray-700 break-words max-w-xs">
              <Home size={18} className="text-blue-600" />
              <span>{clinicProfile.address}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClinicProfile;
