"use client";
import React from "react";
import Highcharts, { color } from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

interface MachineProps {
  Machine1: object;
  Machine2: object;
  Machine3: object;
  Date: string[];
}

const Graph = ({ Machine1, Machine2, Machine3, Date }: MachineProps) => {
  const formattedDates = Date.map((dateString) =>
    moment(dateString, "YYYY-MM-DD").format("MMM DD")
  );
  console.log(Date, formattedDates);

  const options = {
    chart: {
      type: "column",
    },
    title: {
      text: "",
    },
    xAxis: {
      categories: formattedDates,
    },
    credits: {
      enabled: false,
    },
    plotOptions: {
      column: {
        borderRadius: "25%",
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
  };

  return (
    <div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};

export default Graph;
