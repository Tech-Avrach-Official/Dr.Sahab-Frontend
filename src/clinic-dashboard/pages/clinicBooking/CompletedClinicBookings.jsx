import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCompletedClinicBookings } from "../../../global_redux/features/clinicBooking/clinicBookingThunk";
import { Search, X, Filter } from "lucide-react";

const CompletedClinicBookings = () => {
  const dispatch = useDispatch();
  const { completedBookings, loading } = useSelector((state) => state.clinicBookings);

  // --- FILTER & PAGINATION STATE ---
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all"); // Added time filter state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    dispatch(getCompletedClinicBookings());
  }, [dispatch]);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatDateTime = (date) =>
    new Date(date).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

  // --- FILTER LOGIC ---
  const safeBookings = Array.isArray(completedBookings) ? completedBookings : [];
  
  const filteredBookings = safeBookings.filter((item) => {
    // 1. Text Search Logic
    const term = searchTerm.toLowerCase();
    const matchesSearch = 
      item.name?.toLowerCase().includes(term) ||
      item.phone?.includes(term) ||
      item.location?.toLowerCase().includes(term);

    if (!matchesSearch) return false;

    // 2. Date Filter Logic
    if (timeFilter === "all") return true;

    const bDate = new Date(item.bookingDate);
    const now = new Date();
    
    // Normalize to start of day for accurate comparison
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
  
  // Reset to first page when search or time filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, timeFilter]);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleData = filteredBookings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="p-6">
      {/* Header with Search & Date Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Completed Appointments</h2>
          <p className="text-gray-600 mt-1">All successfully completed treatments</p>
        </div>

        <div className="flex items-center gap-3">
          {/* TIME FILTER DROPDOWN */}
          <div className="relative">
             <select 
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
              className="pl-3 pr-8 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm appearance-none cursor-pointer"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
            </select>
            <Filter size={14} className="absolute right-2.5 top-3.5 text-gray-400 pointer-events-none" />
          </div>

          {/* TOP RIGHT SEARCH BAR */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2.5 w-64 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
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

      {/* Loader */}
      {loading && (
        <div className="text-center py-20">
          <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-gray-500">Loading history...</p>
        </div>
      )}

      {/* Empty State / No Results */}
      {!loading && filteredBookings.length === 0 && (
        <div className="bg-white p-12 rounded-xl text-center shadow border border-gray-100">
          <p className="text-gray-600 text-lg">No completed appointments found for this selection.</p>
          {(searchTerm || timeFilter !== "all") && (
            <button 
              onClick={() => {setSearchTerm(""); setTimeFilter("all");}}
              className="mt-2 text-blue-600 font-semibold hover:underline"
            >
              Clear All Filters
            </button>
          )}
        </div>
      )}

      {/* Table Section (Rest of the code remains identical to yours) */}
      {!loading && filteredBookings.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Patient Details</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Phone</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Treatment Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Amount (₹)</th>
                  <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wider text-gray-500">Completion Info</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-100">
                {visibleData.map((item) => (
                  <tr key={item._id} className="hover:bg-blue-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-bold text-gray-900">{item.name}</div>
                      <div className="text-[10px] text-gray-400 uppercase tracking-tighter">REF: {item._id.slice(-8)}</div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.phone}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{formatDate(item.bookingDate)}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{item.location ?? "—"}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-bold text-emerald-700 bg-emerald-50/30">₹{item.amount?.toLocaleString("en-IN")}</td>
                    <td className="px-6 py-4 text-xs text-gray-500 italic">{formatDateTime(item.updatedAt)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-6 py-4 bg-gray-50 border-t border-gray-100">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-5 py-2 text-sm font-bold bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page <b className="text-blue-600">{currentPage}</b> of <b>{totalPages || 1}</b>
            </span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="px-5 py-2 text-sm font-bold bg-white border border-gray-200 rounded-lg hover:bg-gray-100 disabled:opacity-50 transition-all shadow-sm"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompletedClinicBookings;