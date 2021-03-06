import { Icon } from "@blueprintjs/core";
import React from "react";
import { Line } from "react-chartjs-2";
import { IProps, PropsChart } from "../types/aqi.types";

const AQIChart = ({
  data,
  currentChartCity,
  closeChart,
}: {
  data: IProps[];
  currentChartCity: string;
  closeChart: (arg: boolean) => void;
}) => {
  const [chartData, setChartData] = React.useState<PropsChart>({
    labels: [],
    datasets: [
      {
        type: "line",
        label: "",
        backgroundColor: "rgba(0, 0, 0, 0)",
        borderColor: "rgb(75, 192, 192)",
        pointBorderColor: "rgba(0, 0, 0, 0.5)",
        borderWidth: "1",
        lineTension: 0.45,
        data: [],
      },
    ],
  });

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    tooltips: {
      enabled: true,
    },
    scales: {
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "AQI",
          },
          ticks: {
            autoSkip: true,
            stepSize: 10,
          },
        },
      ],
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: "Time",
          },
          ticks: {
            autoSkip: true,
          },
        },
      ],
    },
  };

  React.useEffect(() => {
    const chartInfo = data.filter(
      (item: IProps) => item.city === currentChartCity
    )[0];
    const oldData = chartData.datasets[0];
    const newData = { ...oldData };

    newData.data = [...chartInfo.aqi];
    newData.label = chartInfo.city;
    const newChartData = {
      ...chartData,
      datasets: [newData],
      labels: [...chartInfo.updatedAt.map((i: string, index) => i)],
    };
    setChartData({ ...newChartData });
  }, [data, currentChartCity]);

  console.log(new Date().toLocaleTimeString());

  return (
    <div className="chart-wrapper">
      <div className="chart-header">
        <span style={{ display: "inline-flex" }}>
          {" "}
          City: {chartData.datasets[0].label}{" "}
        </span>
        <div>
          <Icon icon="delete" size={20} onClick={() => closeChart(false)} />
        </div>
      </div>
      <div className="chart">
        <Line data={chartData} options={lineChartOptions} />
      </div>
    </div>
  );
};

export default AQIChart;
