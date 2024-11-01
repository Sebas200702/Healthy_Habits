import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import type { ChartData } from "chart.js/auto";

const ChartComponent = ({ data, id }: { data: ChartData; id: string }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [chartInstance, setChartInstance] = useState<Chart | null>(null);

  const Colors = ["#3f72af", "#66b3ff", "#c7e9fb", "#a8d0e6"];

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
              borderColor: "transparent", // Eliminar contorno blanco
              borderWidth: 0, // Asegura que no se muestre el borde
            },
          ],
        },
        options: {
          responsive: true,
        },
      });
      setChartInstance(chart);
      return () => chart.destroy();
    }
  }, [data, id]);

  const title = data?.datasets[0]?.label;

  return (
    <div className="w-72 md:w-60 h-auto p-4 dark:shadow-blue-400 dark:bg-zinc-900/80 shadow-md rounded-md">
      <h3 className="font-bold  text-[#3f72af] max-w-20 text-lg mx-auto">
        {title}
      </h3>
      <canvas id={id} ref={canvasRef} width="400" height="200"></canvas>
    </div>
  );
};

export default ChartComponent;
