import { Bar } from "react-chartjs-2";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  TooltipItem,
  Legend,
} from "chart.js";
import { IProcessedPrice } from "../types";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

interface ChartProps {
  prices: IProcessedPrice[] | undefined;
}

export const Chart: React.FC<ChartProps> = ({ prices }) => {
  if (!prices) {
    return <p>No data available</p>;
  }

  // Prepare data for the chart
  const labels = prices.map((price) => price.timestamp.getHours());
  const dataPoints = prices.map((price) => price.price);

  const data = {
    labels,
    datasets: [
      {
        label: "Electricity Price (snt/kWh)",
        data: dataPoints,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 2,
        barThinckness: 20,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "SPOT PRICES (snt/kWh)",
        font: {
          size: 16,
        },
      },
      tooltip: {
        callbacks: {
          title: (tooltipItems: TooltipItem<"bar">[]) => {
            const hour = tooltipItems[0].label;
            return `${hour}:00`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Hour",
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
      y: {
        title: {
          display: window.innerWidth > 640 ? true : false,
          text: "Price (snt/kWh)",
          font: {
            size: 14,
          },
        },
        ticks: {
          font: {
            size: 12,
          },
        },
      },
    },
  };

  return (
    <div className="container mx-auto h-[30rem]">
      <Bar data={data} options={options} />
    </div>
  );
};
