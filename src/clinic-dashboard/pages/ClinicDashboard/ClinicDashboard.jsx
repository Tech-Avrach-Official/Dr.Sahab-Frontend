import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getClinicDashboardStats } from "../../../global_redux/features/booking/bookingThunk";
import {
  Calendar,
  User,
  ClipboardList,
  Activity,
} from "lucide-react";
import Notifications from "../clinicBooking/Notifications";

const ClinicDashboard = () => {
  const dispatch = useDispatch();
  
  // Accessing stats and loading state from Redux
  const { stats, statsLoading } = useSelector((state) => state.booking);

  useEffect(() => {
    // Fetch statistics on component mount
    dispatch(getClinicDashboardStats());
  }, [dispatch]);

  // Helper to show loading state or the value
  const display = (value) => (statsLoading ? "..." : value ?? 0);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* STATS CARDS */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Card 1: Today Appointments */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Today Appointments</p>
            <h2 className="text-2xl font-bold">
              {display(stats?.todayAssigned)}
            </h2>
          </div>
        </div>

        {/* Card 2: Total Patients */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Patients</p>
            <h2 className="text-2xl font-bold">
              {display(stats?.totalAccepted)}
            </h2>
          </div>
        </div>

        {/* Card 3: Pending Appointments */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-purple-100 rounded-lg">
            <ClipboardList className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Pending Appointments</p>
            <h2 className="text-2xl font-bold">
              {display(stats?.totalAssigned)}
            </h2>
          </div>
        </div>

       {/* Card 4: Clinic Status (Mapped to Total Revenue) */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-lg">
            <Activity className="w-6 h-6 text-orange-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Revenue</p>
            <h2 className="text-2xl font-bold">
              {/* Aggregated total completed appointment amount  */}
              ₹ {display(stats?.totalAmount)}
            </h2>
          </div>
        </div>

      </div>

      <Notifications />
    </div>
  );
};

export default ClinicDashboard;