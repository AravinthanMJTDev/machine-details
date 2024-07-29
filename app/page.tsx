import Image from "next/image";
import React from "react";
import Machine from "./MachineTable/page";
import Details from "./MachineTable/details";
import Speedometer from "./meter/page";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto w-full flex flex-col justify-center items-center space-y-2">
      <div className="mx-auto w-2/4  bg-gray-100 p-2 border border-gray-400 border-5">
        <Details />
      </div>
      <Speedometer value={0.5} />
    </div>
  );
}
