"use client"

import type React from "react"
import { useState } from "react"

interface CalendarProps {
  selected: Date | undefined
  onSelect: (date: Date) => void
}

const Calendar: React.FC<CalendarProps> = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const daysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  }

  const firstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay()
  }

  const renderDays = () => {
    const days = []
    const totalDays = daysInMonth(currentMonth)
    const firstDay = firstDayOfMonth(currentMonth)

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="w-10 h-10"></div>)
    }

    for (let i = 1; i <= totalDays; i++) {
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      const isSelected = selected && date.toDateString() === selected.toDateString()
      days.push(
        <button
          type="button"
          key={i}
          onClick={() => onSelect(date)}
          className={`w-10 h-10 flex items-center justify-center rounded-full text-sm font-medium transition-colors 
          ${isSelected ? "bg-indigo-600 text-white" : "hover:bg-gray-200 text-gray-800"}`}
        >
          {i}
        </button>
      )
    }

    return days
  }

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))
  }

  return (
    <div className="w-full max-w-sm mx-auto bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button type="button" onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100">&lt;</button>
        <span className="text-lg font-semibold text-gray-900">
          {currentMonth.toLocaleString("en-US", { month: "long", year: "numeric" })}
        </span>
        <button type="button" onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100">&gt;</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center text-gray-600 font-medium">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="text-xs uppercase tracking-wide">
            {day}
          </div>
        ))}
        {renderDays()}
      </div>
    </div>
  )
}

export default Calendar
