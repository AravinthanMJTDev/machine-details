"use client";
import React, { useState } from "react";
import Image from "next/image";
import { ChevronsDown, Command } from "lucide-react";

interface MachineProps {
  imgSrc: string;
  drop: {
    code: string;
    DateOfInstallation: string;
    NominalPower: string;
    NumberOfUnits: string;
  };
}

const Machine: React.FC<MachineProps> = ({ imgSrc, drop }): JSX.Element => {
  const [full, setFull] = useState(false);

  const handleSizing = () => {
    setFull((prev) => !prev);
  };

  return (
    <div className="flex flex-col justify-center items-center border border-5 p-2 border-gray-400 space-y-2">
      <div className="w-full h-10 flex flex-row justify-between items-center">
        <label className="font-bold">Cogeneration</label>
        <div className="flex items-center">
          <div className="h-full w-px bg-gray-700 mx-4"></div>
          <Command />
          <div className="h-full w-px bg-gray-700 mx-4"></div>
          <ChevronsDown
            className="hover:scale-150 cursor-pointer"
            onClick={handleSizing}
          />
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
          full ? "h-auto" : "h-40 overflow-y-hidden "
        } flex flex-col justify-start space-y-2 px-2 bg-slate-200`}
      >
        {Object.entries(drop).map(([key, value]) => (
          <React.Fragment key={key}>
            <div className="flex flex-row justify-between p-2">
              <span className="font-bold">{key}:</span>
              <span>{value}</span>
            </div>
            <div className="w-full h-px bg-gray-600 my-1"></div>
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Machine;
