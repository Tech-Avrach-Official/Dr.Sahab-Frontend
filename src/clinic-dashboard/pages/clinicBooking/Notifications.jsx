import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAssignedBookings,
  acceptClinicBooking,
  rejectClinicBooking,
} from "../../../global_redux/features/clinicBooking/clinicBookingThunk";

import { Calendar, MapPin, Phone, MessageCircle, User, X, Search, Filter } from "lucide-react";

const Notifications = () => {
  const dispatch = useDispatch();
  const { assignedBookings, loading } = useSelector(
    (state) => state.clinicBookings
  );

  const [selectedBooking, setSelectedBooking] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  // --- FILTER STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    dispatch(getAssignedBookings());
  }, [dispatch]);

  const handleOpenModal = (booking) => {
    setSelectedBooking(booking);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedBooking(null);
    setModalOpen(false);
  };

  const handleAccept = (id) => {
    dispatch(acceptClinicBooking(id));
    handleCloseModal();
  };

  const handleReject = (id) => {
    if (window.confirm("Are you sure you want to reject this appointment?")) {
      dispatch(rejectClinicBooking(id));
      handleCloseModal();
    }
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

  // --- FILTER LOGIC ---
  const safeBookings = Array.isArray(assignedBookings) ? assignedBookings : [];

  const filteredBookings = safeBookings.filter((book) => {
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      book.name?.toLowerCase().includes(term) ||
      book.phone?.includes(term);

    if (!matchesSearch) return false;

    if (timeFilter === "all") return true;

    const bDate = new Date(book.bookingDate);
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

  return (
    <div className="p-6 bg-slate-50 min-h-screen">
      {/* Clean Header with Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <h2 className="text-3xl font-bold text-gray-900">Assigned Appointments</h2>

        <div className="flex items-center gap-3">
          {/* Time Filter Dropdown */}
          <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 shadow-sm">
            <Filter size={16} className="text-gray-400" />
            <select
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="text-sm font-semibold focus:outline-none bg-transparent cursor-pointer text-gray-700"
            >
              <option value="all">All Dates</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2.5 w-64 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
            />
            {searchTerm ? (
              <X size={16} className="absolute right-3 top-3 text-gray-400 cursor-pointer" onClick={() => setSearchTerm("")} />
            ) : (
              <Search size={16} className="absolute right-3 top-3 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* Table Section */}
      {!loading && filteredBookings.length > 0 ? (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-100">
            <thead className="bg-slate-50/50">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-400">Patient</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-400">Phone</th>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase text-gray-400">Booking Date</th>
                <th className="px-6 py-4 text-center text-xs font-bold uppercase text-gray-400">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 text-sm">
              {filteredBookings.map((book) => (
                <tr key={book._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-bold text-gray-800">{book.name}</td>
                  <td className="px-6 py-4 text-gray-600">{book.phone}</td>
                  <td className="px-6 py-4 text-gray-600">{formatDate(book.bookingDate)}</td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => handleOpenModal(book)}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-semibold shadow-md transition-all active:scale-95"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        !loading && (
          <div className="bg-white p-20 text-center rounded-2xl border border-gray-100 shadow-sm">
            <p className="text-gray-400 text-lg">No appointments match your criteria.</p>
          </div>
        )
      )}

      {/* --- MODAL (Logic Remains Identical) --- */}
      {modalOpen && selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-sm w-full overflow-hidden border border-gray-100 animate-in zoom-in-95 duration-200">
            <div className="px-6 pt-6 pb-2 flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800">Appointment Details</h3>
              <button onClick={handleCloseModal} className="text-slate-400 hover:text-slate-600">
                <X size={18} />
              </button>
            </div>

            <div className="px-6 py-2">
              <hr className="mb-4 border-gray-100" />
              <div className="flex items-center gap-3 mb-5">
                <div className="bg-indigo-600 p-2 rounded-lg flex-shrink-0">
                  <User size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-[9px] font-bold text-indigo-500 uppercase tracking-wider">Client Profile</p>
                  <h3 className="text-md font-bold text-slate-900">{selectedBooking.name}</h3>
                </div>
              </div>

              <div className="space-y-3 mb-5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Phone size={14} />
                    <span className="text-xs font-semibold">Phone</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700">{selectedBooking.phone}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <Calendar size={14} />
                    <span className="text-xs font-semibold">Booking Date</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700">{formatDate(selectedBooking.bookingDate)}</p>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin size={14} />
                    <span className="text-xs font-semibold">Location</span>
                  </div>
                  <p className="text-xs font-bold text-slate-700">{selectedBooking.location || "N/A"}</p>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 mb-2">
                <div className="flex items-center gap-1.5 mb-1 text-indigo-500">
                  <MessageCircle size={12} />
                  <p className="text-[9px] font-black uppercase tracking-widest">Message</p>
                </div>
                <p className="text-xs text-slate-600 italic line-clamp-2">
                  "{selectedBooking.message || "No message."}"
                </p>
              </div>
            </div>

            <div className="px-3 py-4 bg-gray-50/50 flex items-center justify-between gap-2 mt-2">
              <button onClick={handleCloseModal} className="px-3 py-1.5 text-xs font-bold text-gray-500 hover:text-black">Close</button>
              <button onClick={() => handleReject(selectedBooking._id)} className="px-4 py-2 ml-28  bg-red-600 text-white text-xs font-bold rounded-lg transition-colors">Reject</button>
              <button onClick={() => handleAccept(selectedBooking._id)} className="px-5 py-2 bg-emerald-600 text-white text-xs font-bold rounded-lg transition-all active:scale-95">Accept</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;