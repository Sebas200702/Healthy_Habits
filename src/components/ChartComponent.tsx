import React, { useEffect, useRef, useState } from "react";
import type { FC } from "react";
import Chart from "chart.js/auto";
import type { ChartData, ChartDataset, TooltipItem } from "chart.js/auto";

interface ChartComponentProps {
  data: ChartData<"doughnut">; // Specify the type for the doughnut chart
  id: string;
}

const ChartComponent: FC<ChartComponentProps> = ({ data, id }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  const Colors: string[] = ["#3f72af", "#66b3ff", "#c7e9fb", "#a8d0e6"];

  useEffect(() => {
    const canvas = document.getElementById(id) as HTMLCanvasElement | null;
    if (canvas) {
      const chart = new Chart(canvas, {
        type: "doughnut",
        data: {
          ...data,
          datasets: [
            {
              ...data.datasets[0],
              backgroundColor: Colors,
              borderColor: "transparent",
              borderWidth: 0,
            } as ChartDataset<"doughnut">, // Specify the type of the dataset
          ],
        },
        options: {
          responsive: true,

          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem: TooltipItem<"doughnut">) {
                  const total: number = data.datasets[0].data.reduce(
                    (a: number, b: number | null) => a + ((b as number) || 0),
                    0
                  );
                  const currentValue = tooltipItem.raw;

                  if (typeof currentValue === "number" && total > 0) {
                    const percentage: string = (
                      (currentValue / total) *
                      100
                    ).toFixed(2);
                    return `${tooltipItem.label}: ${percentage}%`;
                  }
                  return tooltipItem.label;
                },
              },
            },
          },
        },
      });
      setChartInstance(chart);
      return () => chart.destroy();
    }
  }, [data, id]);

  const title: string | undefined = data?.datasets[0]?.label;

  return (
    <div className="w-72 md:w-60 h-auto p-4 dark:shadow-blue-400/40 bg-slate-100 dark:bg-zinc-900/80 shadow-md rounded-md">
      <h3 className="font-bold text-[#3f72af] dark:text-blue-400/90 max-w-52 min-h-12 text-center text-wrap mx-auto">
        {title}
      </h3>
      <canvas id={id} ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
};

export default ChartComponent;
