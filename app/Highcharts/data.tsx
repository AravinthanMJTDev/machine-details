"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Graph from "./page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Command, Menu, RefreshCcw, ScanSearch } from "lucide-react";

const Data = ({ width, height }) => {
  const initialStartDate = new Date("2024-01-01");
  const initialEndDate = new Date("2024-07-30");

  const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate);

  const [machine1Data, setMachine1Data] = useState<number[]>([]);
  const [machine2Data, setMachine2Data] = useState<number[]>([]);
  const [machine3Data, setMachine3Data] = useState<number[]>([]);
  const [dates, setDates] = useState<string[]>([]);

  useEffect(() => {
    if (startDate && endDate) {
      let tempMachine1Data: number[] = [];
      let tempMachine2Data: number[] = [];
      let tempMachine3Data: number[] = [];
      let tempDates: string[] = [];

      let currentDate = moment(startDate);

      while (currentDate.isBefore(endDate)) {
        const randomM1 = Math.floor(Math.random() * 1000000);
        const randomM2 = Math.floor(Math.random() * 1000000);

        tempMachine1Data.push(randomM1);
        tempMachine2Data.push(randomM2);
        tempMachine3Data.push(Math.abs(randomM1 - randomM2));

        tempDates.push(currentDate.format("YYYY-MM-DD"));

        currentDate.add(1, "days");
      }

      setMachine1Data(tempMachine1Data);
      setMachine2Data(tempMachine2Data);
      setMachine3Data(tempMachine3Data);
      setDates(tempDates);
    }
  }, [startDate, endDate]);

  const handleReset = () => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  };

  const scale = Math.min(width / 1024, height / 1024); // Assuming 500x500 is the default size

  return (
    <div className="w-full h-full overflow-hidden">
      <div className="w-100 h-100 mx-auto ">
        <div
          className="w-full h-full transform  border border-4 border-slate-500 p-3 mx-auto"
          style={{ transform: `scale(${scale > 1 ? 1 : scale})` }}
        >
          <div className="w-full h-full flex flex-col lg:flex-row lg:justify-between lg:items-center border border-slate-300 px-2">
            <label className="font-bold text-sm lg:text-base">
              Operational Chart
            </label>
            <div className="flex flex-col lg:flex-row lg:space-x-2 space-y-2 lg:space-y-0 lg:ml-auto">
              <div className="flex flex-col sm:flex-row sm:space-x-4 lg:ml-auto">
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date | null) => setStartDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className="border border-blue-500 rounded-lg p-2 text-xs lg:text-sm"
                />
                <div className="h-full w-px bg-slate-400 hidden sm:block lg:block"></div>
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date | null) => setEndDate(date)}
                  dateFormat="MMMM d, yyyy"
                  className="border border-blue-500 rounded-lg p-2 text-xs lg:text-sm"
                />
              </div>
              <div className="flex flex-row items-center lg:ml-auto space-x-2">
                <div className="h-full w-px bg-slate-400 hidden sm:block lg:block"></div>
                <select className="text-xs lg:text-sm bg-transparent">
                  <option value="W">W</option>
                </select>
                <div className="h-full w-px bg-slate-400 hidden sm:block lg:block"></div>
                <ScanSearch className="text-xs lg:text-sm" />
                <div className="h-full w-px bg-slate-400 hidden sm:block lg:block"></div>
                <RefreshCcw
                  className="text-xs lg:text-sm hover:cursor-pointer"
                  onClick={handleReset}
                />
              </div>
            </div>
          </div>
          {/* <div className="flex flex-row flex-wrap justify-end m-4">
            <button
              onClick={handleReset}
              className="p-2 border rounded-lg bg-slate-500 text-white text-xs lg:text-sm"
            >
              Reset Button
            </button>
            <div className="h-full w-px mx-4 bg-slate-400"></div>
            <Menu className="text-xs lg:text-sm my-auto" />
          </div> */}
          <div className="flex flex-row flex-wrap justify-center m-4">
            <span>
              <label className="font-semibold">
                {startDate && endDate
                  ? startDate.toDateString() + " - " + endDate.toDateString()
                  : " "}
              </label>
            </span>
          </div>
          <div className="border border-blue-300">
            <Graph
              Machine1={machine1Data}
              Machine2={machine2Data}
              Machine3={machine3Data}
              Date={dates}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data;
