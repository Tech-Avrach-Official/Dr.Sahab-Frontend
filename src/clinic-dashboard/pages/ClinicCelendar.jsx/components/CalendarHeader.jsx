// components/calendar/CalendarHeader.jsx
import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarHeader = ({ monthLabel, onPrev, onNext }) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={onPrev}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <h2 className="text-xl font-semibold text-gray-900">{monthLabel}</h2>
      <button
        onClick={onNext}
        className="p-2 rounded-full hover:bg-gray-100"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CalendarHeader;
