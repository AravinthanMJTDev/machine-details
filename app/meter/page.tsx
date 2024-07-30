"use client";
import React from "react";
import { CircularProgress, CardBody, Card } from "@nextui-org/react";
import GaugeChart from "react-gauge-chart";

const Speedometer = ({ value = 0.75 }) => {
  return (
    <div className="w-64 h-full flex flex-col justify-center items-center bg-black text-yellow-50 m-10">
      <label>OEE</label>
      <h4 className="font-extrabold text-5xl text-balance">{value * 100}%</h4>
      <GaugeChart
        id="gauge-chart"
        nrOfLevels={10}
        percent={value}
        textColor="white"
      />

      <div className="w-full flex flex-row justify-between items-center mx-2 p-2">
        <CircularProgress
          label="energy"
          classNames={{
            svg: "w-10 h-10 drop-shadow-md align-center",
            indicator: "stroke-green-500",
            track: "stroke-white/10",
            value: "text-md font-semibold text-white",
          }}
          value={46}
          strokeWidth={3}
          showValueLabel={true}
        />
        <CircularProgress
          label="energy"
          classNames={{
            svg: "w-10 h-10 drop-shadow-md items-center",
            indicator: "stroke-green-500",
            track: "stroke-white/10",
            value: "text-md font-semibold text-white",
          }}
          value={86}
          strokeWidth={3}
          showValueLabel={true}
        />

        <CircularProgress
          label="energy"
          classNames={{
            svg: "w-10 h-10 drop-shadow-md items-center",
            indicator: "stroke-green-500",
            track: "stroke-white/10",
            value: "text-md font-semibold text-white",
          }}
          value={70}
          strokeWidth={3}
          showValueLabel={true}
        />
      </div>
    </div>
  );
};

export default Speedometer;
