"use client";
import React, { useEffect, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import moment from "moment";

interface MachineProps {
  Machine1: number[];
  Machine2: number[];
  Machine3: number[];
  Date: string[];
}

const GraphFunction: React.FC<MachineProps> = React.memo(
  ({ Machine1, Machine2, Machine3, Date }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<HighchartsReact.RefObject>(null);

    useEffect(() => {
      const chartContainer = chartContainerRef.current;
      if (!chartContainer) return;

      const preventDefault = (e: Event) => {
        if (e instanceof WheelEvent || e instanceof TouchEvent) {
          if (e.cancelable) e.preventDefault();
        }
      };

      chartContainer.addEventListener("wheel", preventDefault, {
        passive: false,
      });
      chartContainer.addEventListener("touchmove", preventDefault, {
        passive: false,
      });

      return () => {
        if (chartContainer) {
          chartContainer.removeEventListener("wheel", preventDefault);
          chartContainer.removeEventListener("touchmove", preventDefault);
        }
      };
    }, []);

    // Format dates for xAxis categories
    const formattedDates = Date.map((dateString) =>
      moment(dateString, "YYYY-MM-DD").format("MMM DD")
    );

    // Highcharts configuration
    const options = {
      chart: {
        type: "column",
        zoomType: "x",
        events: {
          load: function () {
            const chart = this;

            Highcharts.addEvent(
              chart.container,
              "wheel",
              function (event: WheelEvent) {
                event.preventDefault();

                // Debugging: log entire event object
                console.log("Wheel Event:", event);

                const mouseX = event.clientX - chart.plotLeft;
                console.log("Mouse X:", mouseX, chart.plotLeft);

                if (isNaN(mouseX) || mouseX < 0 || mouseX > chart.plotWidth) {
                  console.error("Invalid mouseX value", { mouseX });
                  return;
                }

                const xValue = chart.xAxis[0].toValue(mouseX);

                if (isNaN(xValue)) {
                  console.error("xValue is NaN", { xValue });
                  return;
                }

                const { min, max, dataMin, dataMax } =
                  chart.xAxis[0].getExtremes();
                console.log("chart ", chart.xAxis[0].getExtremes());
                const zoomFactor = event.deltaY > 0 ? 1.1 : 1 / 1.1;

                // Calculate new extremes
                let newMin = xValue - (xValue - min) * zoomFactor;
                let newMax = xValue + (max - xValue) * zoomFactor;

                // Debugging outputs
                console.log(
                  "min:",
                  min,
                  "max:",
                  max,
                  "dataMin:",
                  dataMin,
                  "dataMax:",
                  dataMax
                );
                console.log(
                  "xValue:",
                  xValue,
                  "newMin:",
                  newMin,
                  "newMax:",
                  newMax
                );

                if (isNaN(newMin) || isNaN(newMax)) {
                  console.error("newMin or newMax is NaN", { newMin, newMax });
                  return;
                }
                if (newMin < dataMin) newMin = dataMin;
                if (newMax > dataMax) newMax = dataMax;

                chart.xAxis[0].setExtremes(newMin, newMax);
              }
            );

            let lastTouchDistance = 0;
            Highcharts.addEvent(
              chart.container,
              "touchstart",
              function (event: TouchEvent) {
                if (event.touches.length === 2) {
                  event.preventDefault();
                  const touch1 = event.touches[0];
                  const touch2 = event.touches[1];
                  lastTouchDistance = Math.sqrt(
                    Math.pow(touch1.pageX - touch2.pageX, 2) +
                      Math.pow(touch1.pageY - touch2.pageY, 2)
                  );
                }
              }
            );

            Highcharts.addEvent(
              chart.container,
              "touchmove",
              function (event: TouchEvent) {
                if (event.touches.length === 2) {
                  event.preventDefault();
                  const touch1 = event.touches[0];
                  const touch2 = event.touches[1];
                  const currentTouchDistance = Math.sqrt(
                    Math.pow(touch1.pageX - touch2.pageX, 2) +
                      Math.pow(touch1.pageY - touch2.pageY, 2)
                  );
                  const delta = currentTouchDistance - lastTouchDistance;
                  const { min, max, dataMin, dataMax } =
                    chart.xAxis[0].getExtremes();
                  const zoomFactor = delta > 0 ? 1.1 : 1 / 1.1;
                  const newRange = (max - min) * zoomFactor;

                  // Calculate new extremes
                  console.log("touch ", touch1, touch2, lastTouchDistance);
                  const touchMidX =
                    (touch1.pageX + touch2.pageX) / 2 - chart.plotLeft;
                  const xValue = chart.xAxis[0].toValue(touchMidX);
                  let newMin = xValue - (xValue - min) * zoomFactor;
                  let newMax = xValue + (max - xValue) * zoomFactor;

                  // Debugging outputs
                  console.log(
                    "min:",
                    min,
                    "max:",
                    max,
                    "dataMin:",
                    dataMin,
                    "dataMax:",
                    dataMax
                  );
                  console.log(
                    "xValue:",
                    xValue,
                    "newMin:",
                    newMin,
                    "newMax:",
                    newMax
                  );

                  if (isNaN(newMin) || isNaN(newMax)) {
                    console.error("newMin or newMax is NaN", {
                      newMin,
                      newMax,
                    });
                    return;
                  }
                  if (newMin < dataMin) newMin = dataMin;
                  if (newMax > dataMax) newMax = dataMax;

                  chart.xAxis[0].setExtremes(newMin, newMax);

                  lastTouchDistance = currentTouchDistance;
                }
              }
            );
          },
        },
      },
      title: {
        text: "Machine Data Over Time",
      },
      xAxis: {
        categories: formattedDates,
        scrollbar: {
          enabled: true,
        },
      },
      yAxis: {
        title: {
          text: "Values",
        },
        scrollbar: {
          enabled: true,
        },
      },
      credits: {
        enabled: false,
      },
      plotOptions: {
        column: {
          borderRadius: 5,
          shadow: true,
          dataLabels: {
            enabled: false,
          },
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
      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: "horizontal",
                align: "center",
                verticalAlign: "bottom",
              },
            },
          },
        ],
      },
    };

    return (
      <div
        ref={chartContainerRef}
        style={{ width: "100%", height: "100%", touchAction: "none" }}
      >
        <HighchartsReact
          highcharts={Highcharts}
          options={options}
          ref={chartRef}
        />
      </div>
    );
  }
);

GraphFunction.displayName = "GraphFunction";
export default GraphFunction;
