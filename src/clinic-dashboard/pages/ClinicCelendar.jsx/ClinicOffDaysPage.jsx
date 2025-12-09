import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useCalendar } from "../../../components/calendar/useCalendar";
// import CalendarHeader from "../../../components/calendar/CalendarHeader";
// import DayCell from "../../../components/calendar/DayCell";
// import OffDayModal from "../../../components/clinic/OffDayModal";
import {
  createClinicOffDay,
  deleteClinicOffDay,
} from "../../../global_redux/features/clinicOffDays/clinicOffDaysThunk";
import { useCalendar } from "./components/useCalendar";
import CalendarHeader from "./components/CalendarHeader";
import DayCell from "./components/DayCell";
import OffDayModal from "./components/OffDayModel";

const ClinicOffDaysPage = () => {
  const dispatch = useDispatch();
  const { offDays, loading } = useSelector((state) => state.clinicOffDays);

  const { monthLabel, weeks, goPrevMonth, goNextMonth } = useCalendar();

  const [selectedDate, setSelectedDate] = useState(null);
  const [reason, setReason] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedOffDay, setSelectedOffDay] = useState(null); // <-- yaha id store hoga

  const today = new Date();

  const isSameDate = (d1, d2) =>
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate();

  const findOffDayByDate = (dateObj) => {
    const dateStr = dateObj.toISOString().slice(0, 10);
    return offDays.find((d) => d.date?.startsWith(dateStr)) || null;
  };

  const isOffDay = (dateObj) => !!findOffDayByDate(dateObj);

  const getOffDayReason = (dateObj) => {
    const match = findOffDayByDate(dateObj);
    return match?.reason || "";
  };

  const handleDayClick = (dateObj) => {
    if (!dateObj) return;

    const offDayRecord = findOffDayByDate(dateObj);

    setSelectedDate(dateObj);
    setSelectedOffDay(offDayRecord);
    setReason(offDayRecord?.reason || "");
    setShowModal(true);
  };

  const handleSaveOffDay = async () => {
    if (!selectedDate) return;
    const dateStr = selectedDate.toISOString().slice(0, 10);

    const res = await dispatch(
      createClinicOffDay({
        date: dateStr,
        reason: reason || "Clinic closed",
      })
    );

    if (res.meta.requestStatus === "fulfilled") {
      setShowModal(false);
      setReason("");
      setSelectedOffDay(null);
    }
  };

  const handleDeleteOffDay = async () => {
    if (!selectedOffDay?._id) return;

    const confirmDelete = window.confirm(
      "Are you sure you want to remove this off day?"
    );
    if (!confirmDelete) return;

    const res = await dispatch(deleteClinicOffDay(selectedOffDay._id));

    if (res.meta.requestStatus === "fulfilled") {
      setShowModal(false);
      setReason("");
      setSelectedOffDay(null);
    }
  };

  return (
    <div className="p-6">
      <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow border p-6">
        <CalendarHeader
          monthLabel={monthLabel}
          onPrev={goPrevMonth}
          onNext={goNextMonth}
        />

        {/* Weekdays */}
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
      </div>

      {/* Modal with delete support */}
      <OffDayModal
        open={showModal}
        loading={loading}
        selectedDate={selectedDate}
        reason={reason}
        onReasonChange={setReason}
        onClose={() => {
          setShowModal(false);
          setReason("");
          setSelectedOffDay(null);
        }}
        onSave={handleSaveOffDay}
        canDelete={!!selectedOffDay}
        onDelete={handleDeleteOffDay}
      />
    </div>
  );
};

export default ClinicOffDaysPage;
