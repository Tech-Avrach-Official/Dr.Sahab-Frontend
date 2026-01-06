import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getPendingBookings,
  getAvailableClinics,
  assignClinicToBooking
} from "../../../global_redux/features/booking/bookingThunk";
import toast from "react-hot-toast";
import { Search, X, MapPin, User, Clock, Filter } from "lucide-react";

const PendingAppointments = () => {
  const dispatch = useDispatch();
  const {
    pendingBookings,
    loading,
    availableClinics,
    availableLoading
  } = useSelector((state) => state.booking);

  const [showAssignModal, setShowAssignModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [selectedClinic, setSelectedClinic] = useState("");

  // --- FILTER & PAGINATION STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all"); // 'all', 'today', 'week', 'month'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(getPendingBookings());
  }, [dispatch]);

  // Reset to page 1 when searching or filtering
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, timeFilter]);

  const handleAssignClick = (booking) => {
    setSelectedBooking(booking);
    setSelectedClinic("");
    setShowAssignModal(true);

    const date = booking.bookingDate?.split("T")[0];
    dispatch(getAvailableClinics(date));
  };

  const handleAssignSubmit = async () => {
    if (!selectedClinic) {
      toast.error("Please select a clinic");
      return;
    }

    try {
      await dispatch(
        assignClinicToBooking({
          bookingId: selectedBooking._id,
          clinicId: selectedClinic,
        })
      ).unwrap();

      dispatch(getPendingBookings());
      setShowAssignModal(false);
      setSelectedBooking(null);
      setSelectedClinic("");
      toast.success("Clinic Assigned!");
    } catch (error) {
      console.log(error);
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

  const safePendingBookings = Array.isArray(pendingBookings) ? pendingBookings : [];

  // --- COMBINED FILTER LOGIC ---
  const filteredBookings = safePendingBookings.filter((booking) => {
    // 1. Search Logic
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      booking.name?.toLowerCase().includes(term) ||
      booking.phone?.includes(term) ||
      booking.location?.toLowerCase().includes(term);

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

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(filteredBookings.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredBookings.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Pending Bookings
          </h2>
          <p className="text-gray-500 mt-1">Assign clinics to new incoming requests</p>
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
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2.5 w-64 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 shadow-sm bg-white"
            />
            {searchTerm ? (
              <X size={18} className="absolute right-3 top-3 text-gray-400 cursor-pointer hover:text-red-500" onClick={() => setSearchTerm("")} />
            ) : (
              <Search size={18} className="absolute right-3 top-3 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {/* TABLE SECTION (Remains largely the same, but uses filtered currentItems) */}
      {!loading && filteredBookings.length > 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50/50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Patient</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Contact</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Requested Date</th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-widest">Message</th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-500 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-right text-xs font-semibold text-gray-500 uppercase tracking-widest">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {currentItems.map((booking) => (
                  <tr key={booking._id} className="hover:bg-yellow-50/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-bold text-gray-900">{booking.name}</div>
                      <div className="text-[10px] font-mono text-gray-400">ID: {booking._id?.slice(-8)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{booking.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Clock size={14} className="text-blue-400" />
                        {formatDate(booking.bookingDate)}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                      {booking.message || <span className="italic text-gray-300">No message</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span className="bg-amber-100 text-amber-700 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider">
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleAssignClick(booking)}
                        className="px-5 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 text-xs font-bold transition-all shadow-md active:scale-95"
                      >
                        Assign Clinic
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
              className="px-4 py-2 text-sm font-bold bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-all"
            >
              Previous
            </button>
            <span className="text-sm text-gray-500">
              Page <span className="text-blue-600 font-bold">{currentPage}</span> of <span className="text-gray-900 font-bold">{totalPages || 1}</span>
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-4 py-2 text-sm font-bold bg-white border border-gray-200 rounded-xl shadow-sm hover:bg-gray-50 disabled:opacity-50 transition-all"
            >
              Next
            </button>
          </div>
        </div>
      ) : (
        !loading && (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-dashed border-gray-300">
            <p className="text-gray-600 text-lg font-medium">No results found for current filters.</p>
            <button 
              onClick={() => {setSearchTerm(""); setTimeFilter("all");}}
              className="mt-2 text-blue-600 font-bold hover:underline"
            >
              Reset Filters
            </button>
          </div>
        )
      )}

      {/* MODAL Remains unchanged logic-wise */}
      {showAssignModal && selectedBooking && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-[2rem] max-w-md w-full shadow-2xl overflow-hidden border border-white/20">
            <div className="bg-indigo-400  px-8 py-7 text-white relative">
              <h3 className="text-2xl font-bold">Assign Clinic</h3>
              {/* <p className="text-gray text-sm mt-1">Select a facility for {selectedBooking.name}</p> */}
              {/* <button onClick={() => setShowAssignModal(false)} className="absolute top-7 right-7 p-1 hover:bg-white/20 rounded-full transition-colors">
                <X size={22} />
              </button> */}
            </div>
            <div className="p-2 space-y-6">
              <div className=" rounded-2xl p-4  ">
                <div className="flex items-center gap-3 mb-2">
                  <User size={18} className="text-gray-600" />
                  <span className="font-bold text-gray-700">{selectedBooking.name}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <MapPin size={16} />
                  <span>{selectedBooking.location}</span>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-2 ml-1">
                  Available Clinics
                </label>
                {availableLoading ? (
                  <div className="py-6 text-center bg-blue-50/50 rounded-2xl border border-dashed border-blue-200">
                    <div className="animate-spin h-6 w-6 border-2 border-blue-600 border-t-transparent rounded-full mx-auto"></div>
                    <p className="text-xs text-blue-600 mt-2 font-medium">Searching for clinics...</p>
                  </div>
                ) : (
                  <select
                    value={selectedClinic}
                    onChange={(e) => setSelectedClinic(e.target.value)}
                    className="w-full bg-white border border-gray-200 p-4 rounded-2xl text-sm focus:ring-1 focus:ring-gray-500 outline-none appearance-none cursor-pointer font-medium shadow-sm"
                  >
                    <option value="">-- Choose a Clinic --</option>
                    {availableClinics?.length > 0 ? (
                      availableClinics.map((clinic) => (
                        <option key={clinic._id} value={clinic._id}>
                          🏥 {clinic.clinic_name} ({clinic.location})
                        </option>
                      ))
                    ) : (
                      <option value="" disabled>No clinics available for this date</option>
                    )}
                  </select>
                )}
              </div>
            </div>
            <div className="px-8 py-6 bg-gray-50 border-t flex gap-3 justify-around">
              <button onClick={() => setShowAssignModal(false)} className="px-6 py-2.5 text-gray-500 font-bold text-sm hover:text-gray-800 transition-colors">Cancel</button>
              <button onClick={handleAssignSubmit} disabled={!selectedClinic} className="px-5 py-2 bg-blue-700 text-white rounded-xl hover:bg-blue-900 font-bold text-sm  disabled:opacity-50 active:scale-95 transition-all">Confirm Assignment</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAppointments;