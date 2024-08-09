"use client";
import React, { useEffect, useMemo, useRef } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface MachineProps {
  Power: number[];
  PF: number[];
  Demand: number[];
  Date: string[];
}

const GraphFunction: React.FC<MachineProps> = React.memo(
  ({ Power, PF, Demand, Date }) => {
    const chartContainerRef = useRef<HTMLDivElement>(null);
    const chartRef = useRef<HighchartsReact.RefObject>(null);
   console.log("demand ",Demand)
    // Create memoized options
    const options: Highcharts.Options = useMemo(
      () => ({
        chart: {
          type: "spline",
          zoomType: "x",
          events: {
            load: function () {
              const chart = this;

              // Debounce zoom events
              let debounceTimer: NodeJS.Timeout;
              const debounce = (callback: Function, delay: number) => {
                if (debounceTimer) clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => callback(), delay);
              };

              Highcharts.addEvent(
                chart.container,
                "wheel",
                function (event: WheelEvent) {
                  event.preventDefault();
                  debounce(() => {
                    const mouseX = event.clientX - chart.plotLeft;
                    const xValue = chart.xAxis[0].toValue(mouseX);

                    const { min, max, dataMin, dataMax } =
                      chart.xAxis[0].getExtremes();
                    const zoomFactor = event.deltaY > 0 ? 1.1 : 1 / 1.1;

                    let newMin = xValue - (xValue - min) * zoomFactor;
                    let newMax = xValue + (max - xValue) * zoomFactor;

                    if (newMin < dataMin) newMin = dataMin;
                    if (newMax > dataMax) newMax = dataMax;

                    chart.xAxis[0].setExtremes(newMin, newMax);
                  }, 100);
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
                    const touchMidX =
                      (touch1.pageX + touch2.pageX) / 2 - chart.plotLeft;
                    const xValue = chart.xAxis[0].toValue(touchMidX);

                    let newMin = xValue - (xValue - min) * zoomFactor;
                    let newMax = xValue + (max - xValue) * zoomFactor;

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
          text: "",
          align: "left",
        },
        xAxis: {
          categories: Date,
          title: {
            text: "Date",
          },
          scrollbar: {
            enabled: true,
          },
        },
        yAxis: [
          {
            title: {
              text: "Power / Demand",
              style: {
                color: '#0071A7',
                fontSize: '12px',
              },
            },
            labels: {
              format: '{value:.0f}', // Format to remove decimals
              style: {
                color: '#0071A7',
                fontSize: '10px',
              },
            },
            tickInterval: 200, // Adjust the tick interval to reduce clutter
            gridLineWidth: 0, // Remove grid lines for a cleaner look
          },
          {
            title: {
              text: "PF",
              style: {
                color: '#FF0000',
                fontSize: '12px',
              },
            },
            labels: {
              format: '{value:.2f}', // Format to 2 decimal places
              style: {
                color: '#FF0000',
                fontSize: '10px',
              },
            },
            tickInterval: 0.2, // Adjust the tick interval
            opposite: true,
            gridLineWidth: 0,
          },
        ],
        
        series: [
          {
            type: "spline",
            name: "Power",
            data: Power,
            yAxis: 0, // Assign to the first Y-axis
          },
          {
            type: "spline",
            name: "PF",
            data: PF,
            yAxis: 1, // Assign to the second Y-axis
          },
          {
            type: "spline",
            name: "Demand",
            data: Demand,
            yAxis: 0, // Assign to the first Y-axis
          },
         
        ],
        

        plotOptions: {
          series: {
            events: {
              legendItemClick: function () {
                var visibility = this.visible ? "visible" : "hidden";
                return true; // Default behavior
              },
            },

            animation: {
              duration: 1000,
            },
            marker: {
              enabled: false,
            },
            lineWidth: 2,
          },
        },
        legend: {
          align: 'center',
          verticalAlign: 'bottom',
          layout: 'horizontal',
          itemStyle: {
            fontSize: '10px'
          }
        },
        responsive: {
          rules: [
            {
              condition: {
                maxWidth: 500,
              },
              chartOptions: {
                yAxis: [
                  {
                    labels: {
                      align: 'right',
                      x: -5,
                      style: {
                        fontSize: '8px',
                      },
                    },
                    title: {
                      text: 'Power / Demand',
                      style: {
                        fontSize: '8px',
                      },
                    },
                    tickInterval: 400,
                  },
                  {
                    labels: {
                      align: 'left',
                      x: 5,
                      style: {
                        fontSize: '8px',
                      },
                    },
                    title: {
                      text: 'PF',
                      style: {
                        fontSize: '8px',
                      },
                    },
                    tickInterval: 0.5,
                    opposite: true,
                  },
                ],
                chart: {
                  spacingLeft: 10,
                  spacingRight: 10,
                },
              },
            },
          ],
        },
        
      }),
      [Date, Power, PF, Demand]
    );

    // Function to update the chart with new data
    const updateChart = () => {
      const chart = chartRef.current?.chart;
      if (chart) {
        const dataMin = 0;
        const dataMax = Date.length - 1;
        chart.update({
          xAxis: {
            categories: Date,
            min: dataMin,
            max: dataMax,
          },
          series: [
            {
              type: "spline",
              data: Power,
            },
            {
              type: "spline",
              data: PF,
            },
            {
              type: "spline",
              data: Demand,
            },
          ],
        });

        chart.xAxis[0].setExtremes(dataMin, dataMax);
      }
    };

    useEffect(() => {
      updateChart();
    }, [Date, Power, PF, Demand]);

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
