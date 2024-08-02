"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronsDown, ScanSearch, X } from "lucide-react";

interface MachineProps {
  imgSrc: string;
  hoverScale: number;
  scale: number;
  drop: {
    code: string;
    DateOfInstallation: string;
    NominalPower: string;
    NumberOfUnits: string;
  };
}

const Machine: React.FC<MachineProps> = ({
  imgSrc,
  drop,
  hoverScale,
  scale,
}): JSX.Element => {
  const [expanded, setExpanded] = useState(false);
  const [hover, setHover] = useState(false);

  console.log(hover);

  const toggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded((prev) => !prev);
  };

  return (
    <div
      className={`w-auto h-auto flex flex-col justify-center items-center  border border-8 p-2 ${
        expanded ? "scale-110 border-slate-600 z-50" : "border-gray-400"
      } space-y-2 transition-transform duration-300 ease-in-out`}
      onClick={() => setHover(!hover)}
      // onMouseLeave={() => setHover(false)}
      style={{
        transform: `scale(${hover ? hoverScale : scale})`,
      }}
    >
      <div className="w-full flex flex-row justify-between items-center border border-1 border-slate-400 p-2">
        <label className="font-bold">Cogeneration</label>
        <div className="flex items-center">
          <div className="h-full w-px bg-gray-700 mx-4"></div>
          {expanded ? (
            <X className="cursor-pointer" onClick={toggleExpanded} />
          ) : (
            <ScanSearch className="cursor-pointer" onClick={toggleExpanded} />
          )}
          <div className="h-full w-px bg-gray-700 mx-4"></div>
        </div>
      </div>
      <div className="relative w-full h-64">
        <Image
          src={imgSrc}
          alt="Machine"
          fill
          style={{ objectFit: "contain" }}
        />
      </div>
      <div
        className={`w-full ${
          expanded ? "h-auto" : "h-40 overflow-y-hidden "
        } flex flex-col justify-start space-y-2 px-2 bg-slate-400  transition-transform duration-500 ease-in-out`}
      >
        {Object.entries(drop).map(([key, value]) => (
          <React.Fragment key={key}>
            <div className="flex flex-row justify-between p-2 transition-transform duration-300 ease-in-out">
              <span className="font-bold">{key}:</span>
              <span>{value}</span>
            </div>
            <div className="w-full h-px bg-gray-600 my-1"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
    // </div>
  );
};

export default Machine;
