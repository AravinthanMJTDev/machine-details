import Image from "next/image";
import React from "react";
import Machine from "./MachineTable/page";
import Details from "./MachineTable/details";
import Speedometer from "./meter/page";
// import GraphFunction from "./Highcharts/page";
import Graph from "./Highcharts/Graph";
import Link from "next/link";

export default function Home() {
  return (
    <div className="mx-auto w-auto min-h-auto flex flex-col justify-center items-center space-y-2">
      <div className="mx-auto w-full h-auto mt-5">
        <Details width={1000} height={1000} />
      </div>
      <Speedometer width={1000} height={1000} value={0.7} />
      <div className="w-full h-auto border m-5">
        <Graph width={800} height={800} />
      </div>
    </div>
  );
}
