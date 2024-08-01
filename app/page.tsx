import Image from "next/image";
import React from "react";
import Machine from "./MachineTable/page";
import Details from "./MachineTable/details";
import Speedometer from "./meter/page";
import Graph from "./Highcharts/page";
import Data from "./Highcharts/data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto w-full min-h-auto flex flex-col justify-center items-center space-y-2">
      <div className="mx-auto w-2/4 h-50 m-5">
        <Details width={1000} height={1000} />
      </div>
      <Speedometer width={1000} height={1000} value={0.7} />
      <div className="w-full h-auto border m-5">
        <Data width={800} height={800} />
      </div>
    </div>
  );
}
