"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import Graph from "./page";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ChevronsDown, Command, Menu } from "lucide-react";

const Data = () => {
  const initialStartDate = new Date("2024-01-01");
  const initialEndDate = new Date("2024-07-30");

  const [startDate, setStartDate] = useState<Date | null>(
    new Date("2024-01-01")
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date("2024-07-30"));

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

  return (
    <div className="w-full flex flex-col bg-white border border-8 border-slate-300 p-4 m-4">
      <div className="flex flex-row justify-between items-center border border-1 border-slate-300 px-2">
        <label className="font-bold">operational chart</label>
        <div className="flex flex-row justify-between space-x-2">
          <div className=" flex flex-row justify-center">
            <div className="h-full w-px mx-4 bg-slate-400"></div>
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => setStartDate(date)}
              dateFormat="MMMM d, yyyy"
            />
            <div className="h-full w-px mx-4 bg-slate-400"></div>
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => setEndDate(date)}
              dateFormat="MMMM d, yyyy"
            />
          </div>

          <div className="flex flex-row justify-center items-center">
            <div className="h-full w-px mx-4 bg-slate-400"></div>
            <select>
              <option value="W">W</option>
            </select>
            <div className="h-full w-px mx-4 bg-slate-400"></div>
            <Command />
          </div>
        </div>
      </div>
      <div className="m-4 flex flex-row justify-center">
        <div className="ml-auto">
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) => setStartDate(date)}
            dateFormat="MMMM d, yyyy"
            className="border border-blue-500 rounded-lg p-2"
          />
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) => setEndDate(date)}
            dateFormat="MMMM d, yyyy"
            className="border border-blue-500 rounded-lg p-2 ml-4"
          />
        </div>

        <div className="ml-auto flex flex-row items-center">
          <button
            onClick={handleReset}
            className="p-2 border rounded-lg bg-slate-500 text-white ml-4"
          >
            Reset Button
          </button>
          <div className="h-full w-px mx-4 bg-slate-400"></div>
          <Menu />
        </div>
      </div>
      <div className="border border-2 border-blue-300">
        <Graph
          Machine1={machine1Data}
          Machine2={machine2Data}
          Machine3={machine3Data}
          Date={dates}
        />
      </div>
    </div>
  );
};

export default Data;
