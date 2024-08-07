"use client";
import Machine from "./page";
import React from "react";
import { useState } from "react";

const detailObj = [
  {
    image: "/machine-image.jpg",
    dropDetails: {
      code: "R4ND0M",
      DateOfInstallation: "03-jul-2023",
      NominalPower: "50",
      NumberOfUnits: "7",
      code1: "RaND0M",
      DateOfInstallation1: "03-jul-2023",
      NominalPower1: "50",
      NumberOfUnits1: "7",
    },
  },
  {
    image: "/machine-image.jpg",
    dropDetails: {
      code: "R4ND0M",
      DateOfInstallation: "03-jul-2023",
      NominalPower: "50",
      NumberOfUnits: "7",
      code1: "RaND0M",
      DateOfInstallation1: "03-jul-2023",
      NominalPower1: "50",
      NumberOfUnits1: "7",
      kola: "5",
    },
  },
  {
    image: "/machine-image.jpg",
    dropDetails: {
      code: "R4ND0M",
      DateOfInstallation: "03-jul-2023",
      NominalPower: "50",
      NumberOfUnits: "7",
      code1: "RaND0M",
      DateOfInstallation1: "03-jul-2023",
      NominalPower1: "80",
      NumberOfUnits1: "7",
    },
  },
  {
    image: "/machine-image.jpg",
    dropDetails: {
      code: "R4ND0M",
      DateOfInstallation: "03-jul-2023",
      NominalPower: "50",
      NumberOfUnits: "7",
      code1: "RaND0M",
      DateOfInstallation1: "03-jul-2023",
      NominalPower1: "80",
      NumberOfUnits1: "7",
    },
  },
  {
    image: "/machine-image.jpg",
    dropDetails: {
      code: "R4ND0M",
      DateOfInstallation: "03-jul-2023",
      NominalPower: "50",
      NumberOfUnits: "7",
      code1: "RaND0M",
      DateOfInstallation1: "03-jul-2023",
      NominalPower1: "50",
      NumberOfUnits1: "99",
    },
  },
  {
    image: "/machine-image.jpg",
    dropDetails: {
      code: "R4ND0M",
      DateOfInstallation: "03-jul-2023",
      NominalPower: "50",
      NumberOfUnits: "34",
      code1: "RaND0M",
      DateOfInstallation1: "03-jul-2023",
      NominalPower1: "50",
      NumberOfUnits1: "7",
    },
  },
];

const DetailsPopUp = ({ width, height }) => {
  const [machines, setMachines] = useState(
    detailObj.map((item, index) => ({
      ...item,
      isExpanded: false,
    }))
  );
  console.log(machines);
  const handleExpand = (index) => {
    console.log("cilcked", index);
    setMachines((prevMachines) =>
      prevMachines.map((machine, i) => ({
        ...machine,
        isExpanded: i === index ? !machine.isExpanded : false,
      }))
    );
  };

  return (
    <div className="flex h-auto flex-row flex-wrap items-start justify-center  gap-5 p-4 transition-all duration-1000 ease-in-out">
      {machines.map((item, index) => (
        <Machine
          key={index}
          imgSrc={item.image}
          drop={item.dropDetails}
          width={width}
          height={height}
          isExpanded={item.isExpanded}
          onExpand={() => handleExpand(index)}
          index={index}
        />
      ))}
    </div>
  );
};
export default DetailsPopUp;
