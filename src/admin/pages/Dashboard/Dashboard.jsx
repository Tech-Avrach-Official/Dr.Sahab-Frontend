import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// Import the Admin specific Thunk
import { getAdminDashboardStats } from "../../../global_redux/features/booking/bookingThunk";
import {
  Calendar,
  User,
  ClipboardList,
 ClipboardCheck,
} from "lucide-react";
import PendingAppointments from "../bookings/PendingAppointments";

const Dashboard = () => {
  const dispatch = useDispatch();
  
  // Accessing stats and loading state from Redux
  const { stats, statsLoading } = useSelector((state) => state.booking);

  useEffect(() => {
    // API Call: Get /dashboard/appointmentCount
    dispatch(getAdminDashboardStats());
  }, [dispatch]);

  // Helper to show loading state or the value
  const display = (value) => (statsLoading ? "..." : value || 0);

  return (
    <div className="p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-8">
        Admin Dashboard
      </h1>

      {/* STATS CARDS - Logic mapped to your UI Screenshot */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        
        {/* Card 1: Today Appointments */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Calendar className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Today Appointments</p>
            <h2 className="text-2xl font-bold">
              {display(stats?.todayPending)}
            </h2>
          </div>
        </div>

        {/* Card 2: Total Patients (Mapped to Total Assigned per documentation) */}
        <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
          <div className="p-3 bg-green-100 rounded-lg">
            <User className="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p className="text-gray-500 text-sm">Total Patients</p>
            <h2 className="text-2xl font-bold">
              {display(stats?.totalAssigned)}
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
              {display(stats?.totalPending)}
            </h2>
          </div>
        </div>

        {/* Card 4: Clinic Status (Mapped to Completed per documentation) */}
       <div className="bg-white shadow rounded-xl p-5 flex items-center gap-4">
  <div className="p-3 bg-orange-100 rounded-lg">
    <ClipboardCheck className="w-6 h-6 text-orange-600" />
  </div>
  <div>
    <p className="text-gray-500 text-sm">Completed Appointments</p>
    <h2 className="text-2xl font-bold">
      {display(stats?.totalCompleted)}
      
    </h2>
  </div>
</div>

      </div>

      <PendingAppointments />
    </div>
  );
};

export default Dashboard;