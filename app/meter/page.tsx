"use client";
import React from "react";
import { CircularProgress, CardBody, Card } from "@nextui-org/react";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";
import GaugeChart from "react-gauge-chart";

interface speed {
  value?: number;
  width: number;
  height: number;
}

const Speedometer: React.FC<speed> = ({ value = 0.75, width, height }) => {
  const scale = Math.min(width / 1024, height / 1024);

  return (
    <div
      className={`w-50 h-50 flex flex-col justify-center items-center bg-black text-yellow-50 m-10`}
      style={{ transform: `scale(${scale > 1 ? 1 : scale})` }}
    >
      <label>OEE</label>
      <h4 className="font-extrabold text-5xl text-balance">{value * 100}%</h4>
      <div className="flex flex-row justify-center items-center">
        <GaugeChart
          id="gauge-chart"
          nrOfLevels={10}
          percent={value}
          textColor="white"
          hideText={true}
        />
      </div>

      <div className="w-full flex flex-row justify-between items-center mx-2 p-2">
        <CircularProgress
          label="energy"
          classNames={{
            svg: "w-14 h-14 drop-shadow-md align-center",
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
            svg: "w-14 h-14 drop-shadow-md items-center",
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
            svg: "w-14 h-14 drop-shadow-md items-center",
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
