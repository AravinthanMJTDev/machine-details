"use client";
import React from "react";
import GaugeChart from "react-gauge-chart";

const Speedometer = ({ value = 0.75 }) => {
  return (
    <div className="w-64 h-64 flex flex-col justify-center items-center bg-black text-yellow-50">
      <label>OEE</label>
      <h4 className="font-extrabold tracking-tight text-balance">
        {value * 100}%
      </h4>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={20}
        percent={value}
        textColor="white"
      />
    </div>
  );
};

export default Speedometer;
