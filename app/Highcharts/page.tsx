"use client";
import React from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

interface MachineProps {
  Machine1: number[];
  Machine2: number[];
  Machine3: number[];
  Date: string[];
}

const GraphFunction = ({
  Machine1,
  Machine2,
  Machine3,
  Date,
}: MachineProps) => {
  const formattedDates = Date.map((dateString) =>
    moment(dateString, "YYYY-MM-DD").format("MMM DD")
  );

  // Highcharts configuration options
  const options = {
    chart: {
      type: "column",
      zoomType: "xy", // Allows zooming in both directions
      panning: true, // Enable panning
      panKey: "shift", // Use shift key to pan
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: formattedDates,
      minPadding: 0,
      maxPadding: 0,
      startOnTick: true,
      endOnTick: true,
      tickAmount: 10,
      scrollbar: {
        enabled: true, // Enable x-axis scrollbar
      },
    },
    yAxis: {
      title: {
        text: "Values",
      },
      scrollbar: {
        enabled: true, // Enable y-axis scrollbar
      },
    },
    credits: {
      enabled: false, // Disable credits
    },
    plotOptions: {
      column: {
        borderRadius: 5,
      },
    },
    series: [
      {
        name: "Machine-1",
        data: Machine1,
        color: "red",
      },
      {
        name: "Machine-2",
        data: Machine2,
        color: "orange",
      },
      {
        name: "Machine-3",
        data: Machine3,
        color: "purple",
      },
    ],
    navigation: {
      buttonOptions: {
        enabled: true,
      },
    },
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default GraphFunction;
