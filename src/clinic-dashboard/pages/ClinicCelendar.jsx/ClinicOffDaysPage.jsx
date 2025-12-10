// ClinicOffDaysPage.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchClinicOffDays } from "../../../global_redux/features/clinicOffDays/clinicOffDaysThunk";
import { useCalendar } from "./components/useCalendar";
import CalendarHeader from "./components/CalendarHeader";
import DayCell from "./components/DayCell";

const ClinicOffDaysPage = () => {
  const dispatch = useDispatch();
  const { offDays, loading, error } = useSelector((state) => state.clinicOffDays);

  const { monthLabel, weeks, goPrevMonth, goNextMonth } = useCalendar();

  const today = new Date();

  // 🔵 Fetch off days on mount
  useEffect(() => {
    console.log("🔵 Component Mounted - Fetching off days...");
    dispatch(fetchClinicOffDays());
  }, [dispatch]);

  // 🔵 Debug state changes
  useEffect(() => {
    console.log("📊 Redux State:");
    console.log("  - Off Days:", offDays);
    console.log("  - Loading:", loading);
    console.log("  - Error:", error);
  }, [offDays, loading, error]);

  // Helper: Check if two dates are same
  const isSameDate = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  // Helper: Find off day by date
  const findOffDayByDate = (dateObj) => {
    const dateStr = dateObj.toISOString().slice(0, 10); // "2024-12-10"
    const found = offDays.find((d) => d.date?.startsWith(dateStr)) || null;
    
    if (found) {
      console.log(`✅ Off day found for ${dateStr}:`, found);
    }
    
    return found;
  };

  // Helper: Check if date is off day
  const isOffDay = (dateObj) => !!findOffDayByDate(dateObj);

  // Helper: Get reason for off day
  const getOffDayReason = (dateObj) => {
    const match = findOffDayByDate(dateObj);
    return match?.reason || "";
  };

  // Handler: Day click (just log for now)
  const handleDayClick = (dateObj) => {
    if (!dateObj) return;
    
    console.log("🖱️ Day clicked:", dateObj.toLocaleDateString("en-IN"));
    const offDayRecord = findOffDayByDate(dateObj);
    
    if (offDayRecord) {
      console.log("  ✅ This is an OFF day:", offDayRecord);
    } else {
      console.log("  ✅ This is a working day");
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow border p-6">
        
        {/* Error Display */}
        {error && (
          <div className="mb-4 p-4 bg-red-50 border-l-4 border-red-500 rounded">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium text-red-800">
                  Failed to load off days
                </h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
              <button
                onClick={() => dispatch(fetchClinicOffDays())}
                className="ml-4 px-3 py-1 text-sm bg-red-100 hover:bg-red-200 text-red-800 rounded"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {/* Calendar Header */}
        <CalendarHeader
          monthLabel={monthLabel}
          onPrev={goPrevMonth}
          onNext={goNextMonth}
        />

        {/* Weekday Labels */}
        <div className="grid grid-cols-7 text-center text-xs font-semibold text-gray-500 mb-2">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
            <div key={d} className="py-1">
              {d}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-sm">
          {weeks.map((week, wi) =>
            week.map((dateObj, di) => (
              <DayCell
                key={dateObj ? dateObj.toISOString() : `empty-${wi}-${di}`}
                dateObj={dateObj}
                isToday={dateObj ? isSameDate(dateObj, today) : false}
                isOff={dateObj ? isOffDay(dateObj) : false}
                reason={dateObj ? getOffDayReason(dateObj) : ""}
                onClick={handleDayClick}
              />
            ))
          )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="mt-4 text-center text-gray-500">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-sm">Loading off days...</p>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && offDays.length === 0 && (
          <div className="mt-8 text-center text-gray-500">
            <p className="text-sm">No off days marked yet</p>
            <p className="text-xs mt-1">Click on any date to mark it as off day</p>
          </div>
        )}

        {/* Off Days Count */}
        {!loading && offDays.length > 0 && (
          <div className="mt-4 text-center text-sm text-gray-600">
            Total Off Days: <span className="font-semibold">{offDays.length}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ClinicOffDaysPage;
