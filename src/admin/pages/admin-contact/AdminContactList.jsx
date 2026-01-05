import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getContacts } from "../../../global_redux/features/contact/contactThunk";
import { Search, X } from "lucide-react";

const AdminContactList = () => {
  const dispatch = useDispatch();
  const { contacts, loading } = useSelector((state) => state.contact);

 
  const [dateFilter, setDateFilter] = useState("all"); 
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(getContacts());
  }, [dispatch]);

  const safeContacts = Array.isArray(contacts) ? contacts : [];

  // --- FILTER LOGIC ---
  const filteredContacts = safeContacts.filter((c) => {
    // 1. Search Filter (Name, Email, or Phone)
    const matchesSearch =
      c.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone?.includes(searchTerm);

    if (!matchesSearch) return false;

    // 2. Date Filter
    if (dateFilter === "all") return true;

    const contactDate = new Date(c.createdAt);
    const today = new Date();

    if (dateFilter === "today") {
      return contactDate.toDateString() === today.toDateString();
    }

    if (dateFilter === "7days") {
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);
      return contactDate >= sevenDaysAgo;
    }

    if (dateFilter === "30days") {
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(today.getDate() - 30);
      return contactDate >= thirtyDaysAgo;
    }

    return true;
  });

  return (
    <div className="p-6">
      {/* HEADER WITH TOP-RIGHT ALIGNED FILTERS */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Contact Submissions</h2>
          <p className="text-gray-600 mt-1">Manage inquiries from your website</p>
        </div>

        {/* FILTERS CONTAINER */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search contacts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-4 pr-10 py-2 w-64 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm transition-all"
            />
            {searchTerm ? (
              <X
                size={16}
                className="absolute right-3 top-2.5 text-gray-400 cursor-pointer hover:text-gray-600"
                onClick={() => setSearchTerm("")}
              />
            ) : (
              <Search size={16} className="absolute right-3 top-2.5 text-gray-400" />
            )}
          </div>

          {/* Date Select Filter */}
          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="border border-gray-200 rounded-lg px-4 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm cursor-pointer"
          >
            <option value="all">All Time</option>
            <option value="today">Today</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="bg-white p-8 rounded-lg shadow text-center border">
          <div className="animate-spin h-10 w-10 border-b-2 border-blue-600 mx-auto rounded-full"></div>
          <p className="mt-3 text-gray-600">Loading contacts...</p>
        </div>
      )}

      {!loading && filteredContacts.length === 0 && (
        <div className="bg-white p-12 rounded-lg shadow text-center border">
          <p className="text-gray-600 text-lg">No inquiries found matching your filters.</p>
          <button
            onClick={() => { setSearchTerm(""); setDateFilter("all"); }}
            className="mt-2 text-blue-600 text-sm font-semibold hover:underline"
          >
            Clear Filters
          </button>
        </div>
      )}

      {!loading && filteredContacts.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden border border-gray-200">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y divide-gray-200">
                {filteredContacts.map((c) => (
                  <tr key={c._id} className="hover:bg-gray-50 transition-colors text-sm">
                    <td className="px-6 py-4 font-bold text-gray-900 whitespace-nowrap">{c.name}</td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{c.email}</td>
                    <td className="px-6 py-4 text-gray-600 whitespace-nowrap">{c.phone || "—"}</td>
                    <td className="px-6 py-4 text-gray-600 max-w-xs truncate">{c.message}</td>
                    <td className="px-6 py-4 text-gray-500 whitespace-nowrap">
                      {new Date(c.createdAt).toLocaleDateString("en-IN", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactList;