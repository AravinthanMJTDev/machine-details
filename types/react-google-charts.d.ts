declare module "react-google-charts" {
  import { Component } from "react";

  interface ChartProps {
    chartType: string;
    width?: string;
    height?: string;
    data: any[];
    options?: any;
  }

  export class Chart extends Component<ChartProps> {}
}
