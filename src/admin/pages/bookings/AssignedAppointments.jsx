import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAssignedBookings } from "../../../global_redux/features/booking/bookingThunk";
import { getClinicById } from "../../../global_redux/features/clinic/clinicThunk";
import { Search, X, MapPin, Phone, User, Building2, MapPinned, Filter, Clock } from "lucide-react"; 

const AssignedAppointments = () => {
  const dispatch = useDispatch();

  const { assignedBookings, loading } = useSelector((state) => state.booking);
  const { clinicDetails } = useSelector((state) => state.clinic);

  const [selectedClinicId, setSelectedClinicId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  
  // --- FILTER & PAGINATION STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all"); // 'all', 'today', 'week', 'month'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    dispatch(getAssignedBookings());
  }, [dispatch]);

  const handleViewClinic = (clinicId) => {
    setSelectedClinicId(clinicId);
    setModalOpen(true);
    if (!clinicDetails[clinicId]) {
      dispatch(getClinicById(clinicId));
    }
  };

  const closeModal = () => {
    setSelectedClinicId(null);
    setModalOpen(false);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const safeAssignedBookings = Array.isArray(assignedBookings) ? assignedBookings : [];

  // --- COMBINED FILTER LOGIC ---
  const filteredBookings = safeAssignedBookings.filter((booking) => {
    // 1. Search Logic
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      booking.name?.toLowerCase().includes(term) ||
      booking.phone?.includes(term) ||
      (booking._id && booking._id.toLowerCase().includes(term));

    if (!matchesSearch) return false;

    // 2. Date Filter Logic
    if (timeFilter === "all") return true;

    const bDate = new Date(booking.bookingDate);
    const now = new Date();
    const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfBooking = new Date(bDate.getFullYear(), bDate.getMonth(), bDate.getDate());

    if (timeFilter === "today") {
      return startOfBooking.getTime() === startOfToday.getTime();
    }
    if (timeFilter === "week") {
      const sevenDaysAgo = new Date(startOfToday);
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      return startOfBooking >= sevenDaysAgo && startOfBooking <= startOfToday;
    }
    if (timeFilter === "month") {
      return bDate.getMonth() === now.getMonth() && bDate.getFullYear() === now.getFullYear();
    }
    return true;
  });

  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  
  // Reset pagination on filter change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, timeFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginatedBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  const currentClinic = selectedClinicId ? clinicDetails[selectedClinicId] : null;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Assigned Appointments
          </h2>
          <p className="text-gray-500 mt-1">Currently active clinic assignments</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* DATE FILTER DROPDOWN */}
          <div className="flex items-center gap-2 bg-white border border-gray-300 rounded-xl px-3 py-2.5 shadow-sm">
            <Filter size={16} className="text-gray-400" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="text-sm font-semibold focus:outline-none bg-transparent cursor-pointer text-gray-700"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">Past 7 Days</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* SEARCH BAR */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2.5 w-64 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 shadow-sm bg-white transition-all"
            />
            {searchTerm ? (
               <X size={18} className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-red-500" onClick={() => setSearchTerm("")} />
            ) : (
              <Search size={18} className="absolute right-3 top-3 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading active bookings...</p>
        </div>
      )}

      {/* TABLE SECTION */}
      {!loading && filteredBookings.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Patient Details</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Location</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {paginatedBookings.map((booking) => (
                  <tr key={booking._id} className="hover:bg-blue-50/30 transition-colors group">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{booking.name}</div>
                      <div className="text-[10px] font-mono text-gray-400 uppercase">ID: {booking._id?.slice(-8)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 font-medium">{booking.phone}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-blue-400" />
                        {formatDate(booking.bookingDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <MapPin size={14} className="text-blue-400" /> {booking.location}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-[11px] font-bold uppercase tracking-wider">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => handleViewClinic(booking.clinicId)}
                        className="px-4 py-2 bg-white border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION UI */}
          <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 border-t">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 text-sm font-bold bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500 font-medium">
              Page <span className="text-blue-600 font-bold">{currentPage}</span> of <span className="text-gray-900 font-bold">{totalPages || 1}</span>
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 text-sm font-bold bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="bg-white rounded-2xl shadow-sm p-16 text-center border border-dashed border-gray-300">
            <p className="text-gray-600 text-lg font-medium">No results found for these filters.</p>
            <button 
              onClick={() => {setSearchTerm(""); setTimeFilter("all");}}
              className="mt-2 text-blue-600 font-bold hover:underline"
            >
              Reset all filters
            </button>
          </div>
        )
      )}

      {/* ADVANCED CLINIC MODAL */}
      {modalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full shadow-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">
            <div className="bg-gradient-to-br from-blue-600 to-blue-800 px-8 py-7 text-white relative">
              <h3 className="text-2xl font-bold tracking-tight">Clinic Details</h3>
              <p className="text-blue-100/80 text-sm mt-1">Assigned facility information</p>
              <button onClick={closeModal} className="absolute top-7 right-7 p-1 hover:bg-white/20 rounded-full transition-colors">
                <X size={22} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              {!currentClinic ? (
                <div className="flex flex-col items-center py-10">
                  <div className="animate-spin h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full mb-4"></div>
                  <p className="text-gray-500 font-medium">Fetching clinic info...</p>
                </div>
              ) : (
                <>
                  <div className="flex items-start gap-4 group">
                    <div className="p-3.5 bg-blue-50 rounded-2xl text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <Building2 size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Clinic Name</p>
                      <p className="text-lg font-bold text-gray-800 leading-tight">{currentClinic.clinic_name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3.5 bg-indigo-50 rounded-2xl text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300">
                      <User size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Assigned Dentist</p>
                      <p className="text-lg font-semibold text-gray-800 leading-tight">{currentClinic.dentist_name}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3.5 bg-emerald-50 rounded-2xl text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                      <Phone size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]">Contact Number</p>
                      <p className="text-lg font-semibold text-gray-800 leading-tight">{currentClinic.number}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4 group">
                    <div className="p-3.5 bg-orange-50 rounded-2xl text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-colors duration-300">
                      <MapPinned size={22} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em]"> Address</p>
                      <p className="text-sm leading-relaxed text-gray-600 font-medium">
                        {currentClinic.address}, <span className="text-gray-900">{currentClinic.location}</span>
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end">
              <button
                onClick={closeModal}
                className="px-10 py-3 bg-gray-900 text-white rounded-2xl hover:bg-black font-bold text-sm shadow-xl shadow-gray-200 transition-all active:scale-95"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AssignedAppointments;