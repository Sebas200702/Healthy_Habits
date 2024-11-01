import React, { useEffect, useState } from "react";
import Chart from "chart.js/auto";
import type { ChartData } from "chart.js/auto";

const ChartComponent = ({ data }: { data: ChartData }) => {
  const [mode, setMode] = useState("Modo claro");

  useEffect(() => {
    const storedMode = localStorage.getItem("mode");
    if (storedMode) {
      setMode(storedMode);
    }
  }, []);
  const title = data?.datasets[0]?.label;
  useEffect(() => {
    const ctx = document.querySelector("canvas")?.getContext("2d");
    if (ctx) {
      new Chart(ctx, {
        type: "doughnut",
        data,
        options: {
          responsive: true,
        },
      });
    }
  }, []);

  return (
    <div className="w-80 h-auto p-4 shadow-lg  rounded-md ">
      <h4 className="font-bold text-[#3f72af] max-w-20 text-lg  mx-auto">
        {title}
      </h4>
      <canvas width="400" height="200"></canvas>
    </div>
  );
};

export default ChartComponent;
