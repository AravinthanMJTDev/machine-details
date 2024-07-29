declare module "react-gauge-chart" {
  import { FC } from "react";

  interface GaugeChartProps {
    id?: string;
    nrOfLevels?: number;
    percent?: number;
    textColor?: string;
    needleColor?: string;
    // Add other props as needed
  }

  const GaugeChart: FC<GaugeChartProps>;

  export default GaugeChart;
}
