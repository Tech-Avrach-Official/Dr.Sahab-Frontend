import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  completeClinicBooking,
  getAcceptedClinicBookings
} from "../../../global_redux/features/clinicBooking/clinicBookingThunk";

import { Calendar, MapPin, Phone, MessageCircle, CheckCircle, Search, X, Filter } from "lucide-react";

const AcceptedAppointments = () => {
  const dispatch = useDispatch();
  const { bookings, loading } = useSelector((state) => state.clinicBookings);

  const [showModal, setShowModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [amount, setAmount] = useState("");

  // --- FILTER & PAGINATION STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all"); // 'all', 'today', 'week', 'month'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  useEffect(() => {
    dispatch(getAcceptedClinicBookings());
  }, [dispatch]);

  const openCompleteModal = (booking) => {
    setSelectedBooking(booking);
    setAmount("");
    setShowModal(true);
  };

  const handleComplete = () => {
    dispatch(
      completeClinicBooking({
        bookingId: selectedBooking._id,
        amount,
      })
    ).then(() => {
      setShowModal(false);
    });
  };

  // --- WORKING FILTER LOGIC ---
  const safeBookings = Array.isArray(bookings) ? bookings : [];
  
  const filteredBookings = safeBookings.filter((b) => {
    // 1. Basic Search Filter
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      b.name?.toLowerCase().includes(term) ||
      b.phone?.includes(term) ||
      b.location?.toLowerCase().includes(term);

    if (!matchesSearch) return false;

    // 2. Date Filter Logic
    if (timeFilter === "all") return true;

    const bDate = new Date(b.bookingDate);
    const now = new Date();
    
    // Normalize dates to remove time (HH:MM:SS) for accurate comparison
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
      return (
        bDate.getMonth() === now.getMonth() && 
        bDate.getFullYear() === now.getFullYear()
      );
    }

    return true;
  });

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, timeFilter]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentBookings = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6">
      {/* Header & Filter Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Accepted Appointments</h2>
          <p className="text-gray-600 mt-1">Appointments assigned and accepted by your clinic</p>
        </div>

        <div className="flex items-center gap-2">
          {/* TIME FILTER DROPDOWN */}
          <select 
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:ring-2 focus:ring-emerald-500 outline-none bg-white shadow-sm"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>

          {/* SEARCH FILTER */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2.5 w-64 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm transition-all"
            />
            {searchTerm ? (
              <X 
                size={18} 
                className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-gray-600" 
                onClick={() => setSearchTerm("")}
              />
            ) : (
              <Search size={18} className="absolute right-3 top-3 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin h-12 w-12 border-b-2 border-emerald-600 mx-auto rounded-full"></div>
          <p className="text-gray-500 mt-4">Fetching appointments...</p>
        </div>
      )}

      {/* Empty / No Results */}
      {!loading && filteredBookings.length === 0 && (
        <div className="bg-white p-12 text-center rounded-2xl shadow-sm border border-gray-100">
          <p className="text-gray-500 text-lg">No matching appointments found.</p>
        </div>
      )}

      {/* Booking Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {!loading && currentBookings.map((b) => (
          <div
            key={b._id}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow p-6 flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-gray-900">{b.name}</h3>
                <span className="text-[10px] bg-gray-100 text-gray-500 px-2 py-1 rounded uppercase font-medium">
                  ID: {b._id?.slice(-6)}
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <Phone size={16} className="text-indigo-500" /> {b.phone}
                </div>

                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <Calendar size={16} className="text-indigo-500" />
                  {new Date(b.bookingDate).toLocaleDateString("en-IN", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric"
                  })}
                </div>

                {b.location && (
                  <div className="flex items-center gap-3 text-gray-600 text-sm">
                    <MapPin size={16} className="text-indigo-500" /> {b.location}
                  </div>
                )}

                {b.message && (
                  <div className="flex items-start gap-3 text-gray-600 text-sm bg-gray-100 p-2 rounded-md mt-2">
                    <MessageCircle size={16} className="text-indigo-700 mt-0.5" /> 
                    <p className="leading-relaxed">"{b.message}"</p>
                  </div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4  border-t border-gray-50">
              {b.status !== "complete" ? (
                <button
                  onClick={() => openCompleteModal(b)}
                  className="w-full bg-indigo-500 hover:bg-indigo-700 text-white py-2 rounded-l flex items-center justify-center gap-3 font-semibold transition-colors"
                >
                  <CheckCircle size={18} />
                  Mark as Completed
                </button>
              ) : (
                <div className="bg-green-50 py-2 rounded-xl border border-green-100">
                  <p className="text-green-700 font-bold text-center flex items-center justify-center gap-2">
                    <CheckCircle size={16} /> Completed (₹{b.amount})
                  </p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* --- PAGINATION UI --- */}
      {!loading && filteredBookings.length > itemsPerPage && (
        <div className="mt-10 flex items-center justify-between bg-white px-6 py-4 rounded-xl border border-gray-100 shadow-sm">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-5 py-2 text-sm font-bold bg-white border border-gray-200 rounded-lg disabled:opacity-50 transition-all hover:bg-gray-50"
          >
            Previous
          </button>

          <span className="text-sm text-gray-600">
            Page <b className="text-gray-900">{currentPage}</b> of <b className="text-gray-900">{totalPages}</b>
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-5 py-2 text-sm font-bold bg-white border border-gray-200 rounded-lg disabled:opacity-50 transition-all hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Modal -UI */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white p-8 rounded-2xl w-full max-w-sm shadow-2xl">
            <h3 className="text-2xl font-bold mb-2 text-gray-900">Treatment Fee</h3>
            <div className="relative mb-6">
               <span className="absolute left-4 top-3 text-gray-400 font-bold">₹</span>
               <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.00"
                className="w-full border border-gray-200 pl-8 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 text-lg font-semibold"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowModal(false)} className="py-3 bg-gray-100 text-gray-700 rounded-xl font-bold">Cancel</button>
              <button onClick={handleComplete} className="py-3 bg-emerald-600 text-white rounded-xl font-bold">Confirm</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcceptedAppointments;