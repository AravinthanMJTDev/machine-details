"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import moment from "moment";
import GraphFunction from "./Graph";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { RefreshCcw, Menu } from "lucide-react";

const LineGraph = ({ width, height }) => {
  const initialStartDate = new Date("2024-01-01");
  const initialEndDate = new Date("2024-07-30");

  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  const [power, setPower] = useState<number[]>([]);
  const [PF, setPF] = useState<number[]>([]);
  const [Demand, setDemand] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    if (startDate && endDate) {
      const temppower: number[] = [];
      const tempPF: number[] = [];
      const tempDemand: number[] = [];
      const tempDates: string[] = [];

      let currentDate = moment(startDate);

      while (currentDate.isBefore(endDate) || currentDate.isSame(endDate)) {
        const random1 = Math.floor(Math.random() * 1000);
        const random2 = Math.random() * 1;
        const random3 = Math.floor(Math.random() * 100);

        temppower.push(random1);
        tempPF.push(random2);
        tempDemand.push(random3);

        tempDates.push(moment(currentDate).format("MMM DD"));

        currentDate.add(1, "days");
      }

      setPower(temppower);
      setPF(tempPF);
      setDemand(tempDemand);
      setDates(tempDates);
    }
  }, [startDate, endDate]);

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  };

  const [expanded, setExpanded] = useState(false);
  const [onClick, setOnClick] = useState(false);

  const onClickScale =
    Math.floor(1024 / width) > 1 ? 1 : Math.floor(1024 / width);

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setOnClick((prev) => !prev);
  };

  const scale = Math.min(width / 1024, height / 1024);

  const containerRef = useRef(null);

  const handleClickOutside = useCallback((event: React.MouseEvent) => {
    if (containerRef.current && !containerRef.current.contains(event.target)) {
      setOnClick(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div
      ref={containerRef}
      className={`w-full h-full overflow-hidden transition-transform duration-500 ease-in-out`}
      onClick={() => setOnClick((prev) => !prev)}
      style={{
        transform: `scale(${onClick ? onClickScale : scale})`,
      }}
    >
      <div className="w-full h-auto mx-auto">
        <div className="w-full h-auto transform border border-4 border-slate-500 p-3 mx-auto sm:flex sm:flex-col sm:justify-center sm:items-center sm:space-y-2">
          <div
            className="w-full h-auto lg:flex lg:flex-row lg:justify-between lg:items-center sm:flex sm:flex-col sm:justify-center sm:items-center sm:space-y-2 md:flex md:flex-row md:justify-between md:items-center md:space-y-0 p-1 border border-1 border-slate-500"
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
            }}
          >
            <div className="w-auto h-auto flex flex-row justify-center items-center">
              <label className="font-bold text-sm lg:text-base">
                Operational Chart
              </label>
            </div>
            <div className="w-auto h-full lg:flex lg:flex-row lg:space-x-2 lg:space-y-0 md:flex md:flex-row md:justify-start md:space-x-3 md:space-y-0 sm:space-y-2 sm:flex sm:flex-col sm:justify-center">
              <div className="flex flex-col sm:flex-col sm:space-y-2 md:flex md:flex-row md:justify-center md:items-center md:space-x-2 md:space-y-0 lg:space-x-2 lg:space-y-0">
                <div className="flex flex-row justify-center items-center m-0">
                  <DatePicker
                    selected={startDate}
                    onChange={(date: Date | null) => setStartDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className="border border-gray-400 rounded-md p-2 text-sm"
                  />
                </div>
                <div className="flex flex-row justify-center items-center m-0">
                  <DatePicker
                    selected={endDate}
                    onChange={(date: Date | null) => setEndDate(date)}
                    dateFormat="MMMM d, yyyy"
                    className="border border-gray-400 rounded-md p-2 text-sm"
                  />
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-2 py-1 rounded-md flex items-center justify-center sm:mt-2 md:mt-0"
                onClick={handleReset}
              >
                <RefreshCcw size={16} className="mr-1" />
                Reset
              </button>
            </div>
            <div className="flex flex-row justify-center items-center">
              <Menu
                size={24}
                onClick={toggleExpanded}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div
            className="w-full h-auto mt-2"
            onClick={(e) => e.stopPropagation()}
          >
            <GraphFunction Power={power} PF={PF} Demand={Demand} Date={dates} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LineGraph;
